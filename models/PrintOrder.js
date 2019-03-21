const mongoose = require('mongoose');

const printOrderSchema = mongoose.Schema({
  email: String,
  courseCode: String
});

module.exports = mongoose.model('PrintOrder', printOrderSchema);