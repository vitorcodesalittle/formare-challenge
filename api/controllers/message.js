const verifyConsultant = require('../middlewares/verifyConsultant');

export const getMessagesAction = [
  (req, res, next) => {

  }
]

export const createMessageAction = [
  (req, res, next) => {

  }
]

export const deleteMessageAction = [
  verifyConsultant, // apenas consultores podem deletar uma mensagem
  (req, res, next) => {

  }
]