'use strict';

var validUrl = require('valid-url');

function urlHandler (db) {
   var urls = db.collection('urls');
   var counters = db.collection('counters');

   function getNextSequence(name, callback) {
     var ret = counters.findAndModify(
            { _id: name },
            [],
            { $inc: { seq: 1 } },
            {new: true, upsert: true},
            function(error, result){
              if(error){console.log(error)}
              else {
                //console.log(result);
                callback(result.value.seq);
              }
            }
          )
        }

   this.getUrl = function (req, res) {
     console.log(parseInt(req.params.shortId));
      urls.findOne({_id: parseInt(req.params.shortId)},function (err, result) {
         if (err) {
            throw err;
         } else {
           if (result){
             res.redirect(result.url);
           } else {
             res.send('This short url is not valid');
           }
         }
      });
   };

   this.addUrl = function (req, res) {
     if (!validUrl.isUri(req.params.urlToAdd)){
       res.json({error: "That doesn't appear to be a valid url :("});
       return;
     }
      getNextSequence('urls', function(seq){
        //console.log(seq)
        urls.insert({
          _id: seq,
          url: req.params.urlToAdd
        }, function (err, result) {
           if (err) {
              throw err;
           }
           console.log(result);
           var response = {
             original_url: result.ops[0].url,
             short_url: "https://url-shrtnr-fcc.herokuapp.com/" + result.ops[0]._id
           }
           res.json(response);
        });
      })

   };

}

module.exports = urlHandler;
