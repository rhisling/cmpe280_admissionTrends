const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  googleId: {
    type: String,
    required: false
  },
  facebookId: {
    type: String,
    required: false
  },
  photo: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Users', UserSchema);
