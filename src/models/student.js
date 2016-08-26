const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  verified: { type: Boolean, default: false },
  name: {
    first: { type: String, required: true },
    last: { type: String, required:  true}
  },
  year: { type: Number, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  ical: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

StudentSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
