const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  verified: { type: Boolean, default: false },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  role: { type: String, required: true, enum:[
    'STUDENT', 'TEACHER', 'GOD'
  ]},
  class: { type: Number, required: false },
  username: { type: String, required: false, lowercase: true },
  calendar: { type: String, required: false }, // api key not URL (rip)
  password: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

UserSchema.pre('save', (next) => {
  this.updated_at = new Date();
  next();
});

UserSchema.virtual('email').get(() => {
  return this.username + '@andover.edu';
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
