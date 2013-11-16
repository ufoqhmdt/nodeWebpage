
var http = require("http");
var url = require("url");
var querystring = require("querystring");
var totalCount=0;

function Appstart(route, handle) {
  function onRequest(request,response){
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    // console.log('client ip:'+request.connection.remoteAddress);
    // console.log("Request for " + pathname + " received");

    request.setEncoding("utf8");

    request.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
     // console.log("Received POST data chunk: " +  querystring.parse(postData).text );
    });

    request.addListener("end", function() {
     // totalCount++;
     // console.log('request count:'+totalCount);
      route(handle, pathname, request, response, postData);
    });
  }
  var port=8080;
  http.createServer(onRequest).listen(port);
  console.log("server listening at http://localhost:"+port);
}
// export function start() as start
exports.start = Appstart;
