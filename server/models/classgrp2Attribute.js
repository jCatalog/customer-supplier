/**
 * @class classgrp2Attribute
 * @classdesc classgrp2Attribute class contains the classgrp2Attribute details
 */

var classgrp2Attribute = {
	attributeRef: { type: Schema.ObjectId, ref: 'attribute' },
	sortNo: { type: Number },
	grpId: { type: String }
};

module.exports = {
	Classgrp2Attribute = classgrp2Attribute;
}