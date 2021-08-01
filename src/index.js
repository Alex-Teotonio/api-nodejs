const http = require('http');
const bodyParser = require('./helpers/bodyParser')
const routes  = require('./routes');
const {URL} = require('url')


const server = http.createServer((request, response) => {
    const parsedUrl = new URL(`http://localhost:3333${request.url}`);
    let {pathname} = parsedUrl;

    const splitEndPoint = pathname.split('/').filter(Boolean);
    let id = null
    if(splitEndPoint.length > 1) {

        id = splitEndPoint[1]
        pathname = `/${splitEndPoint[0]}/:id`
    }

    const route = routes.find((routeObj) => {
       return routeObj.endpoint == pathname && routeObj.method == request.method
    });

    if(route) {;

        request.params = {id}
        request.query = Object.fromEntries(parsedUrl.searchParams);
 
        response.send = (statusCode, body) => {
            response.writeHead(statusCode, {'Content-type' : 'application/json'});
            response.end(JSON.stringify(body));
        }
        if(['POST', 'PUT', 'PATCH'].includes(request.method)){
            bodyParser(request, ()=>route.handler(request,response));
        } else {
            route.handler(request, response);
        }
    } else {
        response.writeHead(200, {'Content-type' : 'text/html'});
        response.end(`Cannot ${request.method} /`);
    }
});


server.listen(3333, () => console.log('Server is running'));