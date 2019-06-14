const producerLoader = require('./producerLoader');

module.exports = function(server) {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
        socket.on('data', (data) => {
            producerLoader.then((fn) => {
                fn.publish(data);
            });
        });
    });

    return io;
}