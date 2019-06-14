export class Connection {
    constructor(protocol) {
        this.protocol = protocol;
    }

    connect() {
        return this.protocol.connect();
    }

    createChannel(connection) {
        return connection.createChannel();
    }

    channelAssertQueue(channel, queueName) {
        return channel.assertQueue(queueName);
    }
}