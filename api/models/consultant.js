const mongoose = require('mongoose');
const ObjectId = mongoose.Types.objectId;
const bcrypt = require('bcrypt');

const ConsultantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    required: true,
    type: String
  }
})

 
exports.validPassword = async (candidate, hash) => bcrypt.compare(candidate, hash)
ConsultantSchema.methods.hashPassword = async (password) => bcrypt.hash(password, 10);

const ConsultantModel = mongoose.model('Consultant', ConsultantSchema);

exports.insertConsultant = ({ username, password }) => new Promise( async (resolve, reject) => {
  // TODO: Verificar se username ainda não foi usado...
  
  let consultant = new ConsultantModel({ username, password })
  try {
    consultant.password = await consultant.hashPassword(password);
  } catch(err) {
    reject(err)
    return;
  }
  consultant.save()
    .then((result) => {
      resolve(result);
    })
    .catch(err => {
      reject(err)
    })
})

exports.getConsultant = (username) => new Promise((resolve, reject) => {
  ConsultantModel.find({ username })
    .then(data => data.length > 0 ? resolve(data[0]) : null)
    .catch(err => reject(err))
})

