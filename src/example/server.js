const producerLoader = require('../src/producerLoader');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('../src/socket')(server);

server.listen(3001, (err) => {
    if (err) {
        throw new Error(err);
    }

    console.log(`Server is running port: ${3001}`);
});
