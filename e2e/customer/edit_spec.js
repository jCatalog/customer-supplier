'use strict';

describe('Customers edit page', function() {
  var ptor;
  var text_helper;
  var dropdown_helper;
  var random_number;
  var email_helper;
  var edit_customer_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    text_helper = require('../helpers/random_text.js');
    dropdown_helper = require('../helpers/selectDropdown.js');
    email_helper = require('../helpers/random_email.js');
    edit_customer_helper = require('../helpers/customer_form.js');
    browser.get('http://localhost:3035/#/');
    ptor.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[0].click();
      ptor.sleep(500);
    });
  });

  afterEach(function() {

  })

  describe('should', function() {
    beforeEach(function() {
      var country = element(by.model('srch.customer.country'));
      country.sendKeys('ge');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      element.all(by.tagName('tr')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(500);
      element.all(by.css('.btn-block')).then(function(items) {
        items[8].click();
      });

    });

    it('show the error messages when wrong input is entered', function() {
      
      edit_customer_helper.customerForm(ptor, text_helper, dropdown_helper, 'edit');
      ptor.sleep(500);
      edit_customer_helper.contactForm(ptor, text_helper, dropdown_helper, email_helper, 'edit');
      ptor.sleep(500);
      edit_customer_helper.addressForm(ptor, text_helper, dropdown_helper, email_helper, 'edit');
      ptor.sleep(500);
      element.all(by.css('.btn-block')).then(function(items) {
        items[4].click();
      });

      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('customer updated Succesfully');
      });

    });

    it('show popup when cancel button is clicked without entering data', function() {
      ptor.sleep(500);
      element.all(by.css('.btn-block')).then(function(items) {
        items[0].click();
      });
      element.all(by.css('.modal-body p')).then(function(items) {
        expect(items[0].getText()).toBe('Please enter valid datas');
      });
      ptor.sleep(500);
    });

    it('reset data if reset button is clicked', function() {
      var tenant = element(by.model('customer.tenantRef'));
      tenant.sendKeys(dropdown_helper.selectDropdownbyNum(4));
      var tenant_group = element(by.model('customer.customerGroup'));
      tenant_group.sendKeys(dropdown_helper.selectDropdownbyNum(10));
      var name = element(by.model('customer.customerName'));
      name.sendKeys(text_helper.getRandomString(6));

      element.all(by.css('.btn-block')).then(function(items) {
        items[1].click();
      });

      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('customer data reset Succesfully');
      });
    });

    it('redirect the page if cancel button is clicked', function() {
      ptor.sleep(500);
      element.all(by.css('.btn-block')).then(function(items) {
        items[3].click();
      });
      expect(browser.getCurrentUrl()).toContain('/customers');
      ptor.sleep(500);
    });
    
  });
  
});