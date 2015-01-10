var MongoClient = require('mongodb').MongoClient,
    dbConnection = 'mongodb://127.0.0.1:27017/cccPlanDb';

var getWhere = function (collection, query, callback) {
    MongoClient.connect(dbConnection, function (err, db) {
        if (err) {
            throw err;
        }

        db.collection(collection).find(query).toArray(function (err, data) {
            console.log('err', err, 'data', data);
            callback(data);
            db.close();
        });
    });
};

module.exports.getColleges = function (callback) {
    getWhere('colleges', {}, callback);
};

module.exports.getDegrees = function (collegeName, callback) {
    getWhere('degrees', {
        college: collegeName
    }, callback);
};

module.exports.getRequirments = function (collegeName, degreeName, callback) {
    getWhere('requirments', {
        college: collegeName,
        degree: degreeName
    }, callback);
};

module.exports.getCourses = function (collegeName, degreeName, reqName, callback) {
    getWhere('courses', {
            fulfils: {
                $elemMatch: reqName
            }
        },
        callback);
};