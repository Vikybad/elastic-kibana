const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Home Page');
    }
    else if (req.url === '/slow-page') {
        // Simulate a slow operation
        for (let i = 0; i < 6000000000; i++) { } // Busy wait
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Slow Page');
    }
    else if (req.url === '/read-file') {
        console.log('Attempting to read file...');
        // Non-blocking file read
        const fileStream = fs.createReadStream('large-file.txt');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        
        fileStream.on('open', () => {
            console.log('File opened successfully');
        });

        fileStream.on('data', (chunk) => {
            console.log(`Received ${chunk.length} bytes of data.`);
        });

        fileStream.on('end', () => {
            console.log('Finished reading file');
            res.end();
        });

        fileStream.on('error', (err) => {
            console.error('Error reading file:', err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });

        fileStream.pipe(res);

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(8000, () => console.log('Server running on port 8000'));