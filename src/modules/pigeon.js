var Q = require('q');
var templates = require ('./templates');
var sprintf = require("sprintf-js").sprintf;

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://andover.schedules%40gmail.com:@smtp.gmail.com');

var mailFrom = '"Rudd Fawcett" <andover.schedules@gmail.com>'

module.exports = {
  send: (type, data) => {
    var P = Q.defer();
    switch(type) {
      case 'verify':
        var options = {
          from: mailFrom,
          to: data.user.email,
          subject: templates.verify.subject,
          text: sprintf(templates.verify.text, data.user.name.first, data.token._id),
          html: sprintf(templates.verify.text, data.user.name.first, data.token._id),
        };

        console.log('this is the message sent: ', options.text);

        P.resolve();

        /** Send mail... TBD...
        transporter.sendMail(options, (error, info) => {
          if (error) {
            P.reject(error);
          }

          if (info) {
            console.log('Message sent: ' + info.response);
            P.resolve();
          }
        });
        **/

      break;
    }

    return P.promise;
  }
};
