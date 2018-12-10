$(function() {
  $('#success-alert-add').hide();
  $('#failure-alert-add').hide();

  $('#add-submit').on('click', function() {
    //get form details
    let univ_name = $('#univ-name').val();
    let year = $('#year').val();
    let admission_rate = $('#admission-rate').val();
    let average_sat = $('#average-sat').val();
    let in_state_tuition = $('#in-state-tuition').val();

    $.ajax({
      url: '/admin/add-entry',
      type: 'POST',
      data: {
        INSTNM: univ_name,
        YEAR: year,
        ADM_RATE: admission_rate,
        SAT_AVG: average_sat,
        TUITIONFEE_IN: in_state_tuition
      },
      success: function(result) {
        $('#success-alert-add').show();
        $('#univ-name').val('');
        $('#year').val('');
        $('#admission-rate').val('');
        $('#average-sat').val('');
        $('#in-state-tuition').val('');
        setTimeout(() => {
          $('#success-alert-add').hide();
        }, 3000);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $('#success-alert-add').show();
        setTimeout(() => {
          $('#success-alert-add').hide();
        }, 3000);
        //alert('error ' + textStatus + ' ' + errorThrown);
      }
    });
  });
});
