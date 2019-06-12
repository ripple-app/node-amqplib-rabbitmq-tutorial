let ch;
const q = 'task';
const exchange = 'exchange';
const config = require('./config/config.json');

async function connect() {
    return await require('amqplib').connect(`amqp://${config.user}:${config.pwd}@${config.host}${config.port}`);
}

async function channel() {
    const conn = await connect();
    return await conn.createChannel();
}

function getChannel() {
    return ch;
}

module.exports = (async function() {
    ch = await channel().catch((err) => {
        throw new Error(err);
    });
    
    return {
        q,
        exchange,
        getChannel
    };
})();