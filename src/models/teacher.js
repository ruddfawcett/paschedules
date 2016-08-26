const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  verified: { type: Boolean, default: false },
  name: {
    first: { type: String, required: true },
    last: { type: String, required:  true}
  },
  email: { type: String, required: false, lowercase: true, unique: true },
  password: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

TeacherSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const TeacherModel = mongoose.model('Teacher', TeacherSchema);

module.exports = TeacherModel;
