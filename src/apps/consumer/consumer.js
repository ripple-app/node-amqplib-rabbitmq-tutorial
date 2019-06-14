const context = require('../../context');
// import DataService from './DataService';

module.exports = (async function () {
    const ctx = await context;
    const ch = ctx.getChannel();
    await ch.assertQueue(ctx.q);
    ch.bindQueue(ctx.q, ctx.exchange, ctx.q);
    ch.consume(ctx.q, (message) => {
        // console.log(message.content.toString());
        ch.ack(message);
    });
})();