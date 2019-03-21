jQuery(document).ready(function($) {

  $("#confirm-print-order").click(function() {
    const email = $('input[name=email]').val();
    const code = $('input[name=courseCode]').val();
    
    $.ajax({
      url: `/print/${email}/${code}`, 
      success: function(result) {
        $('#print_results').html('<p class="alert alert-success">Seu pedido foi feito com sucesso! Entraremos em contato em breve.</p>');
        setTimeout(() => {
          $('#printOrderModal').modal('hide');
          $("#confirm-print-order").prop("disabled", true);
        }, 3000);
      },
      error: function(xhr) {
        $('#print_results').html('<p class="alert alert-danger">Ocorreu um erro na sua solicitação.</p>');
      }
    });
  });

});