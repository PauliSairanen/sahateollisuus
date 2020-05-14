//Model salasanoille

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthSchema = new Schema(
  {
    admin : JSON,
    events: JSON
  }
);

const Auth = mongoose.model('auth',AuthSchema);

module.exports = Auth;