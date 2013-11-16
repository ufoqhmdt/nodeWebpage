var basePath = '../resources/',
  fs = require('fs'),
  pathLib = require('path'),
  zlib = require('zlib');


function getContentType(fileName) {
  var extName = pathLib.extname(fileName).toLowerCase();
  //console.log('get content type:'+extName);
  var oMap = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon",
    ".svg": "image/svg+xml",
    ".ttf": "application/x-font-ttf",
    ".otf": "application/x-font-opentype",
    ".woff": "application/font-woff",
    ".eot": "application/vnd.ms-fontobject"
  };
  if (oMap[extName]) {
    return oMap[extName];
  } else {
    return "text/plain";
  }
}

function load(path, okfn, errorfn) {
  var fullPath = pathLib.resolve(basePath, path);
  // console.log('prepare to load resource file:'+fullPath);
  if (global.cacheEnable && global.fileCache.hasOwnProperty(fullPath)) {
    okfn(global.fileCache[fullPath]);
  } else {
    fs.readFile(fullPath, function(err, data) {
      if (err) {
        errorfn(err);
      } else {
        //  console.log('load '+path+'resources:'+data);
        //data=new Buffer(data, 'utf8');
        if (global.cacheEnable) {
          global.fileCache[fullPath] = data;
        }
        okfn(data);
      }
    });
  }

}

function responseResource(path, request, response) {
  load(path,
    function(data) {
      response.writeHead(200, {
        "Content-Type": getContentType(path),
        'Cache-Control': 'max-age=600, public'
      });
      var acceptEncoding = request.headers['accept-encoding'];
      if (!acceptEncoding) {
        acceptEncoding = '';
      }

      if (acceptEncoding.match(/\bdeflate\b/)) {
        response.writeHead(200, {
          'content-encoding': 'deflate'
        });

        zlib.deflate(data, function(err, result) {
          if (err) {
            console.log(err);
            response.end(data);
          }
          response.end(result);
        });
      } else if (acceptEncoding.match(/\bgzip\b/)) {
        response.writeHead(200, {
          'content-encoding': 'gzip'
        });
        zlib.gzip(data, function(err, result) {
          if (err) {
            console.log(err);
            response.end(data);
          }
          response.end(result);
        });

      } else {
      response.end(data);
      }
    }, function(err) {
      console.log(err);
      response.writeHead(404, {
        "Content-Type": "text/plain"
      });
      response.end();
    });
}

exports.load = load;
exports.responseResource = responseResource;