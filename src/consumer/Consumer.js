export class Consumer {
    constructor (channel) {
        this.channel = channel;
    }

    consume(cb) {
        this.channel.consume(cb);
    }
}
