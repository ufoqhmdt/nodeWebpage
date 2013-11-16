var MongoClient = require('mongodb').MongoClient,
	format = require('util').format,
	settings = require("../Settings");

function RegisterInfo(registerInfo) {
	this.lastName = registerInfo && registerInfo.lastName || "";
	this.firstName = registerInfo && registerInfo.firstName || "";
	this.tel = registerInfo && registerInfo.tel || "";
	this.email = registerInfo && registerInfo.email || "";
	this.company = registerInfo && registerInfo.company || "";
	this.createTime = new Date();
}

RegisterInfo.prototype.insert = function() {
	MongoClient.connect(format("mongodb://%s:%s/%s", settings.mongodbHost, settings.mongodbPort, settings.mongodbName), function(err, db) {
		if (err) {
			throw err;
		}
		var collection = db.collection('registerInfo');
		collection.insert({
			lastName: this.lastName,
			firstName: this.firstName,
			tel: this.tel,
			email: this.email,
			company: this.company,
			createTime: this.createTime
		}, function(err, docs) {
			collection.count(function(err, count) {
				console.log(format("count = %s", count));
				db.close();
			});
		});
	}.bind(this));
};

RegisterInfo.prototype.findOne = function(objectId, callback) {
	MongoClient.connect(format("mongodb://%s:%s/%s", settings.mongodbHost, settings.mongodbPort, settings.mongodbName), function(err, db) {
		if (err) {
			throw err;
		}
		var collection = db.collection('registerInfo');
		var ObjectID = require('mongodb').ObjectID;

		collection.findOne({
			_id: new ObjectID(objectId || "")
		}, function(err, data) {
			console.log(data);
			callback(data);
			db.close();
		});
	});
};

RegisterInfo.prototype.findAll = function(callback) {
	MongoClient.connect(format("mongodb://%s:%s/%s", settings.mongodbHost, settings.mongodbPort, settings.mongodbName), function(err, db) {
		if (err) {
			throw err;
		}
		var collection = db.collection('registerInfo');
		collection.find().toArray(function(err, data) {
			console.dir(data);
			callback(data);
			// Let's close the db
			db.close();
		});
	});
};
module.exports = RegisterInfo;