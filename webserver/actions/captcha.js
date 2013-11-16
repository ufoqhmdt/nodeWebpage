
try{
  var captcha = require('captcha');
} catch(e) {
  var captcha = function(){
    return function(request, response, cb){
      cb("abcd", "");
    }
  }
}

var crypto = require('crypto');
global.captchaMap = {};
exports.generateCaptcha = function(request, response, data) {
	captcha({url: '/resources/captcha', color:'#1b8dcf', background: 'rgb(255,255,255)' })(request, response, function(text, image) {
		var md5 = crypto.createHash('md5');
		md5.update(text + 'SAPAnywhere');
		var d = md5.digest('hex');
    global.captchaMap[d] = {
      code: text,
      timeStamp: Date.now()
    };
		response.write(
	    	JSON.stringify({ 
			    id: d, 
			    image: 'data:image/png;base64,' + image
		    })
		);
		response.end();
	});
};

setInterval(function(){
    var now = Date.now();
    for (var hash in global.captchaMap) {
      if (now - global.captchaMap[hash].timeStamp > 1000*60*10) {
        delete global.captchaMap[hash];
      }
    }
}, 1000*60);
