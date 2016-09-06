$(function() {
  $('.button').on('click', () => {
    var credentials = {
      username: $('.username').val().trim().toLowerCase(),
      password: $('.password').val().trim()
    }

    $.ajax({
      type: 'POST',
      url: '/login',
      data: credentials,
      xhrFields: {
        withCredentials: true
      },
      success: (result) => {
        console.log(result);
        if (result.code === 200) {
          window.location = '/';
        }
        else if (result.code === 401) {
          $('.message').text('Could not find a user with that username and password.').fadeIn().delay(2000).fadeOut();
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
