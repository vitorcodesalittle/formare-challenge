const mongoose = require('mongoose');
const ObjectId = mongoose.Types.objectId;

const ConsultantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    required: true,
    type: String
  }
})

 
ConsultantSchema.methods.validPassword = async (candidate, hash) => bcrypt.compare(candidate, hash)
ConsultantSchema.methods.hashPassword = async (password) =>  bcrypt.hash(password, 10);

const ConsultantModel = mongoose.model(ConsultantSchema);

const insertUser = async () => {

}


module.exports = ConsultantModel;
