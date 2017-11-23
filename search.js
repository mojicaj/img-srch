'use strict'

const mongodb = require('mongodb');
const uri = "mongodb://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST+":"+process.env.DB_PORT+"/"+process.env.DB;
const key = process.env.AKEY;
const id = process.env.AID;
const http = require('http');


let test = function (query) {
  //return { "yup": query }
  
  let url = 'http://www.googleapis.com/customsearch/v1?key='+ key +'&cx=' + id +'&q='+query;
    
    http.get(url, function  (response) {
      console.log('in');
      console.log(response);
      response.on("error", function (err) {
        console.log('error:'+err);
      });
    
    response.setEncoding('utf8');
    let data;
    response.on("data", function (chunk) { console.log('chunk:'+chunk)
                                          data = chunk });
      //console.log(data);
    
    response.on("end", function () { console.log('end:')});
    }).on('error', (err) => {console.log('rejected:' +err)});
}


module.exports = test;

/*module.exports = (query) => {
  return new Promise( (resolve, reject) => {
    let url = 'https://www.googleapis.com/customsearch/v1?key='+ key +'&cx=' + id +'&q='+query;
    
    http.get(url, function  (response) {
      console.log(url)
      console.log('in');
      console.log(response);
      response.on("error", function (err) {
        console.log('error:'+err);
        return reject(err);
      });
    
    //response.setEncoding('utf8');
    let data;
    response.on("data", function (chunk) { console.log('chunk:'+chunk)
                                          data = chunk });
      //console.log(data);
    
    response.on("end", function () { console.log('end:');
                                                 resolve({ data }) });
    });
  
    /*mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) return reject(err);
      
      let searches = db.collection('searches');
    });
    
  })
}*/