'use strict';

describe('Customers search page', function() {
  var ptor;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    
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
      
    });

    it('able to get search results using country name', function() {
      var country = element(by.model('srch.customer.country'));
      country.sendKeys('india');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(4);
      ptor.sleep(500);
    });

    it('able to get search results using customer name', function() {
      var country = element(by.model('srch.customer.customerName'));
      country.sendKeys('sarvani');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(1);
      ptor.sleep(500);
    });

    it('able to get search results using customer city name', function() {
      var country = element(by.model('srch.customer.city'));
      country.sendKeys('mumbai');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(1);
      ptor.sleep(500);
    });

    it('able to get search results using customer state name', function() {
      var country = element(by.model('srch.customer.state'));
      country.sendKeys('maharastra');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(0);
      ptor.sleep(500);
    });

    it('able to get search results using customer id', function() {
      var country = element(by.model('srch.customer.customerId'));
      country.sendKeys('9');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(1);
      ptor.sleep(500);
    });

    it('show popup if directly clicks on search button', function() {
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(500);
      element.all(by.css('.modal-body p')).then(function(items) {
        expect(items[0].getText()).toBe('Please fill some entry for search ?');
      });
      element(by.css('[ng-click="cancel()"]')).click();
      ptor.sleep(500);
      expect(browser.getCurrentUrl()).toContain('/customers');
      ptor.sleep(500);
    });

  });

  
});