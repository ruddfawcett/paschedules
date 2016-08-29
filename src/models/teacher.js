const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  verified: { type: Boolean, default: false },
  name: {
    first: { type: String, required: false },
    last: { type: String, required:  false}
  },
  username: { type: String, required: false, lowercase: true },
  password: { type: String, required: false },
  ical: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

TeacherSchema.pre('save', (next) => {
  this.updated_at = new Date();
  next();
});

TeacherSchema.virtual('email').get(() => {
  return this.username + '@andover.edu';
});

const TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = TeacherModel;
