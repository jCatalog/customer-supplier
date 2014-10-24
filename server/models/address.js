var  validator = require('mongoose-validators');

/**
 * @class address
 * @classdesc address class contains the address details
 */



var address = {
        /** address type must be string and can be maximum 10 characters*/
        addressType: { type: String, validate:[validator.isLength(0, 10)] },
        /** name1 is required, must be alphabet and can be maximum 20 characters*/
        name1: { type: String, required:true, validate:[validator.isLength(0, 20), validator.matches(/^[a-zA-Z0-9\s]+$/)]},
        /** name2  must be alphabet and can be maximum 20 characters*/
        name2: { type: String, validate:[validator.isLength(0, 20), validator.matches(/^[a-zA-Z0-9\s]+$/)] },
        /** name3  must be alphabet and can be maximum 20 characters*/
        name3: { type: String, validate:[validator.isLength(0, 20), validator.matches(/^[a-zA-Z0-9\s]+$/)]},
        /** street must be string and can be maximum 20 characters*/
        street: { type: String, validate:[validator.isLength(0, 20)] },
        /** zipcode must be alphanumeric and can be maximum 10 characters */
        zipCode: { type: String , validate:[validator.isAlphanumeric(), validator.isLength(0, 10)] },
        /** city must be string and can be maximum 20 characters */
        city: { type: String, required:true, validate:[validator.isLength(0, 20)] },
        /** Po Box Zipcode must be alphanumeric and can be maximum 10 characters */
        poboxZipCode: { type: String, validate:[validator.isAlphanumeric(), validator.isLength(0, 10)]},
        /** Po Box must be alphanumeric and can be maximum 10 characters */
        pobox: { type: String, validate:[validator.isAlphanumeric(),validator.isLength(0, 10)] },
         /** isCompany must be Boolean with default value false */
        isCompany: { type: Boolean, default: false },
        /** phone number must be in phone number format which accepts numbers,brackets and +, -  */
        phoneNo: { type: String, validate: [validator.matches(/^[\0-9() -+]{3,50}$/)]},
        /** fax number must be in phone number format which accepts numbers,brackets and +, -  */
        faxNo: { type: String, validate: [validator.matches(/^[\0-9() -+]{3,50}$/)]},
        /** email must be valid */
        email: { type: String, validate: [validator.isEmail]},
        /** corporate url must be a valid url */
        corporateURL: { type: String, validate: [validator.isURL] },
        /** number Of employees must be number */
        numOfEmployees: { type: Number },
        /** country must be string and can be maximum 50 characters */
        country: { type: String, required:true, validate:[validator.isLength(0, 50)]},
        /** state must be string and can be maximum 20 characters */
        state: { type: String, validate:[validator.isLength(0, 20)]}
};

module.exports = {
    Address: address
};