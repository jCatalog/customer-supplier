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
