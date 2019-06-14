export class Channel {
    constructor(connection, queueName) {
        this.queueName = queueName;
        (async () => {
            const conn = await connection.connect();
            const ch = await connection.createChannel(conn);
            const assert = await connection.channelAssertQueue(ch, queueName);
            this.channel = ch;
        })();
    }

    sendToQueue(buffer) {
        if (this.channel) {
            this.channel.sendToQueue(this.queueName, buffer);
        }
    }
}