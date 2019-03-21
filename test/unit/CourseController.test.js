const expect = require('expect.js');
var assert = require('assert');

const CourseController = require("../../controllers/CourseController");
const Student = require('../../models/Student');
const Course = require('../../models/Course');

describe('Course Controller Tests', function () {
  
  beforeEach(function() {
    const studentTest = new Student({
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      document: '999.999.999-99',
      courses: [
        { courseCode: 'TEST1', approved: true }
      ]
    });
  
    const saveStudentPromise = studentTest.save();

    const courseTest = new Course({
      code: 'TEST1',
      title: 'Testing',
      date: new Date(),
      duration:  8,
      instructor: 'test_instructor',
      supportInstructor: 'test_support'
    });
  
    const saveCoursePromise = courseTest.save();

    // FIXME: need a way to make sure that this always runs before the tests
    return Promise
    .all([saveStudentPromise, saveCoursePromise])
    .then( data => {
      console.log("all data is saved for tests");
    })
    .catch(err => {throw new Error()});
  });
  
  it('finds a registry with student and course', () =>  {
    const promise = CourseController.getInfoAboutStudentAndCourse('test@test.com','TEST1'); 
    return promise
      .then(student => {
        expect(student).to.not.be(null);
        expect(student.firstName).to.be('test');
        expect(student.courses.length).to.be(1);

        const course = student.courses[0];
        expect(course.courseCode).to.be('TEST1');
      });
  });

  it('doesnt find registry because student did not attended to course', () => {
    const promise = CourseController.getInfoAboutStudentAndCourse('test@test.com', 'XXXX');
    return promise
      .then(function(student) {
        assert(student === null);
      })
  });

  it('doesnt find registry because no args were passed', () => {
    const promise = CourseController.getInfoAboutStudentAndCourse();
    return promise
      .then(student => expect(student).to.be(null))
  });

  it('retrieves info about a course given a code', () => {
    const promise = CourseController.getInfoAboutCourse('TEST1');
    return promise
      .then(course => {
        expect(course).to.not.be(null);
        expect(course.code).to.be('TEST1');
      });
  });

  it('doesnt find registry because code were not found', () => {
    const promise = CourseController.getInfoAboutCourse('TESTXXX');
    return promise
      .then(course => expect(course).to.be(null))
  });

  it('doesnt find registry because no args were passed', () => {
    const promise = CourseController.getInfoAboutCourse('');
    return promise
      .then(course => expect(course).to.be(null))
  })

});