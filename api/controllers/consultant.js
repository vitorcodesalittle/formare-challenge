const { insertConsultant, validPassword, getConsultant } = require('../models/consultant');
const jwt = require('jsonwebtoken');

exports.createConsultantAction = [
  async (req, res, next) => {
    const { username, password } = req.body;

    let existingConsultant = await getConsultant({ username });

    if (existingConsultant) {
      return res.status(400).json({ success: false, message: "Já existe um consultor com esse nome."})
    }

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
  async (req, res, next) => {
    const { username, password } = req.body;
    const consultant = await getConsultant({username});
    if (!consultant) {
      return res.status(400).json({ success: false, message: "Não achamos um consultor com esse username"})
    }
    const isValid = await validPassword(password, consultant.password); // verifica se a senha corresponse à hash guardada na criação
    if (isValid) {
      const token = jwt.sign({ id: consultant._id }, process.env.SECRET, {
        expiresIn: 24 * 60 * 60 // token expira em 1 dia.
      })
      res.status(200).json({ success: true, token })
    } else {
      res.status(401).json({ success: false, message: "Falha na autenticação. Verifique os campos de login."})
    }
  }
]

exports.getConsultantAction = [
  (req, res, next) => {
    const consultantId = req.params.consultant_id;
    getConsultant({ _id: consultantId })
      .then(consultant => {
        if (!consultant) {
          return res.status(400).json({ success: false, message: "Não achamos um consultor com id " + consultantId })
        }
        res.status(200).json({ success: true, data: { consultant }})
      })
      .catch(err => {
        return res.status(500).json({ success: false, message: "Erro no servidor" });
      })
  }
]
