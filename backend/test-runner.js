const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:3001');

ws.on('open', () => {
  console.log('Connected to runner websocket!');
  
  // Test a simple JavaScript execution
  const testPayload = {
    language: 'javascript',
    code: 'console.log("Hello from code execution system!");'
  };
  
  console.log('Sending payload:', testPayload);
  ws.send(JSON.stringify(testPayload));
});

ws.on('message', (data) => {
  console.log('Received:', data.toString());
});

ws.on('close', () => {
  console.log('Disconnected');
});

ws.on('error', (err) => {
  console.error('WebSocket Error:', err);
});
