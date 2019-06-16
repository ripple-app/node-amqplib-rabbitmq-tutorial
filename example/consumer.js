import { Consumer } from '../src/consumer/Consumer';
import { Channel } from '../src/Channel';
import { Connection } from '../src/Connection';
import { AMQP } from '../src/Protocol';

const amqp = new AMQP('node:node@192.168.122.129');
const connection = new Connection(amqp);
const channel = new Channel(connection, 'q');
const consumer = new Consumer(channel);

setTimeout(() => {
    consumer.consume((message) => {
        console.log(message);
    });
}, 1000);
