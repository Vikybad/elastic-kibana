const express = require('express') // Framework
const server = express()
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const routes = require('./routes')




server.use('/internalRoute', routes)


server.get('/old', (req, res) => {
    console.log(`/old`)
    res.send('Done')
})


// server.listen(3000, () => {
//     console.log(`Server is running on http://localhost:3000`)
// })




if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < 50; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died, spawning new fork`);
        if(signal == 'SIGKILL') cluster.fork()
    });
} else {

    // Workers can share any TCP connection
    // In this case it is an HTTP server

    server.listen(3000, () => {
        console.log(`Server is running on http://localhost:3000`)
    })

    console.log(`Worker ${process.pid} started`);
}

