var Boom = require('boom'),
    json2csv = require('json2csv'), // HTTP Errors
    fs = require('fs'),
    Customer = require('../models/customer').Customer, // Mongoose ODM
    Setting = require('../config/settings').filePath,
    countries = require('country-list')(),
    languages = require ('languages');

/** @module Controller for Customer */

exports.getStaticData = function(request,reply) {
var All = [];
/** get All language code*/
var langscodes = languages.getAllLanguageCode();
var Languages = [];
/** get lang name corresponding code and push in array*/
var array = langscodes;
array.forEach(function(element, index, array){
  var langcode = langscodes[index];
  var langname = languages.getLanguageInfo(langcode).name;
  var object = {"code":langcode,"name":langname};
  Languages.push(object);
});
  var language = {languages:Languages};
  /** get all country name and code */
  var country = {countries: countries.getData()};
  All.push(language);
  All.push(country);
   reply(All);
}
/** get all customer details */
exports.GetAll = function(request, reply) {
  Customer
  .find({},{customerName:1, customerGroup:1})
  .populate('customerGroup')
  .exec(function(err, customers) {
        if (!err) {
            
            reply(customers);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
};

/** create new customer */
exports.Create = function(request, reply) {
    var customer = new Customer(request.payload);
    customer.save(function(err, data) {
        if (!err) {
            imagesave(data,reply);
            data.save(function(error,customers){
              if(!error){
                reply(data).created('/customers/' + data._id);
              }
              else{
                 reply(Boom.forbidden(getErrorMessageFrom(err)));
              }
            });
        } else {
            reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
        }
    });
};

/** Update Existing customer */
exports.UpdateCustomer = function(request, reply) {
  var id = request.params.id;
  var edit = request.payload;
  Customer.findById(id, function(err, customer) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            
            customerfunc(edit, customer);
            imagesave(customer, reply);
            customer.save(function(err, response) {
                if (!err) {
                    reply(response).created('/customers/' + customer._id); // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
   });
};

/** get one customer by id */
exports.GetCustomer = function(request, reply) {
    Customer
        .findOne({'_id': request.params.id})
        .populate('tenantRef')
        .populate('customerGroup')
        .exec(function(err, customer) {
          if (!err && customer) {
//             console.log(customer.abstractBusinessPartner.logo);
            if(customer.abstractBusinessPartner.logo !== undefined){
              var logo = customer.abstractBusinessPartner.logo;
              var imag_ext = logo.slice(logo.lastIndexOf('.')).slice(1);
              var re = 'data:image/'+imag_ext+';base64,';
              logo = __dirname + Setting.directory + Setting.customerFile + '/' + logo;
              fs.readFile(logo, function(err, show){
                if(err){
                customer.abstractBusinessPartner.logo = "image not found";
                reply(customer);
                }
                else{
                  var base64Image = new Buffer(show, 'binary').toString('base64');
                  base64Image = re + base64Image;
                  customer.abstractBusinessPartner.logo = base64Image;
                  reply(customer);
                  }
              });
            }
            else{
              reply(customer);
            }
          } else if (err) {
              // Log it, but don't show the user, don't want to expose ourselves (think security)
              reply(Boom.notFound());
          } else {
              reply(Boom.notFound());
          }
    });
};

/** get all customer by one tenant id **/
exports.GetCustomerByTenant = function(request, reply) {
    Customer
    .find({ 'tenantRef': request.params.tenantRef },{customerName:1, customerGroup:1})
    .populate('customerGroup')
    .exec(function(err, customer) {
          if (!err && customer) {
              reply(customer);
          } else if (err) {
              // Log it, but don't show the user, don't want to expose ourselves (think security)
              console.log(err);
              reply(Boom.notFound());
          } else {

              reply(Boom.notFound());
          }
    });
};

/** delete one customer by id */
exports.DeleteCustomer = function(request, reply) {
    Customer.findOne({
        '_id': request.params.id
    }, function(err, customer) {
        if (!err && customer) {
          if(customer.abstractBusinessPartner.logo !== undefined){
            var logo = customer.abstractBusinessPartner.logo;
            var imag_ext = logo.slice(logo.lastIndexOf('.')).slice(1);
            var re = 'data:image/'+imag_ext+';base64,';
            logo = __dirname + Setting.directory + Setting.customerFile + '/' + logo;
            fs.unlink(logo, function (err) {
                  if (err) throw err;
            });
           }
            customer.remove();
            reply({
                message: "Customer deleted successfully"
            });
        } else if (!err) {
            // Couldn't find the object.
            reply(Boom.notFound());
        } else {
            console.log(err);
            reply(Boom.badRequest("Could not delete Customer"));
        }
    });
};

/** get customer csv sheet */
exports.GetCustomerExcel = function(request, reply) {
    var json1 = [];
    var field1 = ['CustomerId','Name', 'Group', 'Profile', 'City', 'State', 'Country', 'Email']
    Customer
       .find({})
       .populate('tenantRef')
       .populate('customerGroup')
       .exec(function(err, customers) {
        if (err) throw err;
        else {
          var array = customers;
           array.forEach(function(element, index, array){
             var CustomerId = array[index].customerId === null ? ' ': array[index].customerId;
               var Name = array[index].customerName === null ? ' ':array[index].customerName;
               var Group = array[index].customerGroup === null ? ' ':array[index].customerGroup.groupName;
               var Profile = array[index].customerProfile === null ? ' ':array[index].customerProfile;
               var addresses = array[index].addresses === null ? '' : array[index].addresses;
               if(addresses.length !== 0){
                var array1 = array[index].addresses;
                 var city = [];
                 var state = [];
                 var country = [];
                 var email = [];
                 array1.forEach(function(element, index, array1){
                    city.push(array1[index].city);
                    state.push(array1[index].state);
                    country.push(array1[index].country);
                    email.push(array1[index].email);
                 });
                 city = city.toString();
                 state = state.toString();
                 country = country.toString();
                 email = email.toString();
               }
               else {
                var city = '';
                var state = '';
                var country = '';
                var email = '';
              }
               
              json1.push({
                "CustomerId": CustomerId,
                "Name": Name,
                "Group": Group,
                "Profile": Profile,
                "City": city,
                "State": state,
                "Country": country,
                "Email": email
              });
             });
            json2csv({
                data: json1,
                fields: field1
            }, function(err, csv) {
                if (err) console.log(err);
                return reply(csv).header('Content-Type', 'application/octet-stream').header('content-disposition', 'attachment; filename=customer.csv;');
            });
        }
    });
};

/** get customer result by search query */
exports.GetCustomerSearch = function(request, reply) {
       var obj = {};
       var array = request.payload;
       array.forEach(function(element, index, array){
             var key = array[index].key;
             var value = array[index].value;
             if(key !== 'customerId'){
              value = new RegExp(value, "i");
             }
             
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
       })
    
       Customer
       .find(obj,{customerId:1, customerName:1, customerGroup:1})
       .populate('customerGroup')
       .exec(function(err, docs) {
         if (err) throw err;
          //console.log(docs);
         return reply(docs).type('application/json');
       });
};

/** Helper function for update */
var customerfunc = function(request, customer){
    customer.customerName = request.customerName;
    customer.dunsNo = request.dunsNo;
    customer.information = request.information;
    customer.eutaxId = request.eutaxId;
    customer.isLocked = request.isLocked;
    customer.isCustomerGrpMaster = request.isCustomerGrpMaster;
    customer.withVAT = request.withVAT;
    customer.vatIdentNo = request.vatIdentNo;
    customer.debitLimit = request.debitLimit;
    customer.parentCustomer = request.parentCustomer;
    customer.tax = request.tax;
    customer.contractHistories = request.contractHistories;
    customer.catalogHistories = request.catalogHistories;
    customer.classificationUsages = request.classificationUsages;
    customer.headerText = request.headerText;
    customer.footerText = request.footerText;
    customer.customerProfile = request.customerProfile;
    customer.hierarchyCode = request.hierarchyCode;
    customer.invTolerancePercent = request.invTolerancePercent;
    customer.invToleranceAbs = request.invToleranceAbs;
    customer.abstractBusinessPartner = request.abstractBusinessPartner;
    customer.contacts = request.contacts;
    customer.addresses = request.addresses;
    return customer;
}

/** image upload function */
var imagesave = function(data,reply){
  var newPath1;
  var img_extnsn;
  var logo;
  var imageName = data._id;
  var newPath = __dirname + Setting.directory;
  var logoPath = newPath + Setting.customerFile;
  if(data.abstractBusinessPartner.logo !== undefined){
    logo = data.abstractBusinessPartner.logo;
    var re = /^data:image\/(\w+);base64,/;
    var res = logo.match(re);
    img_extnsn = '.' + res[1];
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
    data.abstractBusinessPartner.logo = imageName + img_extnsn;  
  }
  reply(data);
}

/**
 * Formats an error message that is returned from Mongoose.
 *
 * @param err The error object
 * @returns {string} The error message string.
 */
function getErrorMessageFrom(err) {
    var errorMessage = '';

    if (err.errors) {
        for (var prop in err.errors) {
            if (err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }

    } else {
        errorMessage = err.message;
    }

    return errorMessage;
}