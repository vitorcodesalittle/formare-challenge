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

const insertUser = async () => {

}

const getUsers = async () => {
  
}
