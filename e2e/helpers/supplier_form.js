exports.supplierForm = function (ptor, text_helper, dropdown_helper, option) {
  if (option == 'new'){
    var tenant = element(by.model('supplier.tenantRef'));
    tenant.sendKeys(dropdown_helper.selectDropdownbyNum(5));

    var tenant_group = element(by.model('supplier.supplierGroup'));
    tenant_group.sendKeys(dropdown_helper.selectDropdownbyNum(8));
  }

  var duns_no = element(by.model('supplier.dunsNo'));
  if (option == 'edit'){
    duns_no.clear();
  }
  duns_no.sendKeys(text_helper.getRandomString(5)+text_helper.getRandomNumber(2));

  var name = element(by.model('supplier.supplierName'));
  if (option == 'edit'){
    name.clear();
  }
  name.sendKeys(text_helper.getRandomString(text_helper.getRandomString(3))+'%');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[2].getText()).toContain('*invalid supplier name');
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

  var eac = element(by.model('supplier.abstractBusinessPartner.extAccountCode'));
  if (option == 'edit'){
    eac.clear();
  }
  eac.sendKeys(text_helper.getRandomString(5)+text_helper.getRandomNumber(3));

  var ename = element(by.model('supplier.abstractBusinessPartner.extName'));
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

  var esname = element(by.model('supplier.abstractBusinessPartner.extShortName'));
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

  var gid = element(by.model('supplier.abstractBusinessPartner.extGlobalId'));
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
    expect(items[10].getText()).toContain('*too short');
  });
  ptor.sleep(200);
  gid.clear();
  gid.sendKeys(text_helper.getRandomString(6)+text_helper.getRandomNumber(3)); 

  var language = element(by.model('supplier.abstractBusinessPartner.language'));
  language.sendKeys(dropdown_helper.selectDropdownbyNum(20));

  var currency = element(by.model('supplier.abstractBusinessPartner.currency'));
  if (option == 'edit'){
    currency.clear();
  }
  currency.sendKeys(text_helper.getRandomString(6));

  var top = element(by.model('supplier.termsOfPayment'));
  if (option == 'edit'){
    top.clear();
  }
  top.sendKeys(text_helper.getRandomString(5)+" "+text_helper.getRandomString(8));

  var tod = element(by.model('supplier.termsOfDelivery'));
  if (option == 'edit'){
    tod.clear();
  }
  tod.sendKeys(text_helper.getRandomString(5)+" "+text_helper.getRandomString(8));

  var mop = element(by.model('supplier.methodOfPayment'));
  if (option == 'edit'){
    mop.clear();
  }
  mop.sendKeys(text_helper.getRandomString(5));

  var tino = element(by.model('supplier.taxIdentificationNo'));
  if (option == 'edit'){
    tino.clear();
  }
  tino.sendKeys(text_helper.getRandomString(5)+" "+text_helper.getRandomString(8));

  var esid = element(by.model('supplier.extSupplierID'));
  if (option == 'edit'){
    esid.clear();
  }
  esid.sendKeys(text_helper.getRandomString(5)+" "+text_helper.getRandomString(8));

  var an = element(by.model('supplier.accountNumber'));
  if (option == 'edit'){
    an.clear();
  }
  an.sendKeys(text_helper.getRandomString(5)+" "+text_helper.getRandomString(8));

  var bic = element(by.model('supplier.bankIdentificationCode'));
  if (option == 'edit'){
    esid.clear();
  }
  bic.sendKeys(text_helper.getRandomString(5)+" "+text_helper.getRandomString(8));

  var sc = element(by.model('supplier.swiftCode'));
  if (option == 'edit'){
    sc.clear();
  }
  sc.sendKeys(text_helper.getRandomString(5)+" "+text_helper.getRandomString(8));

  var bck = element(by.model('supplier.bankCountryKey'));
  if (option == 'edit'){
    bck.clear();
  }
  bck.sendKeys('AD@123');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[11].getText()).toContain('*invalid bank country key');
  });
  ptor.sleep(200);
  bck.clear();
  bck.sendKeys(text_helper.getRandomNumber(6));

  var ebck = element(by.model('supplier.extBankControlKey'));
  if (option == 'edit'){
    ebck.clear();
  }
  ebck.sendKeys('ASDFGHJJ1234#');
  element.all(by.css('.form-group span')).then(function(items) {
    expect(items[12].getText()).toContain('*invalid external bank control key');
  });
  ptor.sleep(200);
  ebck.clear();
  ebck.sendKeys(text_helper.getRandomNumber(7));

};
