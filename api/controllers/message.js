const verifyConsultant = require('../middlewares/verifyConsultant');
const { insertMessage, getMessages, deleteMessage } = require('../models/message');

exports.getMessagesAction = [
  (req, res, next) => {
    let { limit, skip, userId, beginDate, endDate, first } = req.query;
    
    let query = {}
    let createdAtQuery = {}
    if (userId) query.author = userId;
    if (beginDate) createdAtQuery = { $gte: new Date(beginDate) }
    if (endDate) createdAtQuery = { $lte: new Date(endDate) }
    if (Object.keys(createdAtQuery).length > 0) query.createdAt = createdAtQuery;
    if (limit) limit = parseInt(limit)
    if (skip) skip = parseInt(skip)
    getMessages(query, skip, limit, first)
      .then(messages => {
        res.status(200).json({ success: true, data: { messages } })
      })
      .catch(err => {
        console.log('Erro ao pegar mensagens: ', err);
        res.status(500).json({ success: false, message: 'Erro ao pegar mensagens.'})
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