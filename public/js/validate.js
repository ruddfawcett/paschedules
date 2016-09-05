function validate(fields) {
  function doWork() {
    function hasValue(selector) {
      return $.trim($(selector).val()).length;
    }

    var values = false;

    $.each(fields, (idx, field) => {
      if (!hasValue('.'+field)) {
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
