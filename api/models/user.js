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

exports.updateUserStatus = (id, online) => new Promise( async (resolve, reject) => {
  let user = await UserModel.findById(id);
  if (!user) {
    return reject('Não achamos usuário com id ' + id);
  }
  user.online = online;
  UserModel.findOneAndUpdate({ _id: user._id }, user, { new: true})
    .then(( result ) => {
      console.log('result from update', result);
      resolve(result);
    })
    .catch(err => {
      reject(err);
    })
})