var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = "mongodb://localhost:27017/soporte";

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log('Conectado correctamente a la base de datos');

    var collection = db.collection('usuarios');

    var docsTotales = module.exports.docsTotales = function(callback) {
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            callback(docs);
        });
    }

    var insertDocs = module.exports.insertDocs = function(query) {
        collection.insert(query);
    }

});
