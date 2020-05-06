const { insertConsultant } = require('../models/consultant');

exports.createConsultantAction = [
  (req, res, next) => {
    const { username, password } = req.body;
    insertConsultant({ username, password })
      .then(result => {
        res.status(200).json({ success: true, data: { consultant: result }})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ success: false, message: "Erro ao criar consultor."})
      })
  }
]

exports.loginAction = [
  (req, res, next) => {

  }
]