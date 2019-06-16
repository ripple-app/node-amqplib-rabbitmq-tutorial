export class Channel {
    constructor(connection, queueName) {
        this.queueName = queueName;
        (async () => {
            const conn = await connection.connect();
            const ch = await connection.createChannel(conn);
            await connection.channelAssertQueue(ch, queueName);
            this.channel = ch;
        })();
    }

    sendToQueue(buffer) {
        this.channel.sendToQueue(this.queueName, buffer);
    }

    consume(cb) {
        this.channel.consume(this.queueName, (message) => {
            cb(message.content.toString());
            this.channel.ack(message);
        });
    }
}
