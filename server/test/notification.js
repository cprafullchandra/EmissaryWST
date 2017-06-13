var request = require('supertest');
var config = require('../config/config');
// Wrapper that creates admin user to allow api calls
var ConfigureAuth = require('./ConfigureAuth');
var Employee = require('../models/Employee');


var Email = require('../notification/email');
var TextModel = require('../notification/text');

// SAMPLE : [{phone_number: "XXX-XXX-XXXX", email: "XXXXX@XXXXX.com"}];
var employees = [{phone_number: "555-555-5555", email:"kissmyapp2017@gmail.com"}];
var employee_fail = [];

describe("Notification", function() {

    it('It should send an email', function(done){
      this.timeout(9000);
      Email.sendEmail("Tony Montana", employees, done);
      done();
    });

    it('It should send an text', function(done){
      this.timeout(9000);
      TextModel.sendText("Tony Montana", employees, done);
      done();
    });

   it('It should not send an email', function(done){
      this.timeout(9000);
      Email.sendEmail("Tony Montana", employee_fail, done);
      //done();
    });

    it('It should not send an text', function(done){
      this.timeout(9000);
      TextModel.sendText("Tony Montana", employee_fail, done);
      //done();
    });

  }
);
