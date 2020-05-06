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

exports.getMessages = (query = {}, skip = 0, limit = 30, first='newer') => new Promise((resolve, reject) => {

  let sortArg = 1;

  if (first === 'older') {
    sortArg = -1;
  }

  MessageModel.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ 
      createdAt: sortArg
    })
    .then( result => {
      resolve(result);
    })
    .catch(err => {
      reject(err);
    })
})

exports.insertMessage = ({ content, author }) => new Promise((resolve, reject) => {
  let message = new MessageModel({ content, author });
  message.save()
    .then(result => resolve(result))
    .catch(err => reject(err));
})

exports.deleteMessage = (messageId) => new Promise((resolve, reject) => {
  MessageModel.deleteOne({ _id: messageId })
    .then(result => resolve(result))
    .catch(err => reject(err))
})
