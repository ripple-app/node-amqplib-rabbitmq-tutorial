import amqp from 'amqplib';

export class Protocol {
    
}

export class AMQP {
    constructor(url) {
        this._url = `amqp://${url}`;
    }
    connect() {
        return amqp.connect(this._url);
    }
}