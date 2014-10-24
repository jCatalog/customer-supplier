/**
 * Add your other routes below.
 * Each model might have a file that declares its
 * routes, such as the Events model.
 *
 * @param server
 */
exports.init = function(server) {
  console.log('Loading routes');
  require('./routes/tenants')(server);
  require('./routes/customers')(server);
  require('./routes/suppliers')(server);
  require('./routes/supplierGroup')(server);
  require('./routes/customerGroup')(server);
 };
