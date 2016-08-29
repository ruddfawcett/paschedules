const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  code: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  year: { type: Number, required: false },
  term: { type: Number, required: true },
  sections: [{ type: Schema.Types.ObjectId, ref: 'Section' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

CourseSchema.pre('save', (next) => {
  this.updated_at = new Date();
  next();
});

const CourseModel = mongoose.model('Course', CourseSchema);

module.exports = CourseModel;
