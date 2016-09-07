$(function() {
  $('.button').bind('click touchstart', function() {
    var credentials = {
      username: $('.username').val().trim().toLowerCase(),
      password: $('.password').val().trim()
    }

    if (typeof token !== 'undefined') {
      credentials.token = token;
    }

    $.ajax({
      type: 'POST',
      url: '/login',
      data: credentials,
      beforeSend: function() {
        $('.loading').show();
      },
      complete: function() {
        $('.loading').hide();
      },
      xhrFields: {
        withCredentials: true
      },
      success: function(result) {
        if (result.code === 200 || result.code === 201) {
          location.reload();
        }
        else if (result.code === 401) {
          $('.message').text('Could not find a user with that username and password.').fadeIn().delay(2000).fadeOut();
        }
        else if (result.code === 403) {
          $('.message').text('Please verify your account before proceeding.').fadeIn().delay(2000).fadeOut();
        }
        else {
          $('.message').text('Error logging in.').fadeIn().delay(2000).fadeOut();
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $('.message').text('Error logging in.').fadeIn().delay(2000).fadeOut();
      }
    });
  });
});
