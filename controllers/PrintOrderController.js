const PrintOrder = require('../models/PrintOrder');

module.exports = {
  
  /**
   * @param {*} email 
   * @param {*} courseCode 
   */
  registerPrintOrderFrom(email, courseCode) {
    return new Promise((resolve, reject) => {
      const printOrder = new PrintOrder({email, courseCode});
      printOrder.save()
        .then(() => resolve())
        .catch(err => reject(err))
    }) 
  }

}
