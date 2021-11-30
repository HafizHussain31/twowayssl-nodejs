var crypto = require('crypto');
var fs = require('fs');
const path = require('path');
const axios = require('axios');


var CLPRIVKEY = fs.readFileSync(path.join(__dirname,
                          'clientprivate.key'), 'utf8');

var SRPUBKEY = fs.readFileSync(path.join(__dirname,
                          'serverpublic.crt'), 'utf8');

let actualdata = "Hey There!!!!";

console.log("Actual Request data....");
console.log(actualdata);

let encmsg = crypto.privateEncrypt(CLPRIVKEY,
               Buffer.from(actualdata, 'utf8')).toString('base64');

console.log("Encrpted Request Data....");
console.log(encmsg);

 axios
  .post('http://localhost:3000/', {
    encryptedrequest : encmsg
  })
  .then(res => {
    	console.log("Encrypted Response....");
	console.log(res.data);
	

	let decresdata = crypto.publicDecrypt(SRPUBKEY,
              Buffer.from(res.data, 'base64')).toString();

	console.log("Decrypted Response....")
	console.log(decresdata);

  })
  .catch(error => {
    console.error(error)
  })

