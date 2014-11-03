exports.customerForm = function (ptor, text_helper, dropdown_helper, option) {
  if (option == 'new'){
    var tenant = element(by.model('customer.tenantRef'));
    tenant.sendKeys(dropdown_helper.selectDropdownbyNum(4));

    var tenant_group = element(by.model('customer.customerGroup'));
    tenant_group.sendKeys(dropdown_helper.selectDropdownbyNum(10));
  }

  var duns_no = element(by.model('customer.dunsNo'));
  if (option == 'edit'){
    duns_no.clear();
  }
  duns_no.sendKeys(text_helper.getRandomString(5)+text_helper.getRandomNumber(2));

  var name = element(by.model('customer.customerName'));
  if (option == 'edit'){
    name.clear();
  }
  name.sendKeys(text_helper.getRandomString(text_helper.getRandomString(3))+'%');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[2].getText()).toContain('*invalid customer name');
  });
  ptor.sleep(200);
  name.clear();
  name.sendKeys(text_helper.getRandomString(1));
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[3].getText()).toContain('*too short');
  });
  ptor.sleep(200);
  name.clear();
  name.sendKeys(text_helper.getRandomString(6));

  var eac = element(by.model('customer.abstractBusinessPartner.extAccountCode'));
  if (option == 'edit'){
    eac.clear();
  }
  eac.sendKeys(text_helper.getRandomString(5)+text_helper.getRandomNumber(3));

  var ename = element(by.model('customer.abstractBusinessPartner.extName'));
  if (option == 'edit'){
    ename.clear();
  }
  ename.sendKeys(text_helper.getRandomString(text_helper.getRandomString(2))+'^');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[4].getText()).toContain('*invalid external name');
  });
  ptor.sleep(200);
  ename.clear();
  ename.sendKeys(text_helper.getRandomString(1));
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[5].getText()).toContain('*too short');
  });
  ptor.sleep(200);
  ename.clear();
  ename.sendKeys(text_helper.getRandomString(4)); 

  var esname = element(by.model('customer.abstractBusinessPartner.extShortName'));
  if (option == 'edit'){
    esname.clear();
  }
  esname.sendKeys(text_helper.getRandomString(text_helper.getRandomString(4))+'!');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[6].getText()).toContain('*invalid external short name');
  });
  ptor.sleep(200);
  esname.clear();
  esname.sendKeys(text_helper.getRandomString(1));
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[7].getText()).toContain('*too short');
  });
  ptor.sleep(200);
  esname.clear();
  esname.sendKeys(text_helper.getRandomString(3)); 

  var gid = element(by.model('customer.abstractBusinessPartner.extGlobalId'));
  if (option == 'edit'){
    gid.clear();
  }
  gid.sendKeys(text_helper.getRandomString(text_helper.getRandomString(4))+'&');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[8].getText()).toContain('*invalid external global id');
  });
  ptor.sleep(200);
  gid.clear();
  gid.sendKeys(text_helper.getRandomString(1));
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[9].getText()).toContain('*too short');
  });
  ptor.sleep(200);
  gid.clear();
  gid.sendKeys(text_helper.getRandomString(6)+text_helper.getRandomNumber(3)); 

  var hcode = element(by.model('customer.hierarchyCode'));
  if (option == 'edit'){
    hcode.clear();
  }
  hcode.sendKeys(text_helper.getRandomString(6)+text_helper.getRandomNumber(3));

  var language = element(by.model('customer.abstractBusinessPartner.language'));
  language.sendKeys(dropdown_helper.selectDropdownbyNum(20));

  var currency = element(by.model('customer.abstractBusinessPartner.currency'));
  if (option == 'edit'){
    currency.clear();
  }
  currency.sendKeys(text_helper.getRandomString(6));

  var eutaxid = element(by.model('customer.eutaxId'));
  if (option == 'edit'){
    eutaxid.clear();
  }
  eutaxid.sendKeys(text_helper.getRandomString(5)+text_helper.getRandomNumber(3));

  var debitlimit = element(by.model('customer.debitLimit'));
  if (option == 'edit'){
    debitlimit.clear();
  }
  debitlimit.sendKeys(text_helper.getRandomString(text_helper.getRandomString(4))+'@');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[10].getText()).toContain('*invalid debit limit');
  });
  ptor.sleep(200);
  debitlimit.clear();
  debitlimit.sendKeys(text_helper.getRandomNumber(6));

  var tax = element(by.model('customer.tax'));
  if (option == 'edit'){
    tax.clear();
  }
  tax.sendKeys(text_helper.getRandomString(text_helper.getRandomString(4))+'#');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[11].getText()).toContain('*invalid tax amount');
  });
  ptor.sleep(200);
  tax.clear();
  tax.sendKeys(text_helper.getRandomNumber(7));

  var inv_tp = element(by.model('customer.invTolerancePercent'));
  if (option == 'edit'){
    inv_tp.clear();
  }
  inv_tp.sendKeys('50.3');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[13].getText()).toContain('*invalid inv. tolerance percent');
  });
  ptor.sleep(200);
  inv_tp.clear();
  inv_tp.sendKeys('50.59'); 

  var inv_ta = element(by.model('customer.invToleranceAbs'));
  if (option == 'edit'){
    inv_ta.clear();
  }
  inv_ta.sendKeys('23.562');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[15].getText()).toContain('*invalid inv. tolerance absolute');
  });
  ptor.sleep(200);
  inv_ta.clear();
  inv_ta.sendKeys('23.56'); 

  var info = element(by.model('customer.information'));
  if (option == 'edit'){
    info.clear();
  }
  info.sendKeys(text_helper.getRandomString(20));

  var htext = element(by.model('customer.headerText'));
  if (option == 'edit'){
    htext.clear();
  }
  htext.sendKeys(text_helper.getRandomString(20));

  var ftext = element(by.model('customer.footerText'));
  if (option == 'edit'){
    ftext.clear();
  }
  ftext.sendKeys(text_helper.getRandomString(20));

  var profile = element(by.model('customer.customerProfile'));
  if (option == 'edit'){
    profile.clear();
  }
  profile.sendKeys(text_helper.getRandomString(20));

};

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
  }
  if (option == 'edit'){
    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('contact updated');
    });
  }
};

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
  }
  if (option == 'edit'){
    element.all(by.css('.growl')).then(function(items) {
      expect(items[0].getText()).toContain('address updated');
    });
  }
};