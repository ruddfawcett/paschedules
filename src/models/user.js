const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

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
  calendar: {
    url: { type: String, required: false },
    version: { type: Number, default: 1 }
  },
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

UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
      });
  });
});

UserSchema.methods.verifyPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
