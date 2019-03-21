const mongoose = require('mongoose');

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to db before tests run
before(function(done){
  // console.log('connecting to the database');
  const DATABASE_URL = 'mongodb://admin:admin@ds135747.mlab.com:35747/codeprestige-tests';
  mongoose.connect(DATABASE_URL, { useMongoClient: true });
  mongoose.connection.once('open', function(){
    console.log('Connection has been made, now make fireworks...');
    done();
  }).on('error', function(error){
    console.log('Connection error:', error);
  });
});

// Drop the characters collection before each test
afterEach(function(done) {
  // console.log('drop the database');
  // Drop the collection
  mongoose.connection.db.dropDatabase();
  done();
});