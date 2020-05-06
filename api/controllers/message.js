const verifyConsultant = require('../middlewares/verifyConsultant');

exports.getMessagesAction = [
  (req, res, next) => {

  }
]

exports.createMessageAction = [
  (req, res, next) => {

  }
]

exports.deleteMessageAction = [
  verifyConsultant, // apenas consultores podem deletar uma mensagem
  (req, res, next) => {

  }
]