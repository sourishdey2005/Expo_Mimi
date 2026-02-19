const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 8000;
const HOST_IP = '10.185.61.186'; 

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/update', (req, res) => {
    const { seat_id, status, weight } = req.body;
    console.log(`[ESP32] Seat ${seat_id}: ${status} (${weight}g)`);
    
    io.emit('seatUpdate', {
        seat_id,
        status,
        weight,
        time: new Date().toLocaleTimeString()
    });
    res.status(200).send("OK");
});

server.listen(PORT, HOST_IP, () => {
    console.log(`\n🚀 Server is LIVE!`);
    console.log(`Network URL: http://${HOST_IP}:${PORT}`);
});
