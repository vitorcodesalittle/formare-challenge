const verifyConsultant = (req, res, next) => {
  // verifica se a requisição vem de um consultor...
  next();
}

module.exports = verifyConsultant;