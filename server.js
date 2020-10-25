const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = require("http").createServer(app);
const io = socketio(server);
const { v4: uuidV4 } = require('uuid');
const path = require("path");

const PORT = process.env.PORT || 5001

// app.set('view engine', 'ejs');
// app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join', (roomId, peerId, name) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', { peerId, name });

        socket.on('myName', name => {
            socket.emit('userName', name);
        })

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', peerId)
        })
    })
})


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
}

server.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`)
});