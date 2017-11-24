'use strict'

const mongodb = require('mongodb');
const uri = "mongodb://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST+":"+process.env.DB_PORT+"/"+process.env.DB;
const key = process.env.AKEY;
const id = process.env.AID;
const https = require('https');


module.exports = (query, offset) => {
  let time = new Date().toISOString();
  let latest = { term: query, when: time };
  
  return new Promise( (resolve, reject) => {
    let start = (offset) ? offset : 1;
    
    let url = 'https://www.googleapis.com/customsearch/v1?key='+ key +'&cx=' + id +'&searchType=image' +'&q='+query+'&start=' + start;
    
    https.get(url, function  (response) {
    response.setEncoding('utf8');
    
      let rawData = '';
    
      response.on("data", function (chunk) { rawData += chunk });   
    
      response.on("end", function () { 
        let data = JSON.parse(rawData);
        
        let items = data.items;
        let results = items.map( i => ({
         url: i.link,
         alt: i.snippet,
         pageUrl: i.image.contextLink
      }));
        resolve(JSON.stringify(results));
        
      });
    }).on('error', (err) => {reject(err)});
  
    mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) return reject(err);
      
      const searches = db.collection('searches');
      
      searches.insert(latest, function (err, data) {
            if (err) { throw err }
      });
      db.close();
    });
    
  });
}