module.exports = (async function() {
    const connection = await require('amqplib').connect('amqp://node:node@192.168.137.1');
    const q = 'task';
    const ch = await connection.createChannel();
    
    return {
        publish: function(message) {
            ch.publish('exchange', q, Buffer.from(message));
        },
        close: function() {
            ch.close(() => {
                connection.close();
            });
        }
    };
})();