/**
 * Dependencies.
 */
var CustomerGroupController = require('../../controllers/customerGroup');


module.exports = exports = function(server) {
    console.log('Loading CustomerGroup routes');
    exports.indexes(server);
    exports.create(server);
    exports.update(server);
    exports.show(server);
    exports.remove(server);
};

/**
 * GET /events
 * Gets all the Customer Group from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/customerGroup',
        config: {
            handler: CustomerGroupController.GetAll
        }
    });
};

/**
 * POST /new
 * Creates a new Customer Group in the datastore.
 *
 * @param server - The Hapi Serve
 */
exports.create = function(server) {
    // POST

    server.route({
        method: 'POST',
        path: '/customerGroup',
        config: {
            handler: CustomerGroupController.Create
        }

    });
};


/**
 * GET /customerGroup/{id}
 * Gets the CustomerGroup based upon the {id} parameter.
 *
 * @param server
 */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/customerGroup/{id}',
        config: {
            handler: CustomerGroupController.GetCustomerGroup
        }
    })
};
/**
 * Update /customerGroup/{id}
 * Update an CustomerGroup, based on the  id in the path.
 *
 * @param server - The Hapi Server
 */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/customerGroup/{id}',
        config: {
            handler: CustomerGroupController.UpdateCustomerGroup
        }
    })
};
/**
 * DELETE /customerGroup/{id}
 * Deletes an CustomerGroup, based on the id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/customerGroup/{id}',
        config: {
            handler: CustomerGroupController.DeleteCustomerGroup
        }
    })
};

