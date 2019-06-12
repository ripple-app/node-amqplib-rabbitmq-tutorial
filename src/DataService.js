import mongoose from 'mongoose';
import Message from './model/Message';

class DataService {
    constructor() {
        const mongo = {
            username: 'saturday',
            password: 'saturday',
            host: '192.168.137.1',
            port: '27017',
            dbname: 'saturday_store'
        };
        const mongoDB = `mongodb://${mongo.username}:${mongo.password}@${mongo.host}:${mongo.port}/${mongo.dbname}`;
        const mongoDBOptions = {
            useNewUrlParser: true
        };

        mongoose.connect(mongoDB, mongoDBOptions, (err) => {
            if (err) {
                throw new Error(err);
            }else {
                console.log('connect');
            }
        });
        mongoose.Promise = global.Promise;

        const conn = mongoose.connection;

        conn.on('error', (err) => {
            console.log(err);
        });

        conn.on('reconnect', (err) => {
            console.log(err);
        });
    }

    insert(message) {
        new Message({
            message: message
        }).save();
    }
}

export default new DataService();