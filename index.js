console.log('Gellin - https://github.com/gellin');
console.log('Lambda/SES Email Forwarder sendRawEmail - Version 1.0.0');

var aws = require('aws-sdk');
var ses = new aws.SES();

var mailcomposer = require('mailcomposer');
var MailComposer = mailcomposer.MailComposer;

exports.handler = function (event, context) {
    if (!event.subject) {
        context.fail('Missing argument: subject');
    }
    
    if (!event.from) {
        context.fail('Missing argument: from');
    }

    if (!event.html && !event.text) {
        context.fail('Missing argument: html|text');
    }
    
    if (!event.bcc && !event.to && !event.cc) { 
        context.fail('Missing argument: bcc|to|cc');
    }

    var to 	    = event.to;
    var cc      = event.cc;
    var bcc     = event.bcc;
    var from 	= event.from;
    var subject = event.subject;
    var htmlBody = event.html;
    var textBody = event.text;
    var attachments = event.attachments;
	    
    var mailOptions = {
        from: from,
        subject: subject,
        text: textBody ? textBody : '',
        html: htmlBody ? htmlBody : '',
        bcc: bcc ? bcc : '',
        to: to ? to : '',
        cc: cc ? cc : '',
        attachments: attachments ? attachments : ''
    };
    
    var mail = mailcomposer(mailOptions);
    
    if (bcc) {
    	mail.keepBcc = true;
    }

    mail.build(function (err, message){
        var req = ses.sendRawEmail({RawMessage: {Data: message}});
        req.send(function (err, data) {
            if (err) {
                context.fail('The email failed to send');
            } else {
                context.succeed('The email was successfully sent');
            }
        }); 
    }); 
};