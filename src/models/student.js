const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  created_at: { type: Date, 'default': Date.now },
  updated_at: { type: Date, 'default': Date.now }
});

StudentSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
