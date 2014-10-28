/**
* Dependencies.
*/
var path = require('path')
module.exports = {
    server: {
        listenHost: '0.0.0.0',
        listenPort: 3000,                                   // The port on which the server is to listen (means that the app is at http://localhost:8081 for instance)
        securePort: 8082,                                   // The HTTPS port on which the server is to listen (means that the app is at https://localhost:8082 for instance)
        distFolder: path.resolve(__dirname, '../../client/dist'),  // The folder that contains the application files (note that the files are in a different repository) - relative to this file
        staticUrl: '/static',                               // The base url from which we serve static files (such as js, css and images)
        cookieSecret: 'event'                         // The secret for encrypting the cookie
    },
    client: {
        listenHost: '0.0.0.0',
        listenPort: 3035,                                   // The port on which the server is to listen (means that the app is at http://localhost:8000 for instance)
    },
    DB: {
        dialect: "mongodb",
        host: 'localhost' ,
        port: 3000 ,
        databaseName : "customer-supplier",
        userName : "event",
        password : "event"

    } ,
    configuration : {
        isDebugMode : false
    },
  filePath: {
    back: "/..",
    directory: "/../../upload",
    upload: "/upload",
    customerFile: "/customerLogo",
    supplierFile: "/supplierLogo"
    
  }
};