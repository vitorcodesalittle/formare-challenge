const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 5
  },
  online: {
    type: Boolean,
    required: true,
    default: false
  }
})

const UserModel = mongoose.model('User', UserSchema);

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

exports.getUsers = (query={}, skip = 0, limit = 117) => new Promise((resolve, reject) => {
  UserModel.find(query)
    .skip(skip)
    .limit(limit)
    .then(users => {
      resolve(users);
    })
    .catch(err => {
      reject(err);
    })
})
