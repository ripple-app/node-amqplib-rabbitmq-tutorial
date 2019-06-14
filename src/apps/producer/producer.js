const context = require('../../context');

function getChannel() {
    return Context.getChannel();
}

module.exports = (async function() {
    const ctx = await context;
    const ch = ctx.getChannel();

    return {
        publish: async function(message) {
            if (!ch) {
                return Promise.reject(new Error('Channel is undefined'));
            }

            await ch.assertExchange(ctx.exchange);
            await ch.assertQueue(ctx.q);
            ch.publish(ctx.exchange, ctx.q, Buffer.from(message));
        },
        close: function() {
            ch.close(() => {
                connection.close();
            });
        }
    };
})();