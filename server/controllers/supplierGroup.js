var Boom = require('boom'), // HTTP Errors
    SupplierGroup = require('../models/supplierGroup').SupplierGroup; // Mongoose ODM

/** @module Controller for Supplier Group */

/** get  all supplier Group */
exports.GetAll = function(request, reply) {
    SupplierGroup.find({}, function(err, supplierGroup) {
        if (!err) {
            reply(supplierGroup);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
};

/** create one supplierGroup */
exports.Create = function(request, reply) {
    var supplierGroup = new SupplierGroup(request.payload);
    supplierGroup.save(function(err, response) {
        if (!err) {
            reply(response).created('/supplierGroup/' + supplierGroup._id); // HTTP 201
        } else {
            reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
        }
    });
};

/** get supplierGroup by id */
exports.GetSupplierGroup = function(request, reply) {
    SupplierGroup.findOne({
        '_id': request.params.id
    }, function(err, supplier) {
        if (!err && supplier) {
            reply(supplier);
        } else if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            console.log(err);
            reply(Boom.notFound());
        } else {

            reply(Boom.notFound());
        }
    });
};

/** Update Existing customerGroup */
exports.UpdateSupplierGroup = function(request, reply) {
   SupplierGroup.findById(request.params.id , function(err, supplierGroup) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            supplierGroup.groupName = request.payload.groupName;
            supplierGroup.save(function(err, response) {
                if (!err) {
                    reply(response).created('/supplierGroup/' + supplierGroup._id); // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
   });
};

/** delete supplierGroup by id */
exports.DeleteSupplierGroup = function(request, reply) {
    SupplierGroup.findOne({
        '_id': request.params.id
    }, function(err, supplier) {
        if (!err && supplier) {
            supplier.remove();
            reply({
                message: "SupplierGroup deleted successfully"
            });
        } else if (!err) {
            // Couldn't find the object.
            reply(Boom.notFound());
        } else {
            console.log(err);
            reply(Boom.badRequest("Could not delete SupplierGroup"));
        }
    });
};

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