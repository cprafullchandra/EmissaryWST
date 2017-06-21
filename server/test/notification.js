require('supertest');
require('../config/config');
// Wrapper that creates admin user to allow api calls
let Employee = require('../models/Employee');
let Email = require('../notification/email');
let TextModel = require('../notification/text');

// SAMPLE : [{phone_number: "XXX-XXX-XXXX", email: "XXXXX@XXXXX.com"}];
var employees      = [{phone_number: "555-555-5555", email:"kissmyapp2017@gmail.com"}];
var employees_fail = [];

describe("Notification", function() {
    it('It should send an email', function(done){
      this.timeout(9000);
      Email.sendEmail("Tony Montana", employees, done);
      done();
    });

    it('It should send an text', function(done){
      this.timeout(9000);
      TextModel.sendText("Tony Montana", employees, done);
      //done(); //there should only be one done() call or else test fails?
    });

   it('It should not send an email', function(done){
      this.timeout(9000);
      Email.sendEmail("Tony Montana", employees_fail, done);
      //done();
    });

    it('It should not send an text', function(done){
      this.timeout(9000);
      TextModel.sendText("Tony Montana", employees_fail, done);
      //done();
    });

  }
);
