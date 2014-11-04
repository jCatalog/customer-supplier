'use strict';

describe('Tenants Section', function() {
  var ptor;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    
    browser.get('http://localhost:3035/#/');
    ptor.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[2].click();
      ptor.sleep(500);
    });
  });

  afterEach(function() {

  })

  it('should get tenants list', function(){   
    element.all(by.tagName('h3')).then(function(items) {
      expect(items[0].getText()).toBe('Tenants List');
    });
    ptor.sleep(500);
  })

  describe('should get', function() {
    beforeEach(function() {
      element.all(by.tagName('td')).then(function(items) {
        items[13].click();
        ptor.sleep(500);
      });
    });

    it('tenant details', function() {
      element.all(by.css('.nav-tabs li')).then(function(items) {
        items[0].click();
        ptor.sleep(500);
      });
      element.all(by.tagName('h3')).then(function(items) {
        expect(items[0].getText()).toBe('Tenant Details');
      });
    });

    describe('customer', function() {
      beforeEach(function() {
        element.all(by.css('.nav-tabs li')).then(function(items) {
          items[1].click();
          ptor.sleep(500);
        });
      });

      it('list', function() {
        element.all(by.tagName('h1')).then(function(items) {
          expect(items[0].getText()).toBe('Customers List');
        });
      });

      it('details', function() {
        var customers = element.all(by.repeater('customer in customerList'));
        customers.get(0).click();
        ptor.sleep(500);

        element.all(by.tagName('h3')).then(function(items) {
          expect(items[0].getText()).toBe('Customer Details');
        });

      });

    });

    describe('supplier', function() {
      beforeEach(function() {
        element.all(by.css('.nav-tabs li')).then(function(items) {
          items[2].click();
          ptor.sleep(500);
        });
      });

      it('list', function() {
        element.all(by.tagName('h1')).then(function(items) {
          expect(items[1].getText()).toBe('Suppliers List');
        });
      });

      it('details', function() {
        var customers = element.all(by.repeater('sd in supplierData'));
        customers.get(4).click();
        ptor.sleep(500);

        element.all(by.tagName('h3')).then(function(items) {
          expect(items[0].getText()).toBe('Supplier Details');
        });

      });

    });

  });
  
});