const { insertUser, getUsers } = require('../models/user');

exports.createUserAction = [
  (req, res, next) => {
    const { username } = req.body;
    insertUser({ username })
      .then( user => {
        return res.status(200).json({ success: true, data: { user } })
      })
      .catch(err => {
        console.log('Erro ao inserir usuário', err);
        return res.status(500).json({ success: false, message: "Erro ao inserir usuário"})
      })
  }
]

exports.getUsersAction = [
  (req, res, next) => {
    let { userId, onlyOnline, skip, limit, username } = req.query;
    let query = {};
    if (userId) {
      query._id = userId;
    }
    if (onlyOnline) {
      query.online = true;
    }
    if (username) {
      query.username = new RegExp(`^\.*${username}\.*$`) // "like"
    }
    if (limit) {
      limit = parseInt(limit);
    }
    console.log(query);
    getUsers(query, skip, limit)
      .then(users => {
        res.status(200).json({ success: true, data: { users } });
      })
      .catch(err => {
        console.log('Erro ao pegar usuários: ', err);
        res.status(500).json({ success: false, message: "Erro ao pegar usuários."})
      })
  }
]