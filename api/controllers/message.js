const verifyConsultant = require('../middlewares/verifyConsultant');
const { insertMessage, getMessages } = require('../models/message');

exports.getMessagesAction = [
  (req, res, next) => {
    let { query, limit, skip } = req.query;
    if (query) {
      query = JSON.parse(query);
    }
    getMessages(query, skip, limit)
      .then(messages => {
        res.status(200).json({ success: true, data: { messages } })
      })
  }
]

exports.createMessageAction = [
  (req, res, next) => {
    const { content, userId, sendDate } = req.body;
    insertMessage({ content, author: userId })
      .then(result => {
        res.status(200).json({ success: true, data: { message: result } })
      })
  }
]

exports.deleteMessageAction = [
  verifyConsultant, // apenas consultores podem deletar uma mensagem
  (req, res, next) => {

  }
]