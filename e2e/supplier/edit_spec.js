'use strict';

describe('Suppliers edit page', function() {
  var ptor;
  var text_helper;
  var dropdown_helper;
  var random_number;
  var email_helper;
  var edit_supplier_helper;
  var contact_helper;
  var address_helper;
  beforeEach(function() {
    browser.ignoreSynchronization = true;
    ptor = protractor.getInstance();
    text_helper = require('../helpers/random_text.js');
    dropdown_helper = require('../helpers/selectDropdown.js');
    email_helper = require('../helpers/random_email.js');
    edit_supplier_helper = require('../helpers/supplier_form.js');
    contact_helper = require('../helpers/contact_form.js');
    address_helper = require('../helpers/address_form.js');
    browser.get('http://localhost:3035/#/');
    ptor.sleep(500);
    element.all(by.css('.navbar-nav li')).then(function(items) {
      items[1].click();
      ptor.sleep(500);
    });
  });

  afterEach(function() {

  })

  it('should show the error messages when wrong input is entered while editing', function() {

    var country = element(by.model('srch.supplier.country'));
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
      items[7].click();
    });
    
    edit_supplier_helper.supplierForm(ptor, text_helper, dropdown_helper, 'edit');
    ptor.sleep(500);
    contact_helper.contactForm(ptor, text_helper, dropdown_helper, email_helper, 'edit');
    ptor.sleep(500);
    address_helper.addressForm(ptor, text_helper, dropdown_helper, email_helper, 'edit');
    ptor.sleep(500);
    element.all(by.css('.btn-block')).then(function(items) {
      items[4].click();
    });

    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('supplier updated Succesfully');
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

    it('show popup when cancel button is clicked without entering data', function() {

      ptor.sleep(500);
      element.all(by.css('.btn-block')).then(function(items) {
        items[8].click();
      });
      expect(browser.getCurrentUrl()).toContain('#/suppliers');
      ptor.sleep(500);
    });

    describe('show error message when wrong data is trying to save', function() {
      beforeEach(function() {
        ptor.sleep(500);
        element.all(by.css('.btn-block')).then(function(items) {
          items[7].click();
        });
        ptor.sleep(500);
      });

      it('in profile', function() {
        var ename = element(by.model('supplier.abstractBusinessPartner.extName'));
        ename.sendKeys(text_helper.getRandomString(text_helper.getRandomString(2))+'^');

        ptor.sleep(500);
        element.all(by.css('.btn-block')).then(function(items) {
          items[4].click();
        });

        element.all(by.css('.modal-body p')).then(function(items) {
          expect(items[0].getText()).toContain('Please enter valid datas');
        });
      });

      it('in contact', function() {
        element.all(by.css('[ng-click="edit_contact(contact)"]')).then(function(contacts) {
          contacts[0].click();
        });
        var fname = element(by.model('newContact.firstName'));
        fname.sendKeys('@hjksd');
        ptor.sleep(500);

        element(by.css('[ng-click="addContact(newContact)"]')).click();
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('please enter required and valid field to update contact');
        });
        
      });

      it('in address', function() {
        element.all(by.css('[ng-click="edit_address(addr)"]')).then(function(contacts) {
          contacts[0].click();
        });
        var name1 = element(by.model('newAddr.name1'));
        name1.sendKeys('@hjksd');
        ptor.sleep(500);

        element(by.css('[ng-click="addAddress(newAddr)"]')).click();
        element.all(by.css('.growl')).then(function(items) {
          expect(items[0].getText()).toContain('please enter required and valid field to update address');
        });
      });

    });
    
  });
  
});