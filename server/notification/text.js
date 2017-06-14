let express = require('express');

// Load the twilio module
let twilio = require('twilio');

// Twilio Credentials 
let accountSid = 'ACe877c92fb6dc6f0ef3aa84c0b0b14999';
let authToken  = '689e230b27fb493e24600c89f843697f';

//require the Twilio module and create a REST client 
let client = require('twilio')(accountSid, authToken);

// sendText: Send text message to employees when visitorList is checked in.
module.exports.sendText = function(patientName, employees, done) {
    if(employees === null || (employees.length <= 0)) {
        if(done) return done();
    }

    let len = employees.length;

    let callback = function(i) {
        return function(error) {
            if(error) {
                console.log(error);
                console.log("Error occurred sending text");
            } else {
                console.log("Text was sent.");
            }
            if(done && len-1 === i) done();
        };
    };

    // iterate through all employees
    for (let index = 0; index < employees.length; index++) {
        // create text message object that will be sent
        client.messages.create({
            to: employees[index].phone_number,
            from: "+16266711727",
            body:'Your visitorList ' + patientName + ' is ready.'
        }, callback(index));
    }
};
