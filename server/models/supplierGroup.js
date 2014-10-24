var Mongoose = require('../config/database').Mongoose,
    db = require('../config/database').db,
    Schema     = Mongoose.Schema,
    validator = require('mongoose-validators');

/** 
 * @module supplierGroup 
 * @description supplier group class contains the details of a supplier group
 */


var supplierGroupSchema = new Schema({
  /** group name is required, must be alphannumeric, in between 2 to 30 characters */
  groupName : { type: String, required: true, trim: true, validate: [ validator.matches(/^[a-zA-Z0-9\s]+$/), validator.isLength(2, 30)] }
});

var supplierGroup = Mongoose.model('supplierGroup', supplierGroupSchema);

module.exports = {
  SupplierGroup: supplierGroup
};