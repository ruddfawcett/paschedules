const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
  code: { type: String, required: true },
  number: { type: Number, required: true },
  room: { type: String, required: false },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
  meets: [{
    day: { type: Number },
    starts: { type: Date },
    ends: { type: Date }
  }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

SectionSchema.pre('save', (next) => {
  this.updated_at = new Date();
  next();
});

const SectionModel = mongoose.model('Section', SectionSchema);

module.exports = SectionModel;
