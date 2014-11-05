exports.contactForm = function (ptor, text_helper, dropdown_helper, email_helper, option) {
  ptor.sleep(500);
  if (option == 'new'){
    element(by.css('[ng-click="new_contact()"]')).click();
  }
  if (option == 'edit'){
    element.all(by.css('.list-group-item button')).then(function(contacts) {
      contacts[0].click();
    });
  }
  ptor.sleep(500);
  var cnt_type = element(by.model('newContact.contactType'));
  cnt_type.sendKeys('Contact Type'+ protractor.Key.ENTER);
  ptor.sleep(500);

  var fname = element(by.model('newContact.firstName'));
  if (option == 'edit'){
    fname.clear();
  }
  fname.sendKeys('@hjksd');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[0].getText()).toContain('*invalid first name');
  });
  ptor.sleep(200);
  fname.clear();
  fname.sendKeys(text_helper.getRandomString(5));
  ptor.sleep(500);
  
  var lname = element(by.model('newContact.lastName'));
  if (option == 'edit'){
    lname.clear();
  }
  lname.sendKeys('%bdd');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[1].getText()).toContain('*invalid last name');
  });
  ptor.sleep(200);
  lname.clear();
  lname.sendKeys(text_helper.getRandomString(5));
  ptor.sleep(500);

  var dept = element(by.model('newContact.department'));
  if (option == 'edit'){
    dept.clear();
  }
  dept.sendKeys(text_helper.getRandomString(10));
  ptor.sleep(500);
  
  var description = element(by.model('newContact.description'));
  if (option == 'edit'){
    description.clear();
  }
  description.sendKeys('%bdd');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[2].getText()).toContain('*invalid description');
  });
  ptor.sleep(200);
  description.clear();
  description.sendKeys(text_helper.getRandomString(5));
  ptor.sleep(500);

  var email = element(by.model('newContact.email'));
  if (option == 'edit'){
    email.clear();
  }
  email.sendKeys('test.com');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[3].getText()).toContain('*Invalid email');
  });
  ptor.sleep(200);
  email.clear();
  email.sendKeys(email_helper.getRandomEmail());
  ptor.sleep(500);

  var ph = element(by.model('newContact.phone'));
  if (option == 'edit'){
    ph.clear();
  }
  ph.sendKeys(text_helper.getRandomNumber(2));
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[4].getText()).toContain('*Invalid phone number');
  });
  ptor.sleep(200);
  ph.clear();
  ph.sendKeys(text_helper.getRandomNumber(9));
  ptor.sleep(500);

  var altph = element(by.model('newContact.alternatePhone'));
  if (option == 'edit'){
    altph.clear();
  }
  altph.sendKeys(text_helper.getRandomNumber(1));
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[5].getText()).toContain('*Invalid phone number');
  });
  ptor.sleep(200);
  altph.clear();
  altph.sendKeys(text_helper.getRandomNumber(9));
  ptor.sleep(500);

  var mobile = element(by.model('newContact.mobile'));
  if (option == 'edit'){
    mobile.clear();
  }
  mobile.sendKeys('test');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[6].getText()).toContain('*Invalid mobile number');
  });
  ptor.sleep(200);
  mobile.clear();
  mobile.sendKeys(text_helper.getRandomNumber(9));
  ptor.sleep(500);

  var url = element(by.model('newContact.url'));
  if (option == 'edit'){
    url.clear();
  }
  url.sendKeys('testsite');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[7].getText()).toContain('*Invalid url');
  });
  ptor.sleep(200);
  url.clear();
  url.sendKeys('www'+text_helper.getRandomString(5)+'.in');
  ptor.sleep(500);

  element(by.css('[ng-click="addContact(newContact)"]')).click();
  if (option == 'new'){
    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('new contact created');
    });
    ptor.sleep(100);
    element(by.css('[ng-click="deleteMessage(message)"]')).click();
  }
  if (option == 'edit'){
    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('contact updated');
    });
    ptor.sleep(100);
    element(by.css('[ng-click="deleteMessage(message)"]')).click();
  }
};