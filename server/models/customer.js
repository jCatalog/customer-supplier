var Mongoose = require('../config/database').Mongoose,
    db = require('../config/database').db,
    Schema = Mongoose.Schema,
    validator = require('mongoose-validators')
    autoIncrement = require('mongoose-auto-increment');
    autoIncrement.initialize(db);

var Contact =  require('./contact').Contact;

var Address = require('./address').Address;

var BusinessPartner = require('./businessPartner').BusinessPartner;

/** 
  * @module customer 
  * @description customer class contains the details of customer.
 */

var customerSchema = new Schema({
    /** unique id for customer and should be alphanumeric and maximum 30 characters */
    customerId: {type: String, validate: [validator.isAlphanumeric(), validator.isLength(2, 30)] },
    /** reference to Tennant Collection and should save id of Tenant and is the required field */
    tenantRef: { type: String, ref: 'tenant', index: true, required: true },
    /** Id which customer see and is the combination of tenantRef and CustomerId */
    customerDisplayId: {type: String, index: true },
    /** reference to customerGroup Collection and should save id of customerGroup and is required */
    customerGroup: {  type: String, ref: 'customerGroup', required: true},
    /** name of customer and should be alphaNumeric, minimum 2 characters and maximum 30 characters and is required */
    customerName: { type: String, validate: [validator.isLength(2,30), validator.matches(/^[a-zA-Z0-9\s]+$/)]  },
    /** nine digit number required for doing business in Europe, US and many other country */
    dunsNo: { type: String, validate: [validator.isLength(0,9)] },
    /** contains some information of customer and must be of string type and can have maximum 50 characters */ 
    information: { type: String , validate: [validator.isLength(0, 50)]},
    /** is of string type and can contain maximum 30 characters */
    eutaxId: { type: String, validate: [validator.isLength(0, 30)]  },
     /** is of boolean type and default is false */
    isLocked: { type: Boolean, default: false },
     /** is of boolean type and default is false */
    isCustomerGrpMaster: { type: Boolean, default: false },
     /** is of boolean type and default is false */
    withVAT: { type: Boolean, default: false },
     /** must be string type */
    vatIdentNo: { type: String },
     /** must be Number */
    debitLimit: { type: Number },
    /** must be string and should contains maximum 9 characters */
    tax: { type: String, validate: [validator.isLength(0, 9)]},
    /** must be string and should be maximum 40*5 characters */
    headerText: { type: String, validate: [validator.isLength(0, 200)] },
    /** must be string and should be maximum 40*5 characters */
    footerText: { type: String, validate: [validator.isLength(0, 200)] },
    /** must be string and should be maximum 40*5 characters */
    customerProfile: { type: String, validate: [validator.isLength(0, 200)] },
    /** must be string and should be maximum 50 characters */
    hierarchyCode: { type: String, validate: [validator.isLength(0, 50)] },
    /** must be float and should be maximum 100 */
    invTolerancePercent:  { type: String, validate: [validator.isFloat(), validator.isLength(0, 100)] },
    /** must be float and should be maximum 100 */
    invToleranceAbs:  { type: String, validate: [validator.isFloat(), validator.isLength(0, 100)] },
     /** abstractBusinessPartner is an object of BusinessPartner class */
    abstractBusinessPartner: BusinessPartner,
     /**contacts is an array of contact class */
    contacts: [Contact],
     /** addresses is an array of address class */
    addresses: [Address]
})

customerSchema.plugin(autoIncrement.plugin,{ model: 'customer', field: 'customerId' });

customerSchema.pre('save', function (next) {
  this.customerDisplayId = this.customerId+this.tenantRef;
  next();
});

var customer = Mongoose.model('customer', customerSchema);

module.exports = {
    Customer: customer
};