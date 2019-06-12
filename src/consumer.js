import DataService from './DataService';

module.exports = (async function() {
    const q = 'task';
    const connection = await require('amqplib').connect('amqp://node:node@192.168.137.1');
    const ch = await connection.createChannel();
    await ch.assertQueue(q);
    ch.bindQueue(q, 'exchange', q);
    ch.consume(q, (message) => {
        DataService.insert(message.content.toString());
        ch.ack(message);
    });
})();