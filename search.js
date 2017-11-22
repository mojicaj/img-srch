'use strict'

const mongodb = require('mongodb');
const uri = "mongodb://"+process.env.USER+":"+process.env.PASS+"@"+process.env.HOST+":"+process.env.DB_PORT+"/"+process.env.DB;
const key = process.env.AKEY;
const id = process.env.AID;
const http = require('http');
let url = 'https://cse.google.com/cse.js??key=INSERT_YOUR_API_KEY&cxcx=' + id'

module.exports = (query) => {
  return new Promise( (resolve, reject) => {
    
    http.get()
    resolve({ query })
  
    /*mongodb.MongoClient.connect(uri, function(err, db) {
      if(err) return reject(err);
      
      let searches = db.collection('searches');
    });*/
    
  })
}


<script>
  (function() {
    var cx = '010504916402817372166:hpqokq_6zyy';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  })();
</script>
<gcse:search></gcse:search>