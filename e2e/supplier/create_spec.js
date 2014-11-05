'use strict';

describe('suppliers create page', function() {
  var ptor;
  var text_helper;
  var dropdown_helper;
  var random_number;
  var email_helper;
  var new_supplier_helper;
  var contact_helper;
  var address_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    text_helper = require('../helpers/random_text.js');
    dropdown_helper = require('../helpers/selectDropdown.js');
    email_helper = require('../helpers/random_email.js');
    new_supplier_helper = require('../helpers/supplier_form.js');
    contact_helper = require('../helpers/contact_form.js');
    address_helper = require('../helpers/address_form.js');
    browser.get('http://localhost:3035/#/');
    ptor.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[1].click();
      ptor.sleep(500);
    });
    element.all(by.css('.btn-primary')).then(function(items) {
      items[0].click();
    });
    ptor.sleep(500);
    expect(browser.getCurrentUrl()).toContain('/#/new_supplier');
    ptor.sleep(500);
  });

  afterEach(function() {
    ptor.sleep(500);
  });

  it('create the supplier if sufficient details are provided', function() {
  	var tenant = element(by.model('supplier.tenantRef'));
  	tenant.sendKeys(dropdown_helper.selectDropdownbyNum(3));
  	var tenant_group = element(by.model('supplier.supplierGroup'));
  	tenant_group.sendKeys(dropdown_helper.selectDropdownbyNum(7));
  	var name = element(by.model('supplier.supplierName'));
  	name.sendKeys(text_helper.getRandomString(6));
  	element.all(by.css('.btn-block')).then(function(items) {
      items[0].click();
    });
    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('supplier created Succesfully');
    });
    ptor.sleep(100);
    element(by.css('[ng-click="deleteMessage(message)"]')).click();
  });

  it('show the error messages when wrong input is entered', function() {  
    new_supplier_helper.supplierForm(ptor, text_helper, dropdown_helper, 'new');
    ptor.sleep(500);
    contact_helper.contactForm(ptor, text_helper, dropdown_helper, email_helper, 'new');
    ptor.sleep(500);
    address_helper.addressForm(ptor, text_helper, dropdown_helper, email_helper, 'new');
    ptor.sleep(500);
    element.all(by.css('.btn-block')).then(function(items) {
      items[0].click();
    });
    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('supplier created Succesfully');
    });
    ptor.sleep(100);
    element(by.css('[ng-click="deleteMessage(message)"]')).click();
  });

  it('show popup when cancel button is clicked without entering data', function() {
    ptor.sleep(500);
    element.all(by.css('.btn-block')).then(function(items) {
      items[0].click();
    });
    element.all(by.css('.modal-body p')).then(function(items) {
      expect(items[0].getText()).toBe('Please enter valid datas');
    });
    element.all(by.buttonText('Ok')).then(function(items) {
      items[0].click();
    });
  });

  it('reset data if reset button is clicked', function() {
    var tenant = element(by.model('supplier.tenantRef'));
    tenant.sendKeys(dropdown_helper.selectDropdownbyNum(4));
    var tenant_group = element(by.model('supplier.supplierGroup'));
    tenant_group.sendKeys(dropdown_helper.selectDropdownbyNum(10));
    var name = element(by.model('supplier.supplierName'));
    name.sendKeys(text_helper.getRandomString(6));
    element.all(by.css('.btn-block')).then(function(items) {
      items[1].click();
    });
    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('supplier data reset Succesfully');
    });
    ptor.sleep(100);
    element(by.css('[ng-click="deleteMessage(message)"]')).click();
  });

  it('redirect the page if cancel button is clicked', function() {
    ptor.sleep(500);
    element.all(by.css('.btn-block')).then(function(items) {
      items[3].click();
    });
    expect(browser.getCurrentUrl()).toContain('/#/suppliers');
    ptor.sleep(500);
  });
    
});