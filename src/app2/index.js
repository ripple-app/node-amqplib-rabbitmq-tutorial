import {Producer} from './Producer';
import {Channel} from './Channel';
import {Connection} from './Connection';
import {AMQP} from './Protocol';

const amqp = new AMQP('node:node@192.168.137.1');
const connection = new Connection(amqp);
const channel = new Channel(connection, 'q');
const producer = new Producer(channel);

// setTimeout(() => {
//     setInterval(() => {
//         producer.publish(JSON.stringify({'say': 'hi'}));
//     }, 500);
// }, 1000);
