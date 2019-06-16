import { Producer } from '../src/producer/Producer';
import { Channel } from '../src/Channel';
import { Connection } from '../src/Connection';
import { AMQP } from '../src/Protocol';
import config from './config.json';

const amqp = new AMQP(`${config.user}:${config.password}@${config.host}:${config.port}`);
const connection = new Connection(amqp);
const channel = new Channel(connection, 'q');
const producer = new Producer(channel);

setTimeout(() => {
    setInterval(() => {
        producer.publish(JSON.stringify({ 'say': 'hi' }));
    }, 500);
}, 1000);
