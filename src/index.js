var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
msgBot = require('./msgBot.js');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    
    let answer = msgBot.processMessage(msg.text);
    if (answer != '') {
      io.emit('bot message',
        {text: answer, timestamp: new Date().toLocaleTimeString()}
      );
    }
  });

  socket.on('register-user', (user) => {
    io.emit('new user', user);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});