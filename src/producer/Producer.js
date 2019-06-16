export class Producer {
    constructor(channel) {
        this.channel = channel;
    }

    publish(message) {
        this.channel.sendToQueue(Buffer.from(message));
    }
}
