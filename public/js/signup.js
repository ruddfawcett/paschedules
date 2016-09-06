$(function() {
  $('.button').on('click', () => {
    function hasValue(obj) {
      return $.trim($(obj).val()).length;
    }

    var first = $('.first');
    var last = $('.last');
    var year = parseInt($('.class').val()) || 0;
    var ical = $('.ical');
    var username = $('.username');
    var password = $('.password');

    if (year < 2017 || year > 2020) {
      $('.message').text('Please enter a valid year.').fadeIn().delay(2000).fadeOut();
      return;
    }

    if (!hasValue(first) || !hasValue(last) || !hasValue(username) || !hasValue(ical) || !hasValue(password)) {
      $('.message').text('Please complete the entire form.').fadeIn().delay(2000).fadeOut();
      return;
    }
    else {
      if (!ical.val().startsWith('https://unify-ext.andover.edu/extranet/Student/OpenCalendar')) {
        $('.message').text('Your iCal URL looks incorrect, try again?').fadeIn().delay(2000).fadeOut();
        return;
      }

      var student = {
        name: {
          first: first.val(),
          last: last.val()
        },
        ical: ical.val(),
        class: year,
        username: username.val(),
        password: password.val()
      }

      $.ajax({
        type: 'POST',
        url: '/signup',
        data: student,
        success: (result) => {
          if (result.code === 201) {
            $('.message').text('Your account was created, a verification email has been sent to your Andover account.').fadeIn();
            setTimeout(function(){ window.location = '/'; }, 5000);
          }
          else if (result.code === 400) {
            $('.message').text('Your iCal URL looks incorrect, try again?').fadeIn().delay(2000).fadeOut();
          }
          else if (result.code === 409) {
            $('.message').text('A user with that username already exists.').fadeIn().delay(2000).fadeOut();
          }
          else {
            $('.message').text('Error creating your account.').fadeIn().delay(2000).fadeOut();
          }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
          $('.message').text('Error creating your account.').fadeIn().delay(2000).fadeOut();
        }
      });
    }
  });
});
