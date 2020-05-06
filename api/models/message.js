const mongoose = require('mongoose');

const MessageSchema = mongoose.Schema({
  content: {
    type: String,
    min: 1,
    required: true
  },
  author: {
    ref: 'User',
    type: mongoose.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const MessageModel = mongoose.model('Message', MessageSchema);

export const getMessages = () => new Promise((resolve, reject) => {

})

export const createMessage = () => new Promise((resolve, reject) => {

})

export const deleteMessage = () => new Promise((resolve, reject) => {

})


module.exports = MessageModel;