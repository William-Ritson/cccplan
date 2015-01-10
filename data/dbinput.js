var MongoClient = require('mongodb').MongoClient,
    dbConnection = 'mongodb://127.0.0.1:27017/cccPlanDb';


module.exports.storeAgreement = function (agreement) {
    MongoClient.connect(dbConnection, function (err, db) {
        if (err) {
            throw err;
        }

        var collection = db.collection('agreements');

        collection.insert(agreement, function (errr, docs) {
            if (err) {
                throw err;
            }
            console.log('inserted agreement');
            db.close();
        });

    });
};