var Boom = require('boom'),
    CustomerGroup = require('../models/customerGroup').CustomerGroup; 
/** @module Controller for Customer Group */

/** get all customerGroup details */
exports.GetAll = function(request, reply) {
  CustomerGroup.find({}, function(err, customerGroup) {
        if (!err) {
            reply(customerGroup);
        } else {
            reply(Boom.badImplementation(err)); // 500 error
        }
    });
};
/** create new customer Group */
exports.Create = function(request, reply) {
    var customerGroup = new CustomerGroup(request.payload);
    customerGroup.save(function(err, response) {
        if (!err) {
            reply(response).created('/customerGroup/' + customerGroup._id); // HTTP 201
        } else {
            reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
        }
    });
};
/** get one customerGroup by id */
exports.GetCustomerGroup = function(request, reply) {
    CustomerGroup.findOne({
        '_id': request.params.id
    }, function(err, customer) {
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
/** Update Existing customerGroup */
exports.UpdateCustomerGroup = function(request, reply) {
   CustomerGroup.findById(request.params.id , function(err, customerGroup) {
         if (err) {
            // Log it, but don't show the user, don't want to expose ourselves (think security)
            reply(Boom.notFound());
        } else {
            customerGroup.groupName = request.payload.groupName;
            customerGroup.save(function(err, response) {
                if (!err) {
                    reply(response).created('/customerGroup/' + customerGroup._id); // HTTP 201
                } else {
                    reply(Boom.forbidden(getErrorMessageFrom(err))); // HTTP 403
                }
            });
        }
   });
};

/**delete one customerGroup by id */
exports.DeleteCustomerGroup = function(request, reply) {
    CustomerGroup.findOne({
        '_id': request.params.id
    }, function(err, customer) {
        if (!err && customer) {
            customer.remove();
            reply({
                message: "Customer Group deleted successfully"
            });
        } else if (!err) {
            // Couldn't find the object.
            reply(Boom.notFound());
        } else {
            console.log(err);
            reply(Boom.badRequest("Could not delete Customer Group"));
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