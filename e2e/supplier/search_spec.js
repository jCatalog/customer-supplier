'use strict';

describe('Suppliers search page', function() {
  var ptor;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    
    browser.get('http://localhost:3035/#/');
    ptor.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[1].click();
      ptor.sleep(500);
    });
  });

  afterEach(function() {

  })


  it('able to get search results using country name', function() {
    var country = element(by.model('srch.supplier.country'));
    country.sendKeys('india');
    element.all(by.css('.btn-primary')).then(function(items) {
      items[1].click();
    });
    ptor.sleep(1000);

    var suppliers = element.all(by.repeater('supplier in pagedItems[currentPage]'));
    expect(suppliers.count()).toBe(2);
    ptor.sleep(500);
    country.clear();
  });

  it('able to get search results using supplier name', function() {
    var cname = element(by.model('srch.supplier.supplierName'));
    cname.sendKeys('sarvani');
    element.all(by.css('.btn-primary')).then(function(items) {
      items[1].click();
    });
    ptor.sleep(1000);

    var suppliers = element.all(by.repeater('supplier in pagedItems[currentPage]'));
    expect(suppliers.count()).toBe(1);
    ptor.sleep(500);
    cname.clear();
  });

  it('able to get search results using supplier city name', function() {
    var city = element(by.model('srch.supplier.city'));
    city.sendKeys('Hyderabad');
    element.all(by.css('.btn-primary')).then(function(items) {
      items[1].click();
    });
    ptor.sleep(1000);

    var suppliers = element.all(by.repeater('supplier in pagedItems[currentPage]'));
    expect(suppliers.count()).toBe(1);
    ptor.sleep(500);
    city.clear();
  });

  it('able to get search results using supplier state name', function() {
    var state = element(by.model('srch.supplier.state'));
    state.sendKeys('Andhra Pradesh');
    element.all(by.css('.btn-primary')).then(function(items) {
      items[1].click();
    });
    ptor.sleep(1000);

    var suppliers = element.all(by.repeater('supplier in pagedItems[currentPage]'));
    expect(suppliers.count()).toBe(1);
    ptor.sleep(500);
    state.clear();
  });

  it('able to get search results using supplier id', function() {
    var cid = element(by.model('srch.supplier.supplierId'));
    cid.sendKeys('9');
    element.all(by.css('.btn-primary')).then(function(items) {
      items[1].click();
    });
    ptor.sleep(1000);

    var suppliers = element.all(by.repeater('supplier in pagedItems[currentPage]'));
    expect(suppliers.count()).toBe(1);
    ptor.sleep(500);
    cid.clear();
  });

  it('able to get search results using two valid combination of inputs', function() {
    var cid = element(by.model('srch.supplier.supplierId'));
    cid.sendKeys('9');
    var city = element(by.model('srch.supplier.city'));
    city.sendKeys('delhi');
    element.all(by.css('.btn-primary')).then(function(items) {
      items[1].click();
    });
    ptor.sleep(1000);

    var suppliers = element.all(by.repeater('supplier in pagedItems[currentPage]'));
    expect(suppliers.count()).toBe(1);
    ptor.sleep(500);
    cid.clear();
    city.clear();
  });

  it('able to show 0 search results using two valid combination of inputs and one invalid input', function() {
    var cid = element(by.model('srch.supplier.supplierId'));
    cid.sendKeys('9');
    var city = element(by.model('srch.supplier.city'));
    city.sendKeys('delhi');
    var cname = element(by.model('srch.supplier.supplierName'));
    cname.sendKeys('sarvani');
    element.all(by.css('.btn-primary')).then(function(items) {
      items[1].click();
    });
    ptor.sleep(1000);

    var suppliers = element.all(by.repeater('supplier in pagedItems[currentPage]'));
    expect(suppliers.count()).toBe(0);
    ptor.sleep(500);
    cid.clear();
    city.clear();
    cname.clear();
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
    expect(browser.getCurrentUrl()).toContain('/#/suppliers');
    ptor.sleep(500);
  });

  it('able to get excel sheet when export button is clicked', function() {
    element.all(by.css('.btn-default')).then(function(items) {
      items[0].click();
    });
    ptor.sleep(500);
  });

});