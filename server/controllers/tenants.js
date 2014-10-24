var Boom    = require('boom'),                                 // HTTP Errors
    Tenant   = require('../models/tenant').Tenant; // Mongoose ODM

/** @module Controller for Tenant */

/** get all tenants */
exports.GetAll = function (request, reply) {
          Tenant.find({}, function (err, tenants) {
                if (!err) {
                    reply(tenants);
                } else {
                    reply(Boom.badImplementation(err)); // 500 error
                }
            });
        };

/** create new tenant */
exports.Create = function (request, reply) {
          var tenant = new Tenant(request.payload);
          tenant.save(function (err,response) {
                if (!err) {
                    reply(response).created('/tenants/' + tenant._id);    // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
          });
        };

/** get one tenant */
exports.GetTenant = function (request, reply) {
          Tenant.findOne({'_id':request.params.id}, function (err, tenant) {
                if (!err && tenant) {
                    reply(tenant);
                } else if (err) {
                    // Log it, but don't show the user, don't want to expose ourselves (think security)
                    console.log(err);
                    reply(Boom.notFound());
                } else {

                    reply(Boom.notFound());
                }
            });
        };

/** Update Existing tenant */
exports.UpdateTenant = function(request, reply) {
  var id = request.params.id;
  var edit = request.payload;
   Tenant.findById(id, function(err, tenant) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            tenantfunc(edit, tenant);
            tenant.save(function(err, response) {
                if (!err) {
                    reply(response).created('/tenants/' + tenant._id); // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
   });
};

/** delete one tenant */
exports.DeleteTenant = function (request, reply) {
            Tenant.findOne({'_id':request.params.id}, function(err, tenant) {
                if(!err && tenant) {
                    tenant.remove();
                    reply({ message: "Tenant deleted successfully"});
                } else if(!err) {
                    // Couldn't find the object.
                    reply(Boom.notFound());
                } else {
                    console.log(err);
                    reply(Boom.badRequest("Could not delete Tenant"));
                }
            });
        };
/**helper function*/
var tenantfunc = function(request, tenant){
    tenant.name = request.name;
    tenant.status = request.status;
    tenant.description = request.description;
    tenant.validFrom = request.validFrom;
    tenant.validTo = request.validTo;
    return tenant;
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
            if(err.errors.hasOwnProperty(prop)) {
                errorMessage += err.errors[prop].message + ' '
            }
        }

    } else {
        errorMessage = err.message;
    }

    return errorMessage;
}
