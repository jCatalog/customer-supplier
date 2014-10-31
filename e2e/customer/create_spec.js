'use strict';

describe('Customers create page', function() {
  var ptor;
  var text_helper;
  var dropdown_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    text_helper = require('../helpers/random_text.js');
    dropdown_helper = require('../helpers/selectDropdown.js');

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
      element.all(by.css('.btn-primary')).then(function(items) {
        items[0].click();
      });
      ptor.sleep(500);
	  	expect(browser.getCurrentUrl()).toContain('/new_customer');
	  	ptor.sleep(500);
    });

    it('create the customer if sufficient details are provided', function() {
    	var tenant = element(by.model('customer.tenantRef'));
    	tenant.sendKeys(dropdown_helper.selectDropdownbyNum(4));
    	var tenant_group = element(by.model('customer.customerGroup'));
    	tenant_group.sendKeys(dropdown_helper.selectDropdownbyNum(10));
    	var name = element(by.model('customer.customerName'));
    	name.sendKeys(text_helper.getRandomString(6));

    	element.all(by.css('.btn-block')).then(function(items) {
        items[0].click();
      });

      element.all(by.css('.growl')).then(function(items) {
        expect(items[0].getText()).toContain('customer created Succesfully');
      });
      
    });

  });
  
});