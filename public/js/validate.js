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
  }

  // When the user releases a key
  $(document).keyup(function() {
    doWork();
  });
}
