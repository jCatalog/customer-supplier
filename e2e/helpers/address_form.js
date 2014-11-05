exports.addressForm = function (ptor, text_helper, dropdown_helper, email_helper, option) {
  if (option == 'new'){
    element(by.css('[ng-click="new_address()"]')).click();
  }
  if (option == 'edit'){
    element.all(by.css('.list-group-item button')).then(function(adressess) {
      adressess[2].click();
    });
  }

  ptor.sleep(500);
  
  var name1 = element(by.model('newAddr.name1'));
  if (option == 'edit'){
    name1.clear();
  }
  name1.sendKeys('@hjksd');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[8].getText()).toContain('*invalid name 1');
  });
  ptor.sleep(200);
  name1.clear();
  name1.sendKeys(text_helper.getRandomString(5));
  ptor.sleep(500);
  
  var name2 = element(by.model('newAddr.name2'));
  if (option == 'edit'){
    name2.clear();
  }
  name2.sendKeys('%bdd');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[9].getText()).toContain('*invalid name 2');
  });
  ptor.sleep(200);
  name2.clear();
  name2.sendKeys(text_helper.getRandomString(5));
  ptor.sleep(500);

  var name3 = element(by.model('newAddr.name3'));
  if (option == 'edit'){
    name3.clear();
  }
  name3.sendKeys('@nu');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[10].getText()).toContain('*invalid name 3');
  });
  ptor.sleep(200);
  name3.clear();
  name3.sendKeys(text_helper.getRandomString(5));
  ptor.sleep(500);

  var atype = element(by.model('newAddr.addressType'));
  if (option == 'edit'){
    atype.clear();
  }
  atype.sendKeys(text_helper.getRandomString(10));
  ptor.sleep(500);

  var street = element(by.model('newAddr.street'));
  if (option == 'edit'){
    street.clear();
  }
  street.sendKeys(text_helper.getRandomString(10));
  ptor.sleep(500);

  var city = element(by.model('newAddr.city'));
  if (option == 'edit'){
    city.clear();
  }
  city.sendKeys(text_helper.getRandomString(10));
  ptor.sleep(500);
  
  var zipcode = element(by.model('newAddr.zipCode'));
  if (option == 'edit'){
    zipcode.clear();
  }
  zipcode.sendKeys('%bdd');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[11].getText()).toContain('*Invalid zipcode');
  });
  ptor.sleep(200);
  zipcode.clear();
  zipcode.sendKeys(text_helper.getRandomString(5));
  ptor.sleep(500);

  var state = element(by.model('newAddr.state'));
  if (option == 'edit'){
    state.clear();
  }
  state.sendKeys(text_helper.getRandomString(6));
  ptor.sleep(500);

  var country = element(by.model('newAddr.country'));
  country.sendKeys('ge'+ protractor.Key.ENTER);
  ptor.sleep(500);

  var pb = element(by.model('newAddr.pobox'));
  if (option == 'edit'){
    pb.clear();
  }
  pb.sendKeys('test@');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[12].getText()).toContain('*Invalid pobox');
  });
  ptor.sleep(200);
  pb.clear();
  pb.sendKeys(text_helper.getRandomString(6));
  ptor.sleep(500);

  var pbz = element(by.model('newAddr.poboxZipCode'));
  if (option == 'edit'){
    pbz.clear();
  }
  pbz.sendKeys('ad^daj');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[13].getText()).toContain('*Invalid pobox zip code');
  });
  ptor.sleep(200);
  pbz.clear();
  pbz.sendKeys(text_helper.getRandomNumber(5));
  ptor.sleep(500);

  var ph = element(by.model('newAddr.phoneNo'));
  if (option == 'edit'){
    ph.clear();
  }
  ph.sendKeys(text_helper.getRandomNumber(1));
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[14].getText()).toContain('*Invalid phone number');
  });
  ptor.sleep(200);
  ph.clear();
  ph.sendKeys(text_helper.getRandomNumber(9));
  ptor.sleep(500);

  var fax = element(by.model('newAddr.faxNo'));
  if (option == 'edit'){
    fax.clear();
  }
  fax.sendKeys('fax');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[15].getText()).toContain('*Invalid Fax number');
  });
  ptor.sleep(200);
  fax.clear();
  fax.sendKeys(text_helper.getRandomNumber(9));
  ptor.sleep(500);

  var email = element(by.model('newAddr.email'));
  if (option == 'edit'){
    email.clear();
  }
  email.sendKeys('test.com');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[16].getText()).toContain('*Invalid e-mail');
  });
  ptor.sleep(200);
  email.clear();
  email.sendKeys(email_helper.getRandomEmail());
  ptor.sleep(500);

  var curl = element(by.model('newAddr.corporateURL'));
  if (option == 'edit'){
    curl.clear();
  }
  curl.sendKeys('testsite');
  element.all(by.css('.col-md-8 span')).then(function(items) {
    expect(items[17].getText()).toContain('*Invalid corporate URL');
  });
  ptor.sleep(200);
  curl.clear();
  curl.sendKeys('www'+text_helper.getRandomString(5)+'.in');
  ptor.sleep(500);

  var eno = element(by.model('newAddr.numOfEmployees'));
  if (option == 'edit'){
    eno.clear();
  }
  eno.sendKeys(text_helper.getRandomString(3));
  ptor.sleep(500);
  eno.clear();
  eno.sendKeys(text_helper.getRandomNumber(3));
  ptor.sleep(500);

  element(by.css('[ng-click="addAddress(newAddr)"]')).click();
  if (option == 'new'){
    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('new address added');
    });
    ptor.sleep(100);
    element(by.css('[ng-click="deleteMessage(message)"]')).click();
  }
  if (option == 'edit'){
    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('address updated');
    });
    ptor.sleep(100);
    element(by.css('[ng-click="deleteMessage(message)"]')).click();
  }
};