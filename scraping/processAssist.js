  var MongoClient = require('mongodb').MongoClient,
      dbConnection = 'mongodb://127.0.0.1:27017/cccPlanDb',
      cheerio = require('cheerio'),
      _ = require('lodash');

  var extractTable = function (html) {
      return _.map(html.split(/---+/).filter(function (section) {
          return section.indexOf('|') !== -1;
      }), function (section) {
          var sides = ['', ''],
              subs = section
              .split('\n').forEach(function (sub) {
                  sides[0] += sub.split('|')[0] || '';
                  sides[1] += sub.split('|')[1] || '';
              });
          return sides;
      });
  };



  MongoClient.connect(dbConnection, function (err, db) {
      if (err) {
          throw err;
      }
      var agreements = db.collection('agreements');

      agreements.find({}).toArray(function (err, data) {
          data.forEach(function (item) {
              agreements.update({
                  to: item.to,
                  from: item.from,
                  major: item.major
              }, {
                  $set: {
                      table: extractTable(item.source)
                  }
              }, function (err, result) {
                  if (err) {
                      console.log(err);
                  }
              });
          });
      });
  });