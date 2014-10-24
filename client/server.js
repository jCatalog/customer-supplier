/**
* Dependencies.
*/
var Hapi   = require('hapi'),
    config = require('../server/config/settings'),
    Wreck = require('wreck');

var server = new Hapi.Server(config.client.listenHost, config.client.listenPort);

var goodOptions = {
    subscribers: {
        console: ['ops', 'request', 'log', 'error']
    }
};

server.pack.register([
    {
        name: 'good',
        plugin: require('good'),
        options: goodOptions
    }
], function(err) {
    if (err) throw err;
});



var API = {
    call: function(opts) {
        // var url = 'http://'+options.apiIP+opts.url;
        var url = 'http://'+'localhost:3000'+opts.url;

            console.log(url)


        var requestOptions = {                   
            headers: { 'content-type':'application/json'}
        };

        // Add payload
        if(opts.payload) {
            requestOptions.payload = JSON.stringify(opts.payload);
        }
        
        // Make call
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
        path: "/api/{path*}",
        method: ["GET","POST","PUT","DELETE"],
        handler: function(request, reply) {
            API.call({
                method: request.method,
                url: request.path.substring(4),     // slice out the '/api' part from the request path
                payload: request.payload,
                // credentials: options.coreCreds,
                callback: function(err, res, payload) {
                    if (err) throw err;
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


// Add the server routes
// routes.init(server);

var notFound = function (request, reply) {
    reply('The page was not found').code(404);
};

// server.route({ method: '*', path: '/{p*}', handler: notFound });

//Start the server
server.start(function () {
    //Log to the console the host and port info
    console.log('✔ Hapi angular server listening on port  ' + server.info.uri);
});