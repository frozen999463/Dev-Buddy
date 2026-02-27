import { WebSocketServer, WebSocket } from "ws";
import { executeCode, ProcessHandle } from "./runner";

const WS_PORT = 3001;

const wss = new WebSocketServer({ port: WS_PORT });

// Map to track the running process for each WebSocket connection
const wsProcesses = new Map<WebSocket, ProcessHandle>();

wss.on("connection", (ws: WebSocket) => {
  console.log("🔌 Code execution WS connected");

  ws.on("message", async (raw) => {
    try {
      const data = JSON.parse(raw.toString());

      // ── RUN: start a new Docker container ─────────────────────────────────
      if (data.type === "run") {
        // Kill any previous process for this connection
        const existing = wsProcesses.get(ws);
        if (existing?.proc && !existing.proc.killed) {
          existing.proc.kill();
          wsProcesses.delete(ws);
        }

        const { language, code } = data;
        if (!language || !code) {
          ws.send(JSON.stringify({ stderr: "Missing language or code." }));
          return;
        }

        const handle = await executeCode(language, code, ws);
        if (handle) {
          wsProcesses.set(ws, handle);
        }
      }

      // ── INPUT: pipe user stdin to the running process ─────────────────────
      else if (data.type === "input") {
        const handle = wsProcesses.get(ws);
        if (handle?.proc && !handle.proc.killed) {
          handle.proc.stdin.write(data.data ?? "");
        } else {
          ws.send(JSON.stringify({ stderr: "No active process to send input to." }));
        }
      }

    } catch (err: any) {
      ws.send(JSON.stringify({ stderr: err.message ?? "Unknown error" }));
    }
  });

  ws.on("close", () => {
    const handle = wsProcesses.get(ws);
    if (handle?.proc && !handle.proc.killed) {
      handle.proc.kill();
    }
    wsProcesses.delete(ws);
    console.log("🔌 Code execution WS disconnected");
  });
});

console.log(`🐳 Code execution WebSocket server running on ws://localhost:${WS_PORT}`);
