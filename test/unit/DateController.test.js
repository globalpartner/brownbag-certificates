const expect = require('expect.js');

const DateController = require('../../controllers/DateController');

describe('Date Controller tests', function(){
  it('converts a date object into a string', () => {
    const dateToTest = new Date('2000-01-01T06:00:00.000Z');
    const string = DateController.formatDateToPrintOnCertificate(dateToTest);
    
    expect(string).to.be(`01 de Janeiro de 2000`);
  });

});
