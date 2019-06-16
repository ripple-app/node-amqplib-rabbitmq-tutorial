import { Producer } from '../src/producer/Producer';
import { Channel } from '../src/Channel';
import { Connection } from '../src/Connection';
import { AMQP } from '../src/Protocol';

const amqp = new AMQP('node:node@192.168.122.129');
const connection = new Connection(amqp);
const channel = new Channel(connection, 'q');
const producer = new Producer(channel);

setTimeout(() => {
    setInterval(() => {
        producer.publish(JSON.stringify({ 'say': 'hi' }));
    }, 500);
}, 1000);
