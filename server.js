const server = require("http").createServer();
const Role = require('./_models/role');
const io = require("socket.io")(server);
const mockAuth = require("./mockAuth");
const socketioAuth = require("socketio-auth");

var clients = [];

var port = process.env.PORT || 5000

io.on("connect", socket => {
    console.log('Connected client on port %s.', port);

    socket.on("disconnect", (socket) => {
        console.log(`Client socket id: ${socket.id} disconnected`)
        var disconnectedClient = clients.find(x => x.id === socket.id);
        var index = clients.indexOf(disconnectedClient);
        if (index > -1) {
            arr.splice(index, 1);
         }
    });
});

const authenticate = async (socket, data, callback) => {
    try {
        console.log(JSON.stringify(data))
        var user = mockAuth.authenticate(data.token);
        console.log(user);
        if(user != null)
        {
            callback(null, true);
            console.log(user);
            clients.push({ id: socket.id, username: user.username })
            console.log(clients);
        } 
        callback(null, false);
    } catch (error) {
        callback(error);
    }
};

const postAuthenticate = socket => {
    socket.on('message', (message) => {
        console.log('[server](message): %s', JSON.stringify(message));
        var client = clients.find(x => x.id === socket.id);
        var object = { content: message.content, user: { name: client.username}}
        io.emit('message', object);
    });
    socket.on("tickle", () => socket.emit("tickled"));
};

socketioAuth(io, { authenticate, postAuthenticate });

server.listen(port, () => {
    console.log('Running server on port %s', port);
});