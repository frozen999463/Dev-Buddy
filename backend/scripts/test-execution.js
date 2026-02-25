const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3001');

ws.on('open', () => {
    console.log('✅ Connected to execution server');

    // Test 1: Simple Python print (no input needed)
    const testData = {
        type: 'run',
        language: 'python',
        code: 'print("Hello from Docker!")\nprint("2 + 2 =", 2 + 2)\nprint("Code execution is working! 🎉")'
    };

    console.log('📤 Sending run request...');
    ws.send(JSON.stringify(testData));
});

ws.on('message', (data) => {
    const response = JSON.parse(data);
    if (response.stdout) process.stdout.write(response.stdout);
    if (response.stderr) process.stderr.write('❌ ' + response.stderr);

    if (response.stdout && response.stdout.includes('[Process exited with code')) {
        console.log('\n🏁 Execution finished.');
        ws.close();
    }
});

ws.on('error', (err) => {
    console.error('❌ WebSocket error:', err.message);
});

ws.on('close', () => {
    console.log('🔌 Disconnected from server');
});
