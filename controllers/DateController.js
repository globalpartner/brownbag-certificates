module.exports = {

  /**
   * @param {*} date 
   */
  formatDateToPrintOnCertificate(date) {
    // FIXME: needs to be generic
    const day = date.getDate();
    const month = convertMonthToText(date.getMonth());
    const year = date.getFullYear();

    return `${day} de ${month} de ${year}`;
  }

}

function convertMonthToText(index) {
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return months[index];
}