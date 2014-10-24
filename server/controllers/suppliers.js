var Boom = require('boom'), // HTTP Errors
    json2csv = require('json2csv'),
    fs = require('fs'),
    Supplier = require('../models/supplier').Supplier, // Mongoose ODM
    Setting = require('../config/settings').filePath;

/** @module Controller for Supplier */
/** get  all supplier */
exports.GetAll = function(request, reply) {
    Supplier
    .find({},{supplierName:1, supplierGroup:1})
    .populate('supplierGroup')
    .exec(function(err, suppliers) {
        if (!err) {
            reply(suppliers);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
};
/** create one supplier */
exports.Create = function(request, reply) {
    var supplier = new Supplier(request.payload);
    supplier.save(function(err, data) {
        if (!err) {
            imagesave(data,reply);
            data.save(function(error,suppliers){
              if(!error){
                reply(data).created('/suppliers/' + data._id);
              }
              else{
                 reply(Boom.forbidden(getErrorMessageFrom(err)));
              }
            });
           // reply(response).created('/supplier/' + supplier._id); // HTTP 201
        } else {
            reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
        }
    });
};

/** Update Existing supplier */
exports.UpdateSupplier = function(request, reply) {
  var id = request.params.id;
  var edit = request.payload;
  //console.log(edit);
   Supplier.findById(id, function(err, supplier) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            supplierfunc(edit, supplier);
            imagesave(supplier, reply)
            supplier.save(function(err, response) {
                if (!err) {
                    reply(response).created('/suppliers/' + supplier._id); // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
   });
};

/** get supplier by id */
exports.GetSupplier = function(request, reply) {
    Supplier
        .findOne({'_id': request.params.id})
        .populate('tenantRef')
        .populate('supplierGroup')
        .exec( function(err, supplier) {
        if (!err && supplier) {
          if(supplier.abstractBusinessPartner.logo !== undefined){
            var logo = supplier.abstractBusinessPartner.logo;
            var imag_ext = logo.slice(logo.lastIndexOf('.')).slice(1);
            var re = 'data:image/'+imag_ext+';base64,';
            logo = __dirname + Setting.directory + Setting.supplierFile + '/' + logo;
            fs.readFile(logo, function(err, show){
              if(err){
                supplier.abstractBusinessPartner.logo = "image not found";
                reply(supplier);
              }
              else{
                var base64Image = new Buffer(show, 'binary').toString('base64');
                base64Image = re + base64Image;
                supplier.abstractBusinessPartner.logo = base64Image;
                reply(supplier);
                }
            });
          }
           else{
              reply(supplier);
            }
        } else if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            reply(Boom.notFound());
        }
    });
};

/** get supplier by tenant */
exports.GetSupplierByTenant = function(request, reply){
    Supplier
    .find({'tenantRef': request.params.tenantRef },{supplierName:1, supplierGroup:1})
    .populate('supplierGroup')
    .exec(function(err, supplier) {
          if (!err && supplier) {
              reply(supplier);
          } else if (err) {
              // Log it, but don't show the user, don't want to expose ourselves (think security)
              //console.log(err);
              reply(Boom.notFound());
          } else {
              reply(Boom.notFound());
          }
    });
};

/** delete supplier by id */
exports.DeleteSupplier = function(request, reply) {
    Supplier.findOne({
        '_id': request.params.id
    }, function(err, supplier) {
        if (!err && supplier) {
           if(supplier.abstractBusinessPartner.logo !== undefined){
            var logo = supplier.abstractBusinessPartner.logo;
            var imag_ext = logo.slice(logo.lastIndexOf('.')).slice(1);
            var re = 'data:image/'+imag_ext+';base64,';
            logo = __dirname + Setting.directory + Setting.supplierFile + '/' + logo;
            fs.unlink(logo, function (err) {
                  if (err) throw err;
            });
           }
            supplier.remove();
            reply({
                message: "Supplier deleted successfully"
            });
        } else if (!err) {
            // Couldn't find the object.
            reply(Boom.notFound());
        } else {
            console.log(err);
            reply(Boom.badRequest("Could not delete Supplier"));
        }
    });
};

/** get supplier csv sheet */
exports.GetSupplierExcel = function(request, reply) {
    var json1 = [];
    var field1 = ['SupplierId','Name', 'Group']
    Supplier
    .find({})
    .populate('_tenantRef')
    .populate('supplierGroup')
    .exec(function(err, suppliers) {
        if (err) throw err;
        else {
           var array = suppliers;
           array.forEach(function(element,index, array){
              var SupplierId = array[index].supplierId === null ? ' ': array[index].supplierId;
               var Name = array[index].supplierName === null ? ' ':array[index].supplierName;
               var Group = array[index].supplierGroup === null ? ' ':array[index].supplierGroup.groupName;        
                json1.push({
                    "SupplierId": SupplierId,
                    "Name": Name,
                    "Group": Group  
                });
            });
            json2csv({
                data: json1,
                fields: field1
            }, function(err, csv) {
                if (err) console.log(err);
                return reply(csv).header('Content-Type', 'application/octet-stream').header('content-disposition', 'attachment; filename=supplier.csv;');
            });
        }
    });
};

/** get supplier result by search query */
exports.GetSupplierSearch = function(request, reply) {
      var obj = {};
       var array = request.payload;
       array.forEach(function(element, index, array){
             var key = array[index].key;
             var value = array[index].value;
             value = new RegExp(value, "i");
             //console.log(value);
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

       Supplier
       .find(obj,{supplierName:1, supplierGroup:1})
       .populate('supplierGroup')
       .exec(function(err, docs) {
         if (err) throw err;
         // console.log(docs);
         return reply(docs).type('application/json');
       });
};

/** Helper function for update */
var supplierfunc = function(request, supplier){
    supplier.tenantRef = request.tenantRef;
    supplier.supplierGroup = request.supplierGroup._id;
    supplier.supplierName = request.supplierName;
    supplier.dunsNo = request.dunsNo;
    supplier.status = request.status;
    supplier.termsOfPayment = request.termsOfPayment;
    supplier.termsOfDelivery = request.termsOfDelivery;
    supplier.methodOfPayment = request.methodOfPayment;
    supplier.taxIdentificationNo = request.taxIdentificationNo;
    supplier.extSupplierID = request.extSupplierID;
    supplier.accountNumber = request.accountNumber;
    supplier.bankIdentificationCode = request.bankIdentificationCode;
    supplier.swiftCode = request.swiftCode;
    supplier.bankCountryKey = request.bankCountryKey;
    supplier.extBankControlKey = request.extBankControlKey;
    supplier.abstractBusinessPartner = request.abstractBusinessPartner;
    supplier.contacts = request.contacts;
    supplier.addresses = request.addresses;
  
    return supplier;
}
/** image upload function */
var imagesave = function(data,reply){
  var newPath1;
  var img_extnsn;
  var logo;
  var imageName = data._id;;
  var newPath = __dirname + Setting.directory;
  var logoPath = newPath + Setting.supplierFile;
if(data.abstractBusinessPartner.logo !== undefined){
    logo = data.abstractBusinessPartner.logo;
    var re = /^data:image\/(\w+);base64,/;
    var res = logo.match(re);
   // console.log(res[1]);    //will contain the first subgroup. the extension of file
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
    data.abstractBusinessPartner.logo = imageName +img_extnsn;
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