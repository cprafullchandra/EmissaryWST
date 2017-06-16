// Declared in helpers.js
/* global driver */

let assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    makeSuite = require('../util/helpers').makeSuite;

makeSuite('Test Secretariat Landing', function() {

    it('should go to Secretariat Landing', function(done) {
        driver.get('https://kiss-my-app.appspot.com/');

        driver.getTitle().then(function(title) {
            assert.equal(title,'Secretariat');
            done();
        });
    });

});
