var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	telNo: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});


module.exports = mongoose.model('user', UserSchema);