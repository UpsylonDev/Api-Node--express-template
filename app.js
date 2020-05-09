var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket){
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('utilisateur deconnecté')

    })

    socket.on('chat', function (msg) {
        console.log('nouveau message ::::::::::::        ' + msg)

        // emettre vers le client
        io.emit('chat', msg)
    })
    
});

http.listen(3000, () => {
    console.log('listening on *:3000 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
});