const WebSocket = require('ws');

const chatWSS = new WebSocket.Server({ port: 8081 });

chatWSS.on('connection', (ws) => {
  console.log('[Chat] Client connected');

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);

      if (message.type === 'chat') {
        //send message to each client
        chatWSS.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });
      }
    } catch (err) {
      console.error('Invalid JSON: ', err);
    }
  })

  ws.on('close', () => console.log('[Chat] Client disconnected'));
})