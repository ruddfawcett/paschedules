function validate(fields) {
  function doWork() {
    function hasValue(selector) {
      return $.trim($(selector).val()).length;
    }

    var values = false;

    $.each(fields, function(idx, field) {
      if (!hasValue('.'+field)) {
        values = true;
      }
    });

    $('.button').prop('disabled', values);
    $('.info').css({opacity: values ? 1 : 0});

    return values;
  }

  // When the user releases a key
  $(document).keyup(function() {
    doWork();
  });

  $(document).on('click', function() {
    doWork();
  });

  $(document).keypress(function (e) {
    e.preventDefault();
    if (e.which == 13) {
      console.log('enter');
      if (!doWork()) {
        $('.button').click();
      }
      return false;
    }
  });
}
