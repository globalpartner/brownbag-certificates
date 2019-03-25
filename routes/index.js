const express = require('express');
const config = require('config-yml');
const findInCSV = require('find-in-csv');
const isEmail = require('isemail');
const mustache = require('mustache');

const CourseController = require('../controllers/CourseController');
const DateController = require('../controllers/DateController');
const PDFGenerator = require('../controllers/PDFGenerator');
const PrintOrderController = require('../controllers/PrintOrderController');

const router = express.Router();

router.get('/', function (req, res) {
  var err = null;
  var error = req.query.error;
  var args = config.site;
  args.event = config.event;
  args.formAction = config.routes.certificate;
  args.csrfToken = req.csrfToken();

  if (typeof error !== 'undefined') {
    err = error.replace(/<(?:.|\n|)*?>|\./gm, '');
    if (config.errors[err]) {
      args.error = config.errors[err];
    }
  }
  // Clean any cached error.
  if (null === err) {
    args.error = '';
  }

  res.render('index', args);
});

router.post('/' + config.routes.certificate, function (req, res) {
  const args = {
    baseUrl: req.protocol + '://' + req.get('host'),
    certificate: config.certificate,
    event: config.event
  };

  // Validate email
  const email = req.body.email;
  try {
    if ('' === email) throw 'missingEmail';
    if (!isEmail.validate(email)) throw 'invalidEmail';
  } catch (e) {
    res.redirect('/?error=' + e);
  }

  // find e-mail in database
  const courseCode = req.body.courseCode;
  const studentPromise = CourseController.getInfoAboutStudentAndCourse(email, courseCode);
  studentPromise
    .then(student => {
      if (!student) res.redirect('/?error=notAttended');

      // it checks if the students passed on the course
      const course = student.courses.find(course => course.courseCode === courseCode);
      if (!course.approved) res.redirect('/?error=notApproved');

      const courseDetails = CourseController.getInfoAboutCourse(courseCode);
      courseDetails
        .then(course => {
          PDFGenerator.generatePDF(res, args, course, student);
        })
        .catch(err => console.log('some error ocurred', err));
    })
    .catch(err => console.log('some error occurred', err))

});

router.get('/' + config.routes.print + '/:email/:courseCode', function (req, res) {
  const {email, courseCode} = req.params;
  PrintOrderController.registerPrintOrderFrom(email, courseCode)
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
    })
});

router.get('/' + config.routes.verification + '/:email/:courseCode', function (req, res) {
  // TODO: Put the validation code inside a controller to reuse above as well
  const {email, courseCode} = req.params;
  const studentPromise = CourseController.getInfoAboutStudentAndCourse(email, courseCode);
  studentPromise
    .then(student => {
      if (!student) res.send('The certificate is not valid!');
      else {
        const course = student.courses.find(course => course.courseCode === courseCode);
        if (!course.approved) res.send('The certificate is not valid!');
        else res.send('The certificate is valid.');
      }
    })
    .catch(err => {
      console.log('some error ocurred', err)
    });
});

module.exports = router;
