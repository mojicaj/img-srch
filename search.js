'use strict'

const mongodb = require('mongodb');
const uri = "mongodb://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST+":"+process.env.DB_PORT+"/"+process.env.DB;
const key = process.env.AKEY;
const id = process.env.AID;
const http = require('http');
let url = 'https://cse.google.com/cse.js?key='+ key +'&cx=' + id +'&q=';

module.exports = (query) => {
  return new Promise( (resolve, reject) => {
    
    http.get(url+query, (response) => {
      response.on("error", function (err) {
        return reject(err);
      });
    
    response.setEncoding('utf8');
    var data = [];
    response.on("data", function (chunk) { data.push(chunk) });
    
    response.on("end", function () { data.forEach(function (res) { console.log(res) }) });
    })
    resolve({ query })
  
    /*mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) return reject(err);
      
      let searches = db.collection('searches');
    });*/
    
  })
}