module.exports = {
  Tenant:{
      createTenant: {
        name   	    : "tenant 5",
        status      : "active",
        description : "tenant 5 created",
        validFrom   : "21-12-2009",
        validTo     : "21-12-2009"
      },
      editTenant: {
        name   	    : "tenant 1",
        status      : "active",
        description : "this is updated tenant",
        validFrom   : "21-12-2009",
        validTo     : "21-12-2009"
      },
      tenantId: '542bfe816740fd230e01b935',
      deleteTenant: '54352b088690a1fc06e38971',
      /**helper function*/
      tenantfunc : function(request, tenant){
        if(request.name)
          tenant.name = request.name;
        if(request.status)
          tenant.status = request.status;
        if(request.description)
          tenant.description = request.description;
        if(request.validFrom)
          tenant.validFrom = request.validFrom;
        if(request.validTo)
          tenant.validTo = request.validTo;
        return tenant;
      }
  },
  CustomerGroup:{
      createCustomerGroup: {
         groupName   	    : "group by test case"
      },
      editCustomerGroup: {
         groupName   	    : "updated group by test case"
      },
      customerGroupId: '54211d851a21407803e87ba3',
      deleteCustomerGroup: '54353bf593a8c1c2075575f9'
  },
   SupplierGroup:{
      createSupplierGroup: {
         groupName   	    : "group by test case"
      },
      editSupplierGroup: {
         groupName   	    : "updated group by test case"
      },
      supplierGroupId: '54211e3c1a21407803e87ba6',
      deleteSupplierGroup: '54353edb93a8c1c2075575fa'
  },
  Customer:{
    customerId: '543fccc2e9b10d3f07bf9e2e',
    deleteCustomer: '5433885c7af701f102176665',
    byTenant: { 'tenantRef': '543fcb98e9b10d3f07bf9e25'},
    bySearch: function(obj){
      
      var array = [{
        "key": "customerName",
        "value": "sonu"
      },
      {
        "key": "customerProfile",
        "value": "customer"
      }];
      array.forEach(function(element, index, array){
             var key = array[index].key;
             var value = array[index].value;
             value = new RegExp(value, "i");
             switch(key){
               case "country":
                 key = "addresses.country";
                 break;
               case "state":
                 key = "addresses.state";
                 break;
               case "city":
                 key = "addresses.city";
                 break;
             }
             obj[key] = value;
       });
    },
    createCustomer: {
      tenantRef: "543fcb98e9b10d3f07bf9e25",
      customerGroup: "543fcc17e9b10d3f07bf9e2b",
      dunsNo: "1223",
      information: "information",
      eutaxId: "id123",
      isLocked: "Yes",
      isCustomerGrpMaster: "No",
      withVAT: "Yes",
      vatIdentNo: "no121",
      debitLimit: 3000,
      parentCustomer: "parent",
      customerName: "soni pandey",
      tax: "dfs2423",
      contractUsages: [ "a", "bbb" ],
      catalogUsages: [ "a", "bbb" ],
      contractHistories: [ "a", "bbb" ],
      catalogHistories: [ "a", "bbb" ],
      classificationUsages: [ "a", "bbb" ],
      headerText: "header",
      footerText: "footer",
      customerProfile: "customer",
      hierarchyCode: "d12",
      invTolerancePercent: 12,
      invToleranceAbs: 12,
      abstractBusinessPartner: {
        extAccountCode: "accountcode",
        extName: "extname",
        extShortName: "extshortname",
        extGlobalId: "extglobalid",
        language: "english",
        currency: "dolllar"
      },
      contacts: [{
          contactType: "contactTyp",
          firstName: "sonu",
          lastName: "pandey",
          email: "sonipandey@gmail.com",
          phone: "928438979",
          alternatePhone: "928438979",
          mobile: "928438979",
          url: "url",
          description: "description",
          department: "department"
        },
        {
          contactType: "contactTyp",
          firstName: "sonu",
          lastName: "pandey",
          email: "sonipandey@gmail.com",
          phone: "928438979",
          alternatePhone: "928438979",
          mobile: "928438979",
          url: "url",
          description: "description",
          department: "department"
        }],
      addresses:[{
          addressType: "default",
          salutation: "Ms.",
          name1: "Sonu",
          name2: "Pandey",
          street: "Silicon",
          zipCode: "40050",
          city: "Hyderabad",
          poboxZipCode: "312001",
          pobox: "40732",
          isCompany: "Yes",
          areaCode: "453672",
          phoneNo: "+911126463511",
          faxNo: "+911126463511",
          email: "sonipandey@gmail.com",
          corporateURL: "url",
          numOfEmployees: "3",
          country: "India",
          state: "state"
        },
        {
          addressType: "default",
          salutation: "Ms.",
          name1: "Sonu",
          name2: "Pandey",
          street: "Silicon",
          zipCode: "40050",
          city: "Hyderabad",
          poboxZipCode: "312001",
          pobox: "40732",
          isCompany: "No",
          areaCode: "453672",
          phoneNo: "+911126463511",
          faxNo: "+911126463511",
          email: "sonipandey@gmail.com",
          corporateURL: "url",
          numOfEmployees: "3",
          country: "India",
          state: "state"
        }]
    },
    /** Helper function for update */
    customerfunc: function(request, customer){
      if(request.tenantRef)
        customer.tenantRef = request.tenantRef;
      if(request.customerGroup)
        customer.customerGroup = request.customerGroup;
      if(request.customerName)
        customer.customerName = request.customerName;
      if(request.dunsNo)
        customer.dunsNo = request.dunsNo;
      if(request.information)
        customer.information = request.information;
      if(request.eutaxId)
        customer.eutaxId = request.eutaxId;
      if(request.isLocked)
        customer.isLocked = request.isLocked;
      if(request.isCustomerGrpMaster)
        customer.isCustomerGrpMaster = request.isCustomerGrpMaster;
      if(request.withVAT)
        customer.withVAT = request.withVAT;
      if(request.vatIdentNo)
        customer.vatIdentNo = request.vatIdentNo;
      if(request.debitLimit)
        customer.debitLimit = request.debitLimit;
      if(request.parentCustomer)
        customer.parentCustomer = request.parentCustomer;
      if(request.tax)
        customer.tax = request.tax;
      if(request.contractHistories)
        customer.contractHistories = request.contractHistories;
      if(request.catalogHistories)
        customer.catalogHistories = request.catalogHistories;
      if(request.classificationUsages)
        customer.classificationUsages = request.classificationUsages;
      if(request.headerText)
        customer.headerText = request.headerText;
      if(request.footerText)
        customer.footerText = request.footerText;
      if(request.customerProfile)
        customer.customerProfile = request.customerProfile;
      if(request.hierarchyCode)
        customer.hierarchyCode = request.hierarchyCode;
      if(request.invTolerancePercent)
        customer.invTolerancePercent = request.invTolerancePercent;
      if(request.invToleranceAbs)
        customer.invToleranceAbs = request.invToleranceAbs;
      if(request.abstractBusinessPartner){
        if(request.abstractBusinessPartner.logo){
          //console.log(request.abstractBusinessPartner);
          var logo = request.abstractBusinessPartner.logo;
          var imageName;
          if(request.customerName){
            imageName = request.customerName;
          }
          else{
            imageName = customer.customerName;
          }
          var newPath = __dirname + Setting.directory;
          var logoPath = newPath + Setting.customerFile;
          var re = /^data:image\/(\w+);base64,/;
          var res = logo.match(re);
          var img_extnsn = '.' + res[1];
          fs.exists(newPath, function (exists) {
            if(exists === false){
              fs.mkdirSync(newPath);
              }
            fs.exists(logoPath, function (logoexists){
              if(logoexists === false){
                fs.mkdirSync(logoPath);
              }
              newPath1 = logoPath + "/"+imageName + img_extnsn;
              logo = logo.replace(re,'');
              fs.writeFile(newPath1, logo,'base64', function(err) {});
            });
          });
          customer.abstractBusinessPartner.logo = imageName + img_extnsn;
        }
         if(request.abstractBusinessPartner.extAccountCode)
            customer.abstractBusinessPartner.extAccountCode = request.abstractBusinessPartner.extAccountCode;
        if(request.abstractBusinessPartner.extName)
            customer.abstractBusinessPartner.extName = request.abstractBusinessPartner.extName;
         if(request.abstractBusinessPartner.extShortName)
            customer.abstractBusinessPartner.extShortName = request.abstractBusinessPartner.extShortName;
         if(request.abstractBusinessPartner.extGlobalId)
            customer.abstractBusinessPartner.extGlobalId = request.abstractBusinessPartner.extGlobalId;
         if(request.abstractBusinessPartner.language)
            customer.abstractBusinessPartner.language = request.abstractBusinessPartner.language;
         if(request.abstractBusinessPartner.currency)
            customer.abstractBusinessPartner.currency = request.abstractBusinessPartner.currency;
      }
      if(request.contacts)
        customer.contacts = request.contacts;
      if(request.addresses)
        customer.addresses = request.addresses;
      return customer;
    },
    editCustomer: {
      tenantRef: "542bfe3d6740fd230e01b933",
      customerGroup: "54211d711a21407803e87ba1",
      dunsNo: "1223",
      information: "information",
      eutaxId: "id123",
      isLocked: "Yes",
      isCustomerGrpMaster: "No",
      withVAT: "Yes",
      vatIdentNo: "no121",
      debitLimit: 3000,
      parentCustomer: "parent",
      customerName: "Updated soni pandey",
      tax: "dfs2423",
      contractUsages: [ "a", "bbb" ],
      catalogUsages: [ "a", "bbb" ],
      contractHistories: [ "a", "bbb" ],
      catalogHistories: [ "a", "bbb" ],
      classificationUsages: [ "a", "bbb" ],
      headerText: "header",
      footerText: "footer",
      customerProfile: "customer",
      hierarchyCode: "d12",
      invTolerancePercent: 12,
      invToleranceAbs: 12,
      abstractBusinessPartner: {
        extAccountCode: "accountcode",
        extName: "extname",
        extShortName: "extshortname",
        extGlobalId: "extglobalid",
        language: "english",
        currency: "dolllar"
      },
      contacts: [{
          contactType: "contactTyp",
          firstName: "sonu",
          lastName: "pandey",
          email: "sonipandey@gmail.com",
          phone: "928438979",
          alternatePhone: "928438979",
          mobile: "928438979",
          url: "url",
          description: "description",
          department: "department"
        },
        {
          contactId: "id1234",
          contactType: "contactTyp",
          firstName: "sonu",
          lastName: "pandey",
          email: "sonipandey@gmail.com",
          phone: "928438979",
          alternatePhone: "928438979",
          mobile: "928438979",
          url: "url",
          description: "description",
          department: "department"
        }],
      addresses:[{
          addressType: "default",
          salutation: "Ms.",
          name1: "Sonu",
          name2: "Pandey",
          street: "Silicon",
          zipCode: "40050",
          city: "Hyderabad",
          poboxZipCode: "312001",
          pobox: "40732",
          isCompany: "Yes",
          areaCode: "453672",
          phoneNo: "+911126463511",
          faxNo: "+911126463511",
          email: "sonipandey@gmail.com",
          corporateURL: "url",
          numOfEmployees: "3",
          country: "India",
          state: "state"
        },
        {
          addressType: "default",
          salutation: "Ms.",
          name1: "Sonu",
          name2: "Pandey",
          street: "Silicon",
          zipCode: "40050",
          city: "Hyderabad",
          poboxZipCode: "312001",
          pobox: "40732",
          isCompany: "No",
          areaCode: "453672",
          phoneNo: "+911126463511",
          faxNo: "+911126463511",
          email: "sonipandey@gmail.com",
          corporateURL: "url",
          numOfEmployees: "3",
          country: "India",
          state: "state"
        }]
    }
  },
  Supplier:{
    supplierId: '542c1b815585b170117ec8f1',
    deleteSupplier: '542c1b755585b170117ec8ec',
    byTenant: { 'tenantRef': '543fcba3e9b10d3f07bf9e26'},
    bySearch: function(obj){
      var array = [{
        "key": "supplierName",
        "value": "supplier1"
      },
      {
        "key": "city",
        "value": "Hyderabad"
      }];
      array.forEach(function(element, index, array){
             var key = array[index].key;
             var value = array[index].value;
             value = new RegExp(value, "i");
             switch(key){
               case "country":
                 key = "addresses.country";
                 break;
               case "state":
                 key = "addresses.state";
                 break;
               case "city":
                 key = "addresses.city";
                 break;
             }
             obj[key] = value;
       });
    },
    createSupplier:{
          "accountNumber": "52362623635327",
          "bankCountryKey": "36273",
          "bankIdentificationCode": "fde223",
          "dunsNo": "no12",
          "extBankControlKey": "234378",
          "extSupplierID": "gds563",
          "methodOfPayment": "online",
          "supplierGroup": "543fcbfae9b10d3f07bf9e28",
          "supplierName": "supplier generate by test case",
          "swiftCode": "a233",
          "taxIdentificationNo": "Afds5632",
          "tenantRef": "543fcba3e9b10d3f07bf9e26",
          "termsOfDelivery": "delivery terms",
          "termsOfPayment": "invoice",
          "addresses": [{
                  "addressType": "default",
                  "salutation": "Ms.",
                  "name1": "Sonu",
                  "name2": "Pandey",
                  "street": "Silicon",
                  "zipCode": "40050",
                  "city": "Hyderabad",
                  "poboxZipCode": "312001",
                  "pobox": "40732",
                  "phoneNo": "+911126463511",
                  "faxNo": "+911126463511",
                  "email": "sonipandey@gmail.com",
                  "corporateURL": "url",
                  "numOfEmployees": 3,
                  "country": "India",
                  "state": "state",
                  "_id": "542c1b755585b170117ec8ee",
                  "isCompany": "true"
              },
              {
                  "addressType": "default",
                  "salutation": "Ms.",
                  "name1": "Sonu",
                  "name2": "Pandey",
                  "street": "Silicon",
                  "zipCode": "40050",
                  "city": "Hyderabad",
                  "poboxZipCode": "312001",
                  "pobox": "40732",
                  "phoneNo": "+911126463511",
                  "faxNo": "+911126463511",
                  "email": "sonipandey@gmail.com",
                  "corporateURL": "url",
                  "numOfEmployees": 3,
                  "country": "India",
                  "state": "state",
                  "_id": "542c1b755585b170117ec8ed",
                  "isCompany": "true"
              }],
          "contacts": [{
                  "contactType": "contactTyp",
                  "firstName": "sonu",
                  "lastName": "pandey",
                  "email": "sonipandey@gmail.com",
                  "phone": "928438979",
                  "alternatePhone": "928438979",
                  "mobile": "928438979",
                  "url": "url",
                  "description": "description",
                  "department": "department",
                  "_id": "542c1b755585b170117ec8f0"
              },
              {
                  "contactType": "contactTyp",
                  "firstName": "sonu",
                  "lastName": "pandey",
                  "email": "sonipandey@gmail.com",
                  "phone": "928438979",
                  "alternatePhone": "928438979",
                  "mobile": "928438979",
                  "url": "url",
                  "description": "description",
                  "department": "department",
                  "_id": "542c1b755585b170117ec8ef"
           }],
          "abstractBusinessPartner": {
              "extAccountCode": "accountcode",
              "extName": "extname",
              "extShortName": "extshortname",
              "extGlobalId": "extglobalid",
              "language": "english",
              "currency": "dolllar"
          }
      },
    editSupplier:{
          "accountNumber": "52362623635327",
          "bankCountryKey": "36273",
          "bankIdentificationCode": "fde223",
          "dunsNo": "no12",
          "extBankControlKey": "234378",
          "extSupplierID": "gds563",
          "methodOfPayment": "online",
          "supplierGroup": "54211e2e1a21407803e87ba4",
          "supplierName": "Updated supplier by test",
          "swiftCode": "a233",
          "taxIdentificationNo": "Afds5632",
          "tenantRef": "542bfe816740fd230e01b935",
          "termsOfDelivery": "delivery terms",
          "termsOfPayment": "invoice",
          "addresses": [{
                  "addressType": "default",
                  "salutation": "Ms.",
                  "name1": "Sonu",
                  "name2": "Pandey",
                  "street": "Silicon",
                  "zipCode": "40050",
                  "city": "Hyderabad",
                  "poboxZipCode": "312001",
                  "pobox": "40732",
                  "phoneNo": "+911126463511",
                  "faxNo": "+911126463511",
                  "email": "sonipandey@gmail.com",
                  "corporateURL": "url",
                  "numOfEmployees": 3,
                  "country": "India",
                  "state": "state",
                  "_id": "542c1b755585b170117ec8ee",
                  "isCompany": "true"
              },
              {
                  "addressType": "default",
                  "salutation": "Ms.",
                  "name1": "Sonu",
                  "name2": "Pandey",
                  "street": "Silicon",
                  "zipCode": "40050",
                  "city": "Hyderabad",
                  "poboxZipCode": "312001",
                  "pobox": "40732",
                  "phoneNo": "+911126463511",
                  "faxNo": "+911126463511",
                  "email": "sonipandey@gmail.com",
                  "corporateURL": "url",
                  "numOfEmployees": 3,
                  "country": "India",
                  "state": "state",
                  "_id": "542c1b755585b170117ec8ed",
                  "isCompany": "true"
              }],
          "contacts": [{
                  "contactType": "contactTyp",
                  "firstName": "sonu",
                  "lastName": "pandey",
                  "email": "sonipandey@gmail.com",
                  "phone": "928438979",
                  "alternatePhone": "928438979",
                  "mobile": "928438979",
                  "url": "url",
                  "description": "description",
                  "department": "department",
                  "_id": "542c1b755585b170117ec8f0"
              },
              {
                  "contactType": "contactTyp",
                  "firstName": "sonu",
                  "lastName": "pandey",
                  "email": "sonipandey@gmail.com",
                  "phone": "928438979",
                  "alternatePhone": "928438979",
                  "mobile": "928438979",
                  "url": "url",
                  "description": "description",
                  "department": "department",
                  "_id": "542c1b755585b170117ec8ef"
           }],
          "abstractBusinessPartner": {
              "extAccountCode": "accountcode",
              "extName": "extname",
              "extShortName": "extshortname",
              "extGlobalId": "extglobalid",
              "language": "english",
              "currency": "dolllar"
          }
      },
    supplierfunc:function(request, supplier){
           if(request.tenantRef)
            supplier.tenantRef = request.tenantRef;
          if(request.supplierGroup)
            supplier.supplierGroup = request.supplierGroup;
          if(request.supplierName)
            supplier.supplierName = request.supplierName;
          if(request.dunsNo)
            supplier.dunsNo = request.dunsNo;
          if(request.contractProvisionings)
            supplier.contractProvisionings = request.contractProvisionings;
          if(request.catalogProvisionings)
            supplier.catalogProvisionings = request.catalogProvisionings;
          if(request.supplier2ClassificationGroups)
            supplier.supplier2ClassificationGroups = request.supplier2ClassificationGroups;
          if(request.status)
            supplier.status = request.status;
          if(request.termsOfPayment)
            supplier.termsOfPayment = request.termsOfPayment;
          if(request.termsOfDelivery)
            supplier.termsOfDelivery = request.termsOfDelivery;
          if(request.methodOfPayment)
            supplier.methodOfPayment = request.methodOfPayment;
          if(request.taxIdentificationNo)
            supplier.taxIdentificationNo = request.taxIdentificationNo;
          if(request.extSupplierID)
            supplier.extSupplierID = request.extSupplierID;
          if(request.accountNumber)
            supplier.accountNumber = request.accountNumber;
          if(request.bankIdentificationCode)
            supplier.bankIdentificationCode = request.bankIdentificationCode;
          if(request.swiftCode)
            supplier.swiftCode = request.swiftCode;
          if(request.bankCountryKey)
            supplier.bankCountryKey = request.bankCountryKey;
          if(request.extBankControlKey)
            supplier.extBankControlKey = request.extBankControlKey;
          if(request.supplierProfile)
            supplier.supplierProfile = request.supplierProfile;
          if(request.catalogQualities)
            supplier.catalogQualities = request.catalogQualities;
          if(request.contactAssociations)
            supplier.contactAssociations = request.contactAssociations;
          if(request.attributeValues)
            supplier.attributeValues = request.attributeValues;
          if(request.abstractBusinessPartner){
              if(request.abstractBusinessPartner.logo){
              var logo = request.abstractBusinessPartner.logo;
              var imageName;
              if(request.supplierName){
                imageName = request.supplierName;
              }
              else{
                imageName = supplier.supplierName;
              }

              var newPath = __dirname + Setting.directory;
              var logoPath = newPath + Setting.supplierFile;
              var re = /^data:image\/(\w+);base64,/;
              var res = logo.match(re);
              var img_extnsn = '.' + res[1];

              fs.exists(newPath, function (exists) {
                if(exists === false){
                  fs.mkdirSync(newPath);
                  }
                fs.exists(logoPath, function (logoexists){
                  if(logoexists === false){
                    fs.mkdirSync(logoPath);
                  }
                  newPath1 = logoPath + "/"+imageName + img_extnsn;
                  logo = logo.replace(re,'');
                  fs.writeFile(newPath1, logo,'base64', function(err) {});
                });
              });
              supplier.abstractBusinessPartner.logo = imageName + img_extnsn;
            }
             if(request.abstractBusinessPartner.extAccountCode)
                supplier.abstractBusinessPartner.extAccountCode = request.abstractBusinessPartner.extAccountCode;
            if(request.abstractBusinessPartner.extName)
                supplier.abstractBusinessPartner.extName = request.abstractBusinessPartner.extName;
             if(request.abstractBusinessPartner.extShortName)
                supplier.abstractBusinessPartner.extShortName = request.abstractBusinessPartner.extShortName;
             if(request.abstractBusinessPartner.extGlobalId)
                supplier.abstractBusinessPartner.extGlobalId = request.abstractBusinessPartner.extGlobalId;
             if(request.abstractBusinessPartner.language)
                supplier.abstractBusinessPartner.language = request.abstractBusinessPartner.language;
             if(request.abstractBusinessPartner.currency)
                supplier.abstractBusinessPartner.currency = request.abstractBusinessPartner.currency;
          }
          if(request.contacts)
            supplier.contacts = request.contacts;
          if(request.addresses)
            supplier.addresses = request.addresses;

          return supplier;
        }
  }
};