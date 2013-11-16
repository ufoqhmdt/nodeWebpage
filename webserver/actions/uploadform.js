var loader = require('../loadresources.js'),
	RegisterInfo = require("../dal/RegisterInfo"),
	querystring = require("querystring"),
	url = require("url");


exports.uploadform = function(request, response, data) {
	console.log('invoke submit action!');
	console.log("form data:" + data);

	var str = querystring.parse(data);

	if (global.captchaMap[str.verifyHush] && global.captchaMap[str.verifyHush].code === str.verifyCode) {

		delete global.captchaMap[str.verifyHush];

		var regObj = {
			lastName:str.lastName,
			firstName:str.firstName,
			tel:str.tel,
			email:str.email,
			company:str.company
		};

		var reg = new RegisterInfo(regObj);
		reg.insert();

		//success
		loader.responseResource('../webserver/success.html', request, response);
	} else {
		loader.responseResource('../webserver/verifyTimeout.html', request, response);
	}

};