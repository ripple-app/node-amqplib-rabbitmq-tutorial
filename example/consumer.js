import { Consumer } from '../src/consumer/Consumer';
import { Channel } from '../src/Channel';
import { Connection } from '../src/Connection';
import { AMQP } from '../src/Protocol';
import config from './config.json';

const amqp = new AMQP(`${config.user}:${config.password}@${config.host}:${config.port}`);
const connection = new Connection(amqp);
const channel = new Channel(connection, 'q');
const consumer = new Consumer(channel);

setTimeout(() => {
    consumer.consume((message) => {
        console.log(message);
    });
}, 1000);
