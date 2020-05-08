const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user');
const consultantRoutes = require('./routes/consultant');
const messageRoutes = require('./routes/message');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const { insertMessage } = require('./models/message');
const { updateUserStatus } = require('./models/user');

require('dotenv').config();

const PORT = process.env.port || 8080;

const app = express();

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(connection => {
    mongoose.connection.dropDatabase();
  })
  .catch(err => {
    console.log('Erro ao conectar com mongo', err);
    process.exit();
  })


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// -- ROUTES --
app.use('/users', userRoutes);
app.use('/consultants', consultantRoutes);
app.use('/messages', messageRoutes);

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', async socket => {

  let userIdFromSocket = socket.handshake.query.userId;
  let user = await updateUserStatus(userIdFromSocket, true);
  socket.broadcast.emit('new-user', user)

  socket.on('message', (data) => {
    insertMessage(data)
      .then((message) => {
        socket.broadcast.emit('message', {
          content: message.content,
          author: message.author,
          authorName: user.username
        });
      })
      .catch(err => {
        console.log(err);
      })
  })

  socket.on("disconnect", async () => {
    await updateUserStatus(userIdFromSocket, false);
    io.emit('down-user', user)
  })
})

server.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`))