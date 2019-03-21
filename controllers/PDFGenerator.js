const config    = require('config-yml');
const mustache  = require('mustache');
const path      = require('path');
const fs        = require('fs');

const DateController = require('./DateController');

module.exports = {

  /**
   * @param {*} res 
   * @param {*} args 
   * @param {*} course 
   * @param {*} student 
   */
  generatePDF(res, args, course, student) {
    
    const templatePath = path.resolve(__dirname, '../views/pdf.html');
    fs.readFile(templatePath, function (err, data) {
      if (err) {
        console.log(err);
        res.redirect('/?error=templateError');
      } 

      // it stores the information about the student
      args.attendee = student;
      
      // the logo and background of the certificate
      args.certificate.instructor = course.instructor;
      const {logo, background, instructorSignature} = course.certificate;
      args.certificate.logo = logo;
      args.certificate.background = background;
      args.certificate.instructorSignature = instructorSignature;
      args.certificate.link = `/verify/${student.email}/${course.code}`;
     
      // Style certificate args
      args.attendee.data = args.certificate.textLine2
        .replace('%event_name%', '<strong>' + course.title + '</strong>')
        .replace('%event_date%', DateController.formatDateToPrintOnCertificate(course.date))
        .replace('%attendee_type%', '<strong>' + "Aluno" + '</strong>')
        .replace('%event_duration%', '<strong>' + course.duration + '</strong>');

      // Render PDF
      res.pdfFromHTML({
        filename: config.routes.certificate + '.pdf',
        htmlContent: mustache.render(data.toString(), args),
        options: {
          'type': 'pdf',              // Allowed file types: png, jpeg, pdf
          'format': 'A4',             // Allowed units: A3, A4, A5, Legal, Letter, Tabloid
          'orientation': 'landscape', // Portrait or landscape
        }
      });
    });
  
  }

}
