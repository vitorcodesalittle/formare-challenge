const verifyConsultant = require('../middlewares/verifyConsultant');
const { insertMessage, getMessages, deleteMessage } = require('../models/message');

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
    const messageId = req.params.message_id;
    deleteMessage(messageId)
      .then(result => {
        console.log('Resultado to delete da mensagem: ', result);
        if (result.deletedCount === 1)
          res.status(200).json({ success: true })
        else {
          res.status(400).json({ success: false, message: "Não achamos mensagem com _id " + messageId + " para deletar."})
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ success: false, message: "Não foi possível deletar a mensagem."})
      })
  }
]