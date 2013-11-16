var server = require("./server");
var router = require("./router");
var requestHandlers = require("./handler");
global.fileCache={};
global.cacheEnable=true;
process.argv.forEach(function(item){
  if(item==="nocache"){
    global.cacheEnable=false;
  }
});
var handle = {};

handle["/"] = requestHandlers.loadIndexPage;
handle["/admin"] = requestHandlers.admin;
handle["/uploadForm"] = requestHandlers.upload;
handle['captcha'] = requestHandlers.captcha;
handle['/getRegInfo'] = requestHandlers.getRegInfo;


server.start(router.route, handle);
