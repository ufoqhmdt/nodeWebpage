
var querystring = require("querystring");



exports.upload = require('./actions/uploadform').uploadform;
exports.loadIndexPage=require('./actions/loadIndexPage').loadIndexPage;
exports.captcha = require('./actions/captcha').generateCaptcha;
exports.admin = require('./actions/admin').admin;
exports.getRegInfo = require('./actions/admin').getRegInfo;