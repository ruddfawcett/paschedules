const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  created_at: { type: Date, 'default': Date.now },
  updated_at: { type: Date, 'default': Date.now }
});

CourseSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = CourseModel;
