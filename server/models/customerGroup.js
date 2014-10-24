var Mongoose = require('../config/database').Mongoose,
    db = require('../config/database').db,
    Schema     = Mongoose.Schema,
    validator = require('mongoose-validators');

/**
 * @module customerGroup
 * @description customer group class contains the details of a customer group
 */


var customerGroupSchema = new Schema({
  /** group name is required, must be alphannumeric, in between 2 to 30 characters */
  groupName : { type: String, required: true, trim: true, validate: [ validator.matches(/^[a-zA-Z0-9\s]+$/), validator.isLength(2, 30)] }
});

var customerGroup = Mongoose.model('customerGroup', customerGroupSchema);

module.exports = {
  CustomerGroup: customerGroup
};