const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  valid: { type: Boolean, default: false },
  target: { type: Schema.Types.ObjectId, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

TokenSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

const TokenModel = mongoose.model('Token', TokenSchema);

module.exports = TokenModel;
