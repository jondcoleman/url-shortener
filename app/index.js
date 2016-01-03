'use strict';

var UrlHandler = require(process.cwd() + '/app/urlController.js');

module.exports = function (app, db) {
   var urlHandler = new UrlHandler(db);

   app.route('/')
      .get(function (req, res) {
         res.sendFile(process.cwd() + '/public/index.html');
      });

  app.route('/:shortId')
    .get(urlHandler.getUrl);

  app.route('/add/:urlToAdd(*)')
    .get(urlHandler.addUrl);
};
