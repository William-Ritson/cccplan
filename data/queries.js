var MongoClient = require('mongodb').MongoClient,
    dbConnection = 'mongodb://127.0.0.1:27017/cccPlanDb';

var getWhere = function (collection, query, callback) {
    MongoClient.connect(dbConnection, function (err, db) {
        if (err) {
            throw err;
        }

        callback(db.collection(collection).get(query).toArray());

        db.close();
    });
};

module.getColleges = function (callback) {
    getWhere('colleges', {}, callback);
};

module.getDegrees = function (collegeName, callback) {
    getWhere('degrees', {
        college: collegeName
    }, callback);
};

module.getRequirments = function (collegeName, degreeName, callback) {
    getWhere('requirments', {
        college: collegeName,
        degree: degreeName
    }, callback);
};