var loader=require('../loadresources.js');
exports.loadIndexPage=function(request,response){
  console.log('redirect to index page!');
  response.writeHead(301, {
    'Location': '/resources/index.html'
  });
  response.end();

};
