/**
 * @file Send email notifications
 */
// Not sure where these globals come from...
/* global done */
/* global len */

let express = require('express');
let nodemailer = require("nodemailer");

module.exports.template = {};

// create reusable transporter object from company email
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'kissmyapp2017@gmail.com',
        pass: 'ucsdkissmyapp2017'
    }
});

let callback = function (i) {
    return function (error) {
        if (error) {
            console.log(error);
            console.log("Error occurred sending email");
        } else {
            console.log("Email was sent.");
        }
        if (done && len - 1 === i) return done();
    };
};

// sendEmail: Send email to employees when visitorList is checked in.
module.exports.sendEmail = function (patientName, employees, done) {

    if (employees === null || (employees.length <= 0)) {
        if (done) return done();
    }

    for (let index = 0; index < employees.length; index++) {
        // create the email object that will be sent
        let mailOptions = {
            from: "Secretariat <kissmyapp2017@gmail.com>", // sender address
            to: employees[index].email, // list of receivers
            subject: "Patient " + patientName + " is ready", // Subject line
            text: "Your visitorList " + patientName + " is here.", // plaintext body
            html: "<b>Your visitorList " + patientName + " is here.</b>" // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, callback(index));
    }
};
