'use strict'

const mongodb = require('mongodb');
const uri = "mongodb://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST+":"+process.env.DB_PORT+"/"+process.env.DB;
const key = process.env.AKEY;
const id = process.env.AID;
const https = require('https');

/*
let test = function (query) {
  //return { "yup": query }
  
  let url = 'https://www.googleapis.com/customsearch/v1?key='+ key +'&cx=' + id +'&q='+query;
  
    https.get(url, function  (response) {
      console.log('in');
    
    //response.setEncoding('utf8');
    let data = '';
    response.on("data", function (chunk) { console.log('chunkJ:'+chunk.items)
                                          data += chunk });
      //console.log(data);
    
    response.on("end", function () { resolve(data)});
    }).on('error', (err) => {console.log('rejected:' +err)});
}*/


//module.exports = test;

module.exports = (query) => {
  return new Promise( (resolve, reject) => {
    let url = 'https://www.googleapis.com/customsearch/v1?key='+ key +'&cx=' + id +'&q='+query;
    
    https.get(url, function  (response) {
      response.setEncoding('utf8');
    
      let data;
    
      response.on("data", function (chunk) { data = chunk });  //console.log('chunk:'+chunk)
      //console.log("data: "+data);
    
    
      response.on("end", function () { console.log('end:');
                                                 resolve(data) });
    }).on('error', (err) => {console.log('rejected:' +err)});
  
    /*mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) return reject(err);
      
      let searches = db.collection('searches');
    });*/
    
  });
}