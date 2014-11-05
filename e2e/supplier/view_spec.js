'use strict';

describe('Suppliers view page', function() {
  var ptor;
  var text_helper;
  var dropdown_helper;
  var random_number;
  var email_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    text_helper = require('../helpers/random_text.js');
    dropdown_helper = require('../helpers/selectDropdown.js');
    email_helper = require('../helpers/random_email.js');
    browser.get('http://localhost:3035/#/');
    ptor.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[1].click();
      ptor.sleep(500);
    });
  });

  describe('should', function() {
    beforeEach(function() {
      var country = element(by.model('srch.supplier.country'));
      country.clear();
      country.sendKeys('india');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      element.all(by.tagName('tr')).then(function(items) {
        items[1].click();
      });

    });

    it('able view supplier page', function() {
      expect(browser.getCurrentUrl()).toContain('#/supplier');
      ptor.sleep(500);
    });

    it('able view the contact details when he clicked on view button of any contact', function() {
      ptor.sleep(500);
      element.all(by.css('[ng-click="edit_contact(contact)"]')).then(function(items) {
        items[0].click();
      });
      ptor.sleep(500);
      element.all(by.buttonText('Ok')).then(function(items) {
        items[0].click();
      });
      ptor.sleep(500);
    });

    it('able view the address details when he clicked on view button of any address', function() {
      ptor.sleep(500);
      element.all(by.css('[ng-click="edit_address(addr)"]')).then(function(items) {
        items[0].click();
      });
      ptor.sleep(500);
      element.all(by.buttonText('Ok')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(500);
    });
    
  });
  
});