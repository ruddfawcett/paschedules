var Q = require('q');
var templates = require ('./templates');
var sprintf = require("sprintf-js").sprintf;

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://andover.schdules%40gmail.com:NHrBy$A5!Hz9E38f@smtp.gmail.com');

var mailFrom = '"Rudd Fawcett" <andover.schdules@gmail.com>'

module.exports = {
  send: function(type, data) {
    var P = Q.defer();
    switch(type) {
      case 'verify':

        var options = {
          from: mailFrom,
          to: data.user.email,
          subject: templates.verify.subject,
          text: sprintf(templates.verify.text, data.user.name.first, data.user._id, data.token._id),
          html: sprintf(templates.verify.text, data.user.name.first, data.user._id, data.token._id),
        };

        transporter.sendMail(options, (error, info) => {
          if (error) {
            P.reject(error);
          }
          console.log('Message sent: ' + info.response);
          P.resolve();
        });

      break;
    }

    return P.promise();
  }
};
