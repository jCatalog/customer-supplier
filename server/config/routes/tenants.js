/**
 * Dependencies.
 */
var TenantsController = require('../../controllers/tenants');

module.exports = exports = function(server) {
    console.log('Loading Tenants routes');
    exports.indexes(server);
    exports.create(server);
    exports.update(server);
    exports.show(server);
    exports.remove(server);
};

/**
 * GET /events
 * Gets all the Tenants from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/tenants',
        config: {
            handler: TenantsController.GetAll
        }
    });
};

/**
 * POST /new
 * Creates a new Tenants in the datastore.
 *
 * @param server - The Hapi Serve
 */
exports.create = function(server) {
    // POST

    server.route({
        method: 'POST',
        path: '/tenants',
        config: {
            handler: TenantsController.Create
        }

    });
};


/**
 * GET /tenants/{id}
 * Gets the Tenants based upon the {id} parameter.
 *
 * @param server
 */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/tenants/{id}',
        config: {
            handler: TenantsController.GetTenant
        }
    })
};
/**
 * Update /tenants/{id}
 * Update an Tenant, based on the  id in the path.
 *
 * @param server - The Hapi Server
 */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/tenants/{id}',
        config: {
            handler: TenantsController.UpdateTenant
        }
    })
};
/**
 * DELETE /tenants/{id}
 * Deletes an Tenants, based on the tenants id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/tenants/{id}',
        config: {
            handler: TenantsController.DeleteTenant
        }
    })
};