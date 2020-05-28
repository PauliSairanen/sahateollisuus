//Model salasanoille

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema(
  {
    username: String,
    password: String
  }
);

const Auth = mongoose.model('auth',AuthSchema);

module.exports = Auth;