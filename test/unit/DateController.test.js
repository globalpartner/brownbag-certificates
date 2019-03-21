const expect = require('expect.js');

const DateController = require('../../controllers/DateController');

describe('Date Controller tests', function(){
  it('converts a date object into a string', () => {
    const dateToTest = new Date('2017-12-27T23:57:03.714Z');
    const string = DateController.formatDateToPrintOnCertificate(dateToTest);
    
    expect(string).to.be(`27 de Dezembro de 2017`);
  });

});