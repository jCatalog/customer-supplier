/**
 * Dependencies.
 */
var Hapi = require('hapi'),
    config = require('./server/config/settings'),
    routes = require('./server/config/routes'),
    Ejs = require('ejs'),
    Wreck = require('wreck'),
    util = require('util');

// FOR API SERVER:
var server = Hapi.createServer(config.server.listenHost, config.server.listenPort, {cors: true}); //, {

// Add the server routes
routes.init(server);

var notFound = function(request, reply) {
    reply('The page was not found').code(404);
};

server.route({
    method: '*',
    path: '/{p*}',
    handler: notFound
});

// FOR GUI SERVER
var API = {
    call: function(opts) {
        var url = 'http://' + config.server.listenHost + ':' + config.server.listenPort + opts.url;

        var requestOptions = {                   
            headers: { 'content-type':'application/json'}
        };

        // Add payload
        if(opts.payload) {
            requestOptions.payload = JSON.stringify(opts.payload);
        }
       
        if(opts.method === 'POST' || opts.method === 'post')
        {
            Wreck.post(url, requestOptions, opts.callback)
        }
        else if(opts.method === 'PUT' || opts.method === 'put')
        {
            Wreck.put(url, requestOptions, opts.callback)
        }
        else if(opts.method === 'DELETE' || opts.method === 'delete')
        {
            Wreck.delete(url, requestOptions, opts.callback)
        }
        else
        {
            Wreck.get(url, requestOptions, opts.callback);
        }
    }
};

server.route({
        path: "/api/get{resourcename}Excel",
        method: "GET",
        handler: function(request, reply) {
            API.call({
                method: 'GET',
                url: request.path.substring(4),     
                callback: function(err, res, payload) {
                    if (err) throw err;
                    return reply(payload).header('Content-Type', 'application/octet-stream').header('content-disposition', 'attachment; filename='+request.params.resourcename+'.csv;');
                }
            });
        }
    });

server.route({
        path: "/api/{path*}",
        method: ["GET","POST","PUT","DELETE"],
        handler: function(request, reply) {
            API.call({
                method: request.method,
                url: request.path.substring(4),     
                payload: request.payload,
                callback: function(err, res, payload) {
                    if (err) throw err;
                    else 
                        reply(payload);
                }
            });
        }
    });

server.route({
    method: 'GET',
    path: '/upload/{params*}',
    handler: {
        directory: { path: './upload' }
    }
});

server.route({
    method: 'GET',
    path: '/{params*}',
    handler: {
        directory: { path: './client/app' }
    }
});
server.route({
    method: 'GET',
    path: '/',
    handler: {
      file: "./client/app/index.html"
    }
});

server.start(function () {
  console.log('Server started ', server.info.uri);
});