var MongoClient = require('mongodb').MongoClient,
    dbConnection = 'mongodb://127.0.0.1:27017/cccPlanDb',
    _ = require('lodash');

var getDistinct = function (collection, field, query, callback) {
    MongoClient.connect(dbConnection, function (err, db) {
        if (err) {
            throw err;
        }

        db.collection(collection).distinct(field, function (err, data) {
            callback(data);
            db.close();
        });
    });
};

var getWhere = function (collection, query, callback) {
    MongoClient.connect(dbConnection, function (err, db) {
        if (err) {
            throw err;
        }

        db.collection(collection).find(query).toArray(function (err, data) {
            callback(data);
            db.close();
        });
    });
};

module.exports.getFrom = function (callback) {
    getDistinct('agreements', 'from', {}, callback);
};

module.exports.getTo = function (callback) {
    getDistinct('agreements', 'to', {}, callback);
};

module.exports.getMajors = function (from, to, callback) {
    getWhere('agreements', {
        from: from,
        to: to
    }, function (items) {
        callback(_.pluck(items, 'major'));
    });
};

module.exports.getTable = function (from, to, major, callback) {
    getWhere('agreements', {
        from: from,
        to: to,
        major: major
    }, function (items) {
        callback((items[0] || {
            table: []
        }).table);
    });
};