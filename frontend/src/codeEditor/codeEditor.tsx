import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Trash2, Send, ChevronLeft, ChevronRight } from "lucide-react";

const LANGUAGES = [
  { label: "C", value: "c", monaco: "c" },
  { label: "Python", value: "python", monaco: "python" },
  { label: "JavaScript", value: "javascript", monaco: "javascript" },
  { label: "Java", value: "java", monaco: "java" },
  { label: "Dart", value: "dart", monaco: "dart" },
];

export default function CodeEditor() {
  const [code, setCode] = useState(`#include <stdio.h>\n\nint main() {\n    printf("Hello, DevBuddy!");\n    return 0;\n}`);
  const [output, setOutput] = useState("");
  const [showProblem, setShowProblem] = useState(true);
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [stdin, setStdin] = useState("");
  const [running, setRunning] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const outputRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    // Connect to the code execution WebSocket server on port 3001
    wsRef.current = new WebSocket("ws://localhost:3001");

    wsRef.current.onopen = () => console.log("✅ Connected to execution server");

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.stdout) {
          setOutput((prev) => prev + data.stdout);
          if (data.stdout.includes("Process exited")) setRunning(false);
        }
        if (data.stderr) {
          setOutput((prev) => prev + data.stderr);
          setRunning(false);
        }
      } catch (e) {
        console.error("Failed to parse WS message", e);
      }
    };

    wsRef.current.onclose = () => {
      console.log("WebSocket closed");
      setRunning(false);
    };

    return () => wsRef.current?.close();
  }, []);

  // Auto-scroll output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const runCode = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      setOutput("Running...\n");
      setRunning(true);
      wsRef.current.send(JSON.stringify({ type: "run", language: language.value, code }));
    } else {
      setOutput("Error: Not connected to execution server.\nMake sure the backend is running.");
    }
  };

  const sendInput = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN && stdin) {
      wsRef.current.send(JSON.stringify({ type: "input", data: stdin + "\n" }));
      setOutput((prev) => prev + stdin + "\n");
      setStdin("");
    }
  };

  return (
    <div className="h-screen bg-gray-950 text-white flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <h1 className="text-base font-semibold tracking-tight text-gray-100">DevBuddy Compiler</h1>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="default"
            onClick={runCode}
            disabled={running}
            className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
          >
            <Play className="h-3.5 w-3.5" />
            {running ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Problem Panel */}
        {showProblem && (
          <div className="w-64 bg-gray-900 border-r border-gray-800 flex-shrink-0 overflow-y-auto p-4">
            <h2 className="font-semibold text-sm mb-3 text-gray-200">Problem</h2>
            <p className="text-sm text-gray-400 mb-4">
              Print <span className="text-white font-medium">Hello, DevBuddy!</span>
            </p>
            <h3 className="font-semibold text-xs uppercase text-gray-500 mb-1 tracking-wide">Expected Output</h3>
            <pre className="bg-gray-950 p-2 rounded text-green-400 text-xs">Hello, DevBuddy!</pre>
          </div>
        )}

        {/* Editor Section */}
        <div className="flex-1 border-r border-gray-800 flex flex-col">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-3 py-1.5 bg-gray-900 border-b border-gray-800">
            <button
              onClick={() => setShowProblem(!showProblem)}
              className="text-gray-400 hover:text-white p-1 rounded transition-colors"
              title="Toggle problem panel"
            >
              {showProblem ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>

            <select
              value={language.value}
              onChange={(e) => setLanguage(LANGUAGES.find((l) => l.value === e.target.value)!)}
              className="bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded px-2 py-1 focus:outline-none focus:border-gray-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>

          <Editor
            key={`${language.value}-${showProblem}`}
            height="100%"
            language={language.monaco}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              padding: { top: 12 },
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="w-80 bg-gray-900 flex flex-col flex-shrink-0">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-800">
            <h2 className="text-sm font-semibold text-gray-200">Output</h2>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setOutput("")}
              className="text-gray-400 hover:text-white gap-1 h-7 px-2"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </Button>
          </div>

          <pre
            ref={outputRef}
            className="flex-1 p-4 text-green-400 text-sm overflow-auto font-mono bg-gray-950 m-2 rounded-lg whitespace-pre-wrap"
          >
            {output || "Program output will appear here..."}
          </pre>

          {/* Stdin Input */}
          <div className="flex gap-2 p-2 border-t border-gray-800">
            <Input
              placeholder="Send input to program..."
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") sendInput(); }}
              className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 text-sm h-8"
            />
            <Button
              size="sm"
              onClick={sendInput}
              disabled={!stdin}
              className="bg-blue-600 hover:bg-blue-700 h-8 gap-1"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
