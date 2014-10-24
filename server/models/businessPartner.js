var  validator = require('mongoose-validators');

/**
 * @class businessPartner 
 * @classdesc businessPartner class contains the details of business partner
 */


var businessPartner = {
        /** is of string type */
        extAccountCode: { type: String },
        /** external name for business partner and should be alphaNumeric, minimum 2 characters and maximum 30 characters */
        extName: { type: String, validate:[validator.isLength(2, 30), validator.matches(/^[a-zA-Z0-9_-\s]+$/)] },
        /** external short name should be alphaNumeric and in between 2 to 30 characters */
        extShortName: { type: String, validate:[validator.isLength(2, 30), validator.matches(/^[a-zA-Z0-9_-\s]+$/)] },
        /** external global id should be alphaNumeric and in between 2 to 40 characters */
        extGlobalId: { type: String, validate:[validator.isLength(2, 40), validator.matches(/^[a-zA-Z0-9\s]+$/)] },
        /** is of string type and can be maximum 40 characters */
        language: { type: String , validate:[validator.isLength(0, 40)] },
        /** is of string type and can be maximum 20 characters */
        currency: { type: String, validate:[validator.isLength(0, 20)]},
        /** contains the file name of logo*/
        logo: { type: String }
};

module.exports = {
    BusinessPartner: businessPartner
};