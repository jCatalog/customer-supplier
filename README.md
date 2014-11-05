customer-supplier
=================

Management of customers and suppliers for Node.js/MongoDB/Mongoose with AngularJS based UI, hapi controller

### Install an app

You need to run the following command in root directory of an app in command prompt.

npm install

### Run an app

###### *Run Mongodb Database*

[Mongodb] (http://docs.mongodb.org/manual/)

###### *import database*

import sample data using the given command

mongorestore --host localhost --port 27017 --db [database_name] [path of sample database file]

Note: You will find sample database in ./db/customer-supplier.

###### *Run Server*

You need to run the following command in root directory of an app in command prompt.

node server.js

### Run Test

Test cases are written using Mocha for nodejs testing and protractor for angularjs.

Mocha is a simple, flexible, fun JavaScript test framework for node.js and the browser.

Protractor runs tests against your application running in a real browser, interacting with it as a user would.

###### *How to run node test*

npm install -g mocha

mocha

 [![Mocha test framework](http://f.cl.ly/items/3l1k0n2A1U3M1I1L210p/Screen%20Shot%202012-02-24%20at%202.21.43%20PM.png)](http://mochajs.org)

###### *How to run angular test*

npm install -g protractor

protractor

[visit protractor] (http://angular.github.io/protractor/#/)

### Documentation

###### *Model Documentation*

Model documentations are written using jsdoc.

JSDoc 3 is an API documentation generator for JavaScript.

You can find model documentation in directory named out in root directory of app.

Open index.html inside out directory.

[jsdoc] (http://usejsdoc.org/)

###### *Api Documentation*

Build beautiful APIs

Collaborative design, instant API mock, generated documentation, integrated code samples, debugging and automated testing.

[Visit Api Documentation!] (http://docs.customersupplier.apiary.io/)

