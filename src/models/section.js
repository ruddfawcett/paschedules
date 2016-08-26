const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
  code: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  room: { type: String, required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  meets: [{
    day: { type: Number },
    starts: { type: Date },
    ends: { type: Date }
  }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

SectionSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const SectionModel = mongoose.model('Section', SectionSchema);

module.exports = SectionModel;
