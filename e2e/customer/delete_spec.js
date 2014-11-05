'use strict';

describe('Customers page', function() {
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
      items[0].click();
      ptor.sleep(500);
    });
  });


  it('should able to delete the customer when remove button is clicked', function() {
    var country = element(by.model('srch.customer.country'));
    if (country != null){
      country.clear();
    }
    var cname = element(by.model('srch.customer.customerName'));
    cname.sendKeys('cust');
    element.all(by.css('.btn-primary')).then(function(items) {
      items[1].click();
    });
    ptor.sleep(1000);
    element.all(by.css('.btn-default')).then(function(items) {
      items[1].click();
    });
    ptor.sleep(500);
    element(by.css('[ng-click="ok()"]')).click();
    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('Customer removed Succesfully');
    });
    ptor.sleep(100);
    element(by.css('[ng-click="deleteMessage(message)"]')).click();
  });

  describe('should remove', function() {
    beforeEach(function() {
      var cname = element(by.model('srch.customer.customerName'));
      cname.clear();
      cname.sendKeys('Mukund');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);
      element.all(by.css('[ng-click="customer_view(customer._id)"]')).then(function(items) {
        items[2].click();
      });
      ptor.sleep(500);
      element.all(by.css('.btn-block')).then(function(items) {
        items[8].click();
      });
      ptor.sleep(500);
    });

    it('the contact when contact delete button is clicked', function() {
      element.all(by.css('[ng-click="delete_contact($index)"]')).then(function(items) {
        items[0].click();
      });
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('contacts deleted Succesfully');
      });
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
      ptor.sleep(500);
    });

    it('the address when address delete button is clicked', function() {
      ptor.sleep(500);
      element.all(by.css('[ng-click="delete_address($index)"]')).then(function(items) {
        items[0].click();
      });
      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('address deleted Succesfully');
      });
      ptor.sleep(100);
      element(by.css('[ng-click="deleteMessage(message)"]')).click();
      ptor.sleep(500);
    });
    
  });
  
});