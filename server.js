'use strict';

var express = require('express');
var mongo = require('mongodb');
var routes = require('./app/index.js');

var app = express();
require('dotenv').load();

mongo.connect(process.env.MONGOLAB_URI, function (err, db) {

   if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB on port 27017.');
   }

   app.use('/public', express.static(process.cwd() + '/public'));

   routes(app, db);

   app.listen(process.env.PORT || 3000, function () {
      console.log('Node.js listening on port 3000...');
   });

});
