const express   = require('express');
const router = express.Router();

const Student = require('../models/Student');
const Course = require('../models/Course');

router.get('/', function(req, res) {

  const ReactCourse = new Course({
    code: 'CURSO01',
    title: 'Curso Teste',
    date: new Date(),
    duration:  8,
    instructor: 'Mae Dina',
    supportInstructor: 'Xablau'
  });

  ReactCourse.save(function(err) {
    if(err) throw err;
  });

  const Bob = new Student({
    firstName: 'bob',
    lastName: 'bob',
    email: 'bob@bob.com.br',
    document: '999.999.999-06',
    courses: [
      { courseCode: 'CURSO01', approved: true }
    ]
  });

  Bob.save(function(err){
    if(err) throw err;
  });

  res.sendStatus(200);

});

module.exports = router;
