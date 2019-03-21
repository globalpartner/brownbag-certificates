const Student = require('../models/Student');
const Course = require('../models/Course');

module.exports = {
  
  /**
   * @param {*} email 
   * @param {*} course 
   */
  getInfoAboutStudentAndCourse(email, courseCode) {
    return new Promise((resolve, reject) => {
      const query = {
        'email': email,
        'courses.courseCode': courseCode
      }
  
      Student.findOne(query)
        .then(student => resolve(student))
        .catch(err => reject(err));
    })
  },

  /**
   * 
   * @param {*} courseCode 
   */
  getInfoAboutCourse(courseCode) {
    return new Promise((resolve, reject) => {
      const query = {'code': courseCode};

      Course.findOne(query)
        .then(course => resolve(course))
        .catch(err => reject(err));
    })
  }

}