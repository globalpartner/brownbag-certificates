const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  document:  String,
  courses: [{ courseCode: String, approved: Boolean }]
});

module.exports = mongoose.model('Student', studentSchema);
