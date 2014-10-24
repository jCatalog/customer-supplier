/**
 * Dependencies.
 */
var CustomersController = require('../../controllers/customers');


module.exports = exports = function(server) {
    console.log('Loading Customer routes');
    exports.indexes(server);
    exports.create(server);
    exports.update(server);
    exports.show(server);
    exports.remove(server);
    exports.download(server);
    exports.showByTenant(server);
    exports.search(server);
    exports.getStaticData(server);
};

/**
 * GET /events
 * Gets all the Customer from MongoDb and returns them.
 *
 * @param server - The Hapi Server
 */
exports.indexes = function(server) {
    // GET
    server.route({
        method: 'GET',
        path: '/customers',
        config: {
            handler: CustomersController.GetAll
        }
    });
};

/**
 * POST /new
 * Creates a new Customer in the datastore.
 *
 * @param server - The Hapi Serve
 */
exports.create = function(server) {
    // POST

    server.route({
        method: 'POST',
        path: '/customers',
        config: {
            handler: CustomersController.Create
        }

    });
};


/**
 * GET /customers/{id}
 * Gets the Customer based upon the {id} parameter.
 *
 * @param server
 */
exports.show = function(server) {

    server.route({
        method: 'GET',
        path: '/customers/{id}',
        config: {
            handler: CustomersController.GetCustomer
        }
    })
};
/**
 * Update /customers/{id}
 * Update an Customer, based on the  id in the path.
 *
 * @param server - The Hapi Server
 */
exports.update = function(server) {
    server.route({
        method: 'PUT',
        path: '/customers/{id}',
        config: {
            handler: CustomersController.UpdateCustomer
        }
    })
};
/**
 * DELETE /customers/{id}
 * Deletes an Customer, based on the tenants id in the path.
 *
 * @param server - The Hapi Server
 */
exports.remove = function(server) {
    server.route({
        method: 'DELETE',
        path: '/customers/{id}',
        config: {
            handler: CustomersController.DeleteCustomer
        }
    })
};

/**
 * GET /getCustomerExcel
 * Download Customer excel sheet.
 *
 * @param server - The Hapi Server
 */
exports.download = function(server) {
    server.route({
        path: "/getCustomerExcel",
        method: "GET",
        config: {
            handler: CustomersController.GetCustomerExcel
        }
    })
};

/**
 * GET /customers/{tenant_id}
 * Gets all the Customer based upon the tenant id .
 *
 * @param server
 */
exports.showByTenant = function(server) {

    server.route({
        method: 'GET',
        path: '/customersByTenant/{tenantRef}',
        config: {
            handler: CustomersController.GetCustomerByTenant
        }
    })
};
/**
 * GET /customerSearch
 * Gets all the Customer based upon search query.
 *
 * @param server
 */
exports.search = function(server) {
    server.route({
        method: 'POST',
        path: '/customerSearch',
        config: {
            handler: CustomersController.GetCustomerSearch
        }
    })
};

exports.getStaticData = function(server){
  server.route({
    method: 'GET',
    path: '/getStaticData',
    config:{
      handler: CustomersController.getStaticData
    }
  });
};