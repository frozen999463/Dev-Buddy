import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import { WebSocket } from "ws";

/**
 * Language configurations.
 * Instead of volume-mounting files (which fails on external drives with Docker Desktop),
 * we pipe code via stdin into the container using bash -c 'cat > file && run file'.
 * User stdin is handled AFTER the code is written (via a flag).
 */
const LANGUAGE_CONFIG: Record<string, () => { runCmd: string; args: string[] }> = {
  python: () => ({
    runCmd: "cat > /code/solution.py && python3 /code/solution.py",
    args: [
      "run", "--rm",
      "--network", "none",
      "--memory", "128m",
      "--cpus", "0.5",
      "--ulimit", "nproc=64:64",
      "--ulimit", "fsize=1048576:1048576",
      "-i",
      "devbuddy-runner",
      "bash", "-c", "cat > /code/solution.py && python3 /code/solution.py",
    ],
  }),

  javascript: () => ({
    runCmd: "cat > /code/solution.js && node /code/solution.js",
    args: [
      "run", "--rm",
      "--network", "none",
      "--memory", "128m",
      "--cpus", "0.5",
      "-i",
      "devbuddy-runner",
      "bash", "-c", "cat > /code/solution.js && node /code/solution.js",
    ],
  }),

  c: () => ({
    runCmd: "cat > /code/solution.c && gcc /code/solution.c -o /tmp/solution && /tmp/solution",
    args: [
      "run", "--rm",
      "--network", "none",
      "--memory", "128m",
      "--cpus", "0.5",
      "-i",
      "devbuddy-runner",
      "bash", "-c", "cat > /code/solution.c && gcc /code/solution.c -o /tmp/solution && /tmp/solution",
    ],
  }),

  java: () => ({
    runCmd: "cat > /code/Main.java && javac /code/Main.java -d /tmp && java -cp /tmp Main",
    args: [
      "run", "--rm",
      "--network", "none",
      "--memory", "256m",
      "--cpus", "0.5",
      "-i",
      "devbuddy-runner",
      "bash", "-c", "cat > /code/Main.java && javac /code/Main.java -d /tmp && java -cp /tmp Main",
    ],
  }),

  dart: () => ({
    runCmd: "cat > /code/solution.dart && dart /code/solution.dart",
    args: [
      "run", "--rm",
      "--network", "none",
      "--memory", "128m",
      "--cpus", "0.5",
      "-i",
      "devbuddy-runner",
      "bash", "-c", "cat > /code/solution.dart && dart /code/solution.dart",
    ],
  }),
};

export interface ProcessHandle {
  proc: ChildProcessWithoutNullStreams;
  codeWritten: boolean;
}

/**
 * Runs user code in a Docker container and streams output to the WebSocket.
 *
 * How it works:
 * 1. We start `docker run -i` with `bash -c "cat > file && run file"`.
 * 2. We write the user's code to stdin, then send EOF (end stdin half)
 *    so `cat` finishes and the runtime (python/node/etc.) starts.
 * 3. BUT — we can't close stdin fully if the user's program needs input.
 *    So instead we use a delimiter: we write the code + a special EOF marker,
 *    and use `head` or `sed` to capture just the code portion.
 *
 * Simpler approach used here:
 * - Write code to stdin, then close the write-end of stdin with `proc.stdin.end()`.
 * - For programs that need user input (like `input()` in Python), we re-open
 *   a new container approach — but actually, `bash -c` with `cat` will consume
 *   ALL of stdin. So we need a smarter approach.
 *
 * FINAL approach: Use a heredoc-style delimiter.
 * bash -c 'head -c CODE_LENGTH > /code/solution.py && python3 /code/solution.py'
 * We know the byte length, so we tell `head` exactly how many bytes to read for the file,
 * then the rest of stdin goes to the running program.
 */
export async function executeCode(
  language: string,
  code: string,
  ws: WebSocket
): Promise<ProcessHandle | null> {
  const config = LANGUAGE_CONFIG[language.toLowerCase()];

  if (!config) {
    ws.send(JSON.stringify({ stderr: `Unsupported language: ${language}` }));
    return null;
  }

  // Calculate byte length of the code (important for multi-byte chars)
  const codeBytes = Buffer.byteLength(code, "utf-8");

  // Build the command: use `head -c N` to read exactly N bytes into the file,
  // then the remaining stdin is available for the running program (e.g. input())
  const langKey = language.toLowerCase();
  const fileMap: Record<string, { file: string; run: string }> = {
    python: { file: "/code/solution.py", run: "python3 /code/solution.py" },
    javascript: { file: "/code/solution.js", run: "node /code/solution.js" },
    c: { file: "/code/solution.c", run: "gcc /code/solution.c -o /tmp/solution && /tmp/solution" },
    java: { file: "/code/Main.java", run: "javac /code/Main.java -d /tmp && java -cp /tmp Main" },
    dart: { file: "/code/solution.dart", run: "dart /code/solution.dart" },
  };

  const lang = fileMap[langKey];
  if (!lang) {
    ws.send(JSON.stringify({ stderr: `Unsupported language: ${language}` }));
    return null;
  }

  const bashCmd = `head -c ${codeBytes} > ${lang.file} && ${lang.run}`;

  const dockerArgs = [
    "run", "--rm",
    "--network", "none",
    "--memory", langKey === "java" ? "256m" : "128m",
    "--cpus", "0.5",
    "--ulimit", "fsize=1048576:1048576",
    "-i",
    "devbuddy-runner",
    "bash", "-c", bashCmd,
  ];

  const proc = spawn("podman", dockerArgs, { stdio: ["pipe", "pipe", "pipe"] });

  // Write the code to stdin immediately — head -c will consume exactly this many bytes
  proc.stdin.write(code);
  // Do NOT close stdin — the running program may need it for user input

  proc.stdout.on("data", (d: Buffer) =>
    ws.send(JSON.stringify({ stdout: d.toString() }))
  );

  proc.stderr.on("data", (d: Buffer) =>
    ws.send(JSON.stringify({ stderr: d.toString() }))
  );

  proc.on("close", (exitCode) => {
    ws.send(JSON.stringify({ stdout: `\n[Process exited with code ${exitCode}]` }));
  });

  proc.on("error", (err) => {
    ws.send(JSON.stringify({ stderr: `Execution error: ${err.message}` }));
  });

  return { proc, codeWritten: true };
}

