const express = require('express')
const app = express()
var crypto = require('crypto');
var fs = require('fs');
const path = require('path');

const port = 3000
var bodyParser = require('body-parser')


// create application/json parser
var jsonParser = bodyParser.json()

var CLPUBKEY = fs.readFileSync(path.join(__dirname,
                          'clientpublic.crt'), 'utf8');

var SRPRIVKEY = fs.readFileSync(path.join(__dirname,
                          'serverprivate.key'), 'utf8');

app.post('/', jsonParser, (req, res) => {
  let encreqdata = req.body.encryptedrequest;

  console.log("Encrypted Request Data....");
	console.log(encreqdata);

  let msg = crypto.publicDecrypt(CLPUBKEY,
              Buffer.from(encreqdata, 'base64')).toString();

	console.log("Decrypted Request data....");
	console.log(msg)

	let response = "Ola Amigos!!!";

	console.log("Actual Response....")
	console.log(response);

  let encresdata = crypto.privateEncrypt(SRPRIVKEY,
               Buffer.from(response, 'utf8')).toString('base64');

	console.log("Encrypted Response....");
	console.log(encresdata);
  
  res.end(encresdata)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
