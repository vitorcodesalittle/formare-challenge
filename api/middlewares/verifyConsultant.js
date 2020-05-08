const jwt = require('jsonwebtoken');

/**
 * Verifica se a requisição vem de um consultor.
 */
const verifyConsultant = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: "É preciso ser um consultor para realizar essa ação", success: false })
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Autenticação falhou."})
    }
    req.userId = decoded.id;
    next();
  })
}

module.exports = verifyConsultant;