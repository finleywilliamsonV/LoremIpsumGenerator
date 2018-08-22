// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", { useNewUrlParser: true }, function(err, client) {
  if(!err) {
    console.log("\n - We are connected to MongoDB! - \n");
  }
  
  // because MongoClient.connect() returns a client
  let db = client.db('exampleDb');

  db.createCollection('test', function(err, collection) {});   // ignores if colleciton exists

  var collection = db.collection('test');
  var doc1 = {'hello':'doc1'};
  var doc2 = {'hello': 'doc2'};
  var lotsOfDocs = [{'hello': 'doc3'},{'hello': 'doc4'}];

  // ADDS DOCUMENTS TO COLLECTION
  // collection.insertOne(doc1, {w:1}, function(err, result) {});
  // collection.insertOne(doc2, {w:1}, function(err, result) {});
  // collection.insertMany(lotsOfDocs, {w:1}, function(err, result) {});

  // collection.update({hello:'doc1'}, {$set: {hello: "doc5"}});   // changes doc1 to doc5

  // collection.remove({hello:"doc1"});    // removes doc1

  // finds the item matching {hello:'doc1'}
  // collection.findOne({hello:'doc1'}, (err, item) => {
  //   console.log(item);
  // })

  // collection.deleteMany(); // delete all documents

  if (err) {
    console.err('ERROR: ',err);
  }
});

// module.exports.MongoClient = MongoClient;  // do I need this?