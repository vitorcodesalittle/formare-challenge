const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5
  }
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;

exports.insertUser = ({ username }) => new Promise((resolve, reject) => {
  let user = new UserModel({ username });
  user.save()
    .then(result => {
      resolve(result);
    })
    .catch(err => {
      reject(err)
    })
})

exports.getUsers = () => new Promise((resolve, reject) => {
  UserModel.find({})
    .then(users => {
      resolve(users);
    })
    .catch(err => {
      reject(err);
    })
})
