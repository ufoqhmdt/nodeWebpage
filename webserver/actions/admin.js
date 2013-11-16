var loader = require('../loadresources.js'),
	RegisterInfo = require("../dal/RegisterInfo"),
	querystring = require("querystring"),
	url = require("url");

exports.admin = function(request, response, data) {
	response.writeHead(301, {
		'Location': '/resources/admin.html'
	});
	response.end();
};

exports.getRegInfo = function(request, response, data) {
	console.log("action admin...");
	console.log("form data------:" + request);
	var arg = url.parse(request.url).query; 
	console.log("form data------arg:" + arg);
	var str = querystring.parse(arg); 	
	// console.log("form data------str:" + str.id);
	var id=str.id||"";
	var reg = new RegisterInfo();
	// reg.findOne(id, toJson);
	reg.findAll(toJson);

	function toJson(data) {
		console.log("form rtn------:" + data);
		response.writeHead(200, {
			"Content-Type": "application/json"
		});
		response.write(JSON.stringify(data));
		response.end();
	}
};