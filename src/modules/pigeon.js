var Q = require('q');
var templates = require ('./templates');
var sprintf = require('sprintf-js').sprintf;

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport( {
    service:  'Mailgun',
    auth: {
     user: 'noreply@paschedul.es',
     pass: process.env.EMAIL_PASSWORD
    }
});


var mailFrom = '"PASchedules" <noreply@paschedul.es>'

module.exports = {
  send: (type, data) => {
    var P = Q.defer();
    switch(type) {
      case 'verify':
        var options = {
          from: mailFrom,
          to: `${data.user.username}@andover.edu`,
          subject: templates.verify.subject,
          text: sprintf(templates.verify.text, data.user.name.first, data.token._id),
          html: sprintf(templates.verify.html, data.user.name.first, data.token._id),
        };

        transporter.sendMail(options, (error, info) => {
          if (error) {
            P.reject(error);
          }

          if (info) {
            P.resolve();
          }
        });

      break;
    }

    return P.promise;
  }
};
