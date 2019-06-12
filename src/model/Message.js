import mongoose from 'mongoose';

module.exports = mongoose.model('Message', new mongoose.Schema({
    message: {
        type: String
    }
}));