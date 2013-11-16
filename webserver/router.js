var loader=require('./loadresources');

function route(handle, pathname, request, response, postData){
  // console.log("About to route request for " + pathname);
  //handle static resource first

  if (pathname.indexOf('captcha') !== -1) {
    return handle['captcha'](request, response, postData);
  } else if(pathname.indexOf('/resources/')===0){
    // console.log('find static resource');
    var newPathName=pathname.replace('/resources/','');
    loader.responseResource(newPathName,request,response);
  }
  else if (typeof handle[pathname] === 'function'){
    return handle[pathname](request,response, postData);
  }else{
    console.log("No request handler found for " + pathname);
    response.writeHead(404, {"Content-Type":"text/plain"});
    response.write("404 Not found");
    response.end();
  }
}

exports.route = route;
