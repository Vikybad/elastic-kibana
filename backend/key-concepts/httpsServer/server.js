const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, secure world!');
});

// Read SSL certificate files
const privateKey = fs.readFileSync('private.key', 'utf8');
const certificate = fs.readFileSync('csr.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

const PORT = 443;
httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});





// const https = require('node:https');

// const options = {
//     hostname: 'localhost:443',
//     port: 443,
//     path: '/',
//     method: 'GET',
// };

// const req = https.request(options, (res) => {
//     console.log('statusCode:', res.statusCode);
//     console.log('headers:', res.headers);

//     res.on('data', (d) => {
//         process.stdout.write(d);
//     });
// });

// req.on('error', (e) => {
//     console.error(e);
// });
// req.end();
