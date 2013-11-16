var format = require('util').format, RegisterInfo = require("../dal/RegisterInfo");
var dataObj = {
	lastName:"lastName",
	firstName:"firstName",
	tel:"tel",
	email:"email",
	company:"company",
	createTime:"createTime"
};
var reg = new RegisterInfo(dataObj);
reg.insert();
// reg.findOne("5287005cabdd45801f000001");
