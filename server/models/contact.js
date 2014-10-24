var  validator = require('mongoose-validators');

/**
 * @class contact
 * @classdesc contact class contains the contact details
 */

var contact = {
        /** contact type must be string and can be maximum 30 characters */
        contactType: { type: String, validate:[validator.isLength(0, 30)] },
        /** first name must be  string and can be maximum 20 characters */
        firstName: { type: String, required:true, validate:[validator.isLength(0, 20), validator.matches(/^[a-zA-Z0-9\s]+$/)] },
        /** last name must be string and can be maximum 20 characters */
        lastName: { type: String,required:true, validate:[validator.isLength(0, 20), validator.matches(/^[a-zA-Z0-9\s]+$/)] },
        /** email must be valid */
        email: { type: String, required:true, validate: [validator.isEmail] }, 
        /** phone number must be in phone number format which accepts numbers,brackets and +, -  */
        phone: { type: String, validate: [validator.matches(/^[\0-9() -+]{3,50}$/)] }, 
        /** alternative phone number must be in phone number format which accepts numbers,brackets and +, -  */
        alternatePhone: { type: String, validate: [validator.matches(/^[\0-9() -+]{3,50}$/)] }, 
        /** mobile number must be in phone number format which accepts numbers,brackets and +, -  */
        mobile: { type: String, validate: [validator.matches(/^[\0-9() -+]{3,50}$/)]}, 
        /** url must be a valid url */
        url: { type: String, validate: [validator.isURL] },
        /** description must be string and can be maximum 240 characters */
        description: { type: String, validate:[validator.isLength(0, 240), validator.matches(/^[a-zA-Z\s]+$/)] }, 
        /** department must be string and can be maximum 20 characters */
        department: {type: String  , validate:[validator.isLength(0, 20)]}
};

module.exports = {
    Contact: contact
};