'use strict'

const mongodb = require('mongodb');
const uri = "mongodb://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST+":"+process.env.DB_PORT+"/"+process.env.DB;
const key = process.env.AKEY;
const id = process.env.AID;
const https = require('https');


module.exports = (query) => {
  return new Promise( (resolve, reject) => {
    let url = 'https://www.googleapis.com/customsearch/v1?key='+ key +'&cx=' + id +'&q='+query;
    
    https.get(url, function  (response) {
    response.setEncoding('utf8');
    
      let rawData = '';
    
      response.on("data", function (chunk) { rawData += chunk });  //console.log('chunk:'+chunk)    
    
      response.on("end", function () { 
        let data = JSON.parse(rawData);
        console.log(data.items);
        resolve(data.items);
        
      });
    }).on('error', (err) => {reject(err)});
  
    /*mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) return reject(err);
      
      let searches = db.collection('searches');
    });*/
    
  });
}