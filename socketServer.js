const { WebSocket, WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 18081 });

wss.on("connection", (ws) => {
  console.log("会话已连接");

  ws.on("message", (clientData) => {
    // 广播发送给在线的客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(clientData.toString());
      }
    });
  });
});
