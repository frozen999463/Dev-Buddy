import WebSocket from "ws";

const ws = new WebSocket("ws://localhost:3001");

ws.on("open", () => {
    console.log("✅ Connected to execution server");

    const testPayload = {
        type: "run",
        language: "python",
        code: 'name = input("Enter your name: ")\nprint(f"Hello, {name} from DevBuddy execution module!")',
    };

    ws.send(JSON.stringify(testPayload));
});

ws.on("message", (data) => {
    const response = JSON.parse(data.toString());
    if (response.stdout) {
        process.stdout.write(response.stdout);

        // If the process is waiting for input, send it
        if (response.stdout.includes("Enter your name:")) {
            setTimeout(() => {
                console.log("\n[Sending input: Abhijith]");
                ws.send(JSON.stringify({ type: "input", data: "Abhijith\n" }));
            }, 1000);
        }
    }
    if (response.stderr) {
        process.stderr.write(response.stderr);
    }
});

ws.on("close", () => {
    console.log("\n🔌 Disconnected from server");
    process.exit();
});

ws.on("error", (err) => {
    console.error("❌ WebSocket error:", err);
});
