const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  verified: { type: Boolean, default: false },
  name: {
    first: { type: String, required: true },
    last: { type: String, required:  true}
  },
  username: { type: String, required: false, lowercase: true, unique: true },
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  password: { type: String, required: false },
  ical: { type: String, required: false, unique: true },
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
