/**
 * Dependencies.
 */
var SuppliersController = require('../../controllers/suppliers');


module.exports = exports = function(server) {
    console.log('Loading Supplier routes');
    exports.indexes(server);
    exports.create(server);
    exports.update(server);
    exports.show(server);
    exports.remove(server);
    exports.download(server);
    exports.showByTenant(server);
    exports.search(server);
};

/**
 * GET /events
 * Gets all the Suppliers from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/suppliers',
        config: {
            handler: SuppliersController.GetAll
        }
    });
};

/**
 * POST /new
 * Creates a new supplier in the datastore.
 *
 * @param server - The Hapi Serve
 */
exports.create = function(server) {
    // POST

    server.route({
        method: 'POST',
        path: '/suppliers',
        config: {
            handler: SuppliersController.Create
        }

    });
};


/**
 * GET /suppliers/{id}
 * Gets the supplier based upon the {id} parameter.
 *
 * @param server
 */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/suppliers/{id}',
        config: {
            handler: SuppliersController.GetSupplier
        }
    })
};
/**
 * Update /suppliers/{id}
 * Update an Supplier, based on the  id in the path.
 *
 * @param server - The Hapi Server
 */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/suppliers/{id}',
        config: {
            handler: SuppliersController.UpdateSupplier
        }
    })
};
/**
 * DELETE /suppliers/{id}
 * Deletes an Supplier, based on the id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/suppliers/{id}',
        config: {
            handler: SuppliersController.DeleteSupplier
        }
    })
};
/**
 * GET /getSupplierExcel
 * Download Supplier excel sheet.
 *
 * @param server - The Hapi Server
 */
exports.download = function(server) {
    server.route({
        path: "/getSupplierExcel",
        method: "GET",
        config: {
            handler: SuppliersController.GetSupplierExcel
        }
    })
};
/**
 * GET /suppliers/{tenant_id}
 * Gets all the Supplier based upon the tenant id .
 *
 * @param server
 */
exports.showByTenant = function(server) {

    server.route({
        method: 'GET',
        path: '/suppliersByTenant/{tenantRef}',
        config: {
            handler: SuppliersController.GetSupplierByTenant
        }
    })
};
/**
 * GET /supplierSearch
 * Gets all the Supplier based upon search query.
 *
 * @param server
 */
exports.search = function(server) {
    server.route({
        method: 'POST',
        path: '/supplierSearch',
        config: {
            handler: SuppliersController.GetSupplierSearch
        }
    })
};