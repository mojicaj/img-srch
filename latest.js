'use strict'

const mongodb = require('mongodb');
const uri = "mongodb://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST+":"+process.env.DB_PORT+"/"+process.env.DB;

module.exports = () => {
  
  return new Promise( (resolve, reject) => {
    
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) return reject(err);
      
      const searches = db.collection('searches');
      
      searches.find({},{_id: 0}).toArray(function (err, stored) {
        if (err) reject(err);
        resolve(stored);
      });
      
      db.close();
    });
  });
}