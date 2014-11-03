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
      var cname = element(by.model('srch.customer.customerName'));
      cname.sendKeys('sarvani');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(1);
      ptor.sleep(500);
    });

    it('able to get search results using customer city name', function() {
      var city = element(by.model('srch.customer.city'));
      city.sendKeys('mumbai');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(1);
      ptor.sleep(500);
    });

    it('able to get search results using customer state name', function() {
      var state = element(by.model('srch.customer.state'));
      state.sendKeys('maharastra');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(0);
      ptor.sleep(500);
    });

    it('able to get search results using customer id', function() {
      var cid = element(by.model('srch.customer.customerId'));
      cid.sendKeys('9');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(1);
      ptor.sleep(500);
    });

    it('able to get search results using two valid combination of inputs', function() {
      var cid = element(by.model('srch.customer.customerId'));
      cid.sendKeys('9');
      var city = element(by.model('srch.customer.city'));
      city.sendKeys('new delhi');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(1);
      ptor.sleep(500);
    });

    it('able to show 0 search results using two valid combination of inputs and one invalid input', function() {
      var cid = element(by.model('srch.customer.customerId'));
      cid.sendKeys('9');
      var city = element(by.model('srch.customer.city'));
      city.sendKeys('new delhi');
      var cname = element(by.model('srch.customer.customerName'));
      cname.sendKeys('sarvani');
      element.all(by.css('.btn-primary')).then(function(items) {
        items[1].click();
      });
      ptor.sleep(1000);

      var customers = element.all(by.repeater('customer in pagedItems[currentPage]'));
      expect(customers.count()).toBe(0);
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