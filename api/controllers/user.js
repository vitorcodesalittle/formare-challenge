const { insertUser, getUsers } = require('../models/user');

exports.createUserAction = [
  (req, res, next) => {
    const { username } = req.body;
    insertUser({ username })
      .then( user => {
        console.log('user: ', user);
        return res.status(200).json({ success: true, user })
      })
      .catch(err => {
        console.log('Erro ao inserir usuário', err);
        return res.status(500).json({ success: false, message: "Erro ao inserir usuário"})
      })
  }
]

exports.getUsersAction = [
  (req, res, next) => {
    getUsers()
      .then(users => {
        console.log('users: ', users);
        res.status(200).json({ users });
      })
      .catch(err => {
        console.log('Erro ao pegar usuários: ', err);
        res.status(500).json({ success: false, message: "Erro ao pegar usuários."})
      })
  }
]