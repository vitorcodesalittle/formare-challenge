const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/user');
const consultantRoutes = require('./routes/consultant');
const messageRoutes = require('./routes/message');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');

const { insertMessage } = require('./models/message');

require('dotenv').config();

const PORT = process.env.port || 8080;

const app = express();

mongoose.connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(connection => {
    console.log('Connected to mongo');
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

io.on('connection', socket => {

  socket.on('message', (data) => {
    insertMessage(data)
      .then((message) => {
        socket.broadcast.emit('message', message);
      })
      .catch(err => {
        console.log('Erro ao inserir mensagem');
      })
  })
  socket.on("disconnect", () => {
  })
})

server.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`))