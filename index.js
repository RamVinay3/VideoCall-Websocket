const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 }); // WebSocket server running on port 3000

wss.on("connection", (socket) => {
    console.log("New client connected");
   
    socket.on("message", (message) => {
        const jsonString = message.toString(); // Convert Buffer to String
        
       
        
        // Broadcast message to all other clients except the sender
        try {
            const data = JSON.parse(jsonString); // Parse JSON safely
            console.log("Parsed JSON:", data);
    
            // Broadcast to all connected clients
            wss.clients.forEach(client => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data)); // 🔥 Convert back to string
                }
            });
    
        } catch (error) {
            console.error("JSON Parsing Error:", error.message);
        }
    });

    socket.on("close", () => console.log("Client disconnected"));
});
