function validate(fields) {
  function doWork() {
    function hasValue(selector) {
      return $.trim($(selector).val()).length;
    }

    var values = true;

    $.each(fields, (idx, field) => {
      if (hasValue('.'+field)) {
        values = false;
      }
      else {
        values = true;
      }
    });

    $('.button').prop('disabled', values);
  }

  // If jQuery is super slow to load we still want the button to show up
  setInterval(() => {
    doWork();
  }, 1000);

  // When the user releases a key
  $(document).keyup(() => {
    doWork();
  });
}
