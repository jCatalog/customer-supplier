/**
 * Dependencies.
 */
var SupplierGroupController = require('../../controllers/supplierGroup');


module.exports = exports = function(server) {
    console.log('Loading SupplierGroup routes');
    exports.indexes(server);
    exports.create(server);
    exports.update(server);
    exports.show(server);
    exports.remove(server);
};

/**
 * GET /events
 * Gets all the SupplierGroup from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/supplierGroup',
        config: {
            handler: SupplierGroupController.GetAll
        }
    });
};

/**
 * POST /new
 * Creates a new supplierGroup in the datastore.
 *
 * @param server - The Hapi Serve
 */
exports.create = function(server) {
    // POST

    server.route({
        method: 'POST',
        path: '/supplierGroup',
        config: {
            handler: SupplierGroupController.Create
        }

    });
};

/**
 * Update /supplierGroup/{id}
 * Update an SupplierGroup, based on the  id in the path.
 *
 * @param server - The Hapi Server
 */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/supplierGroup/{id}',
        config: {
            handler: SupplierGroupController.UpdateSupplierGroup
        }
    })
};
/**
 * GET /supplierGroup/{id}
 * Gets the supplierGroup based upon the {id} parameter.
 *
 * @param server
 */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/supplierGroup/{id}',
        config: {
            handler: SupplierGroupController.GetSupplierGroup
        }
    })
};

/**
 * DELETE /supplierGroup/{id}
 * Deletes an SupplierGroup, based on the id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/supplierGroup/{id}',
        config: {
            handler: SupplierGroupController.DeleteSupplierGroup
        }
    })
};
