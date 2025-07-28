const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
const locations = ['North Gate', 'Main Hall', 'Storage', 'Control Room'];

wss.on('connection', ws => {
  console.log('Client connected');
  
  const sendAlert = () => {
    const alert = {
      id: Math.random().toString(36).substring(2),
      type: 'alert',
      message: 'Intruder detected',
      timestamp: new Date().toISOString(),
      location: locations[Math.floor(Math.random() * locations.length)]
    };
    ws.send(JSON.stringify(alert));
  };

  const interval = setInterval(sendAlert, 10000);
  ws.on('close', () => clearInterval(interval));
});
