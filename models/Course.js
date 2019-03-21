const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  code: String,
  title: String,
  date: Date,
  duration:  Number,
  instructor: String,
  supportInstructor: String,
  certificate: {
    logo: String,
    background: String,
    instructorSignature: String
  }
});

module.exports = mongoose.model('Course', courseSchema);