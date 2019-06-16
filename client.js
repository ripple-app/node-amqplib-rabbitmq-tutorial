const io = require('socket.io-client');
const socket = io('ws://localhost:3001');

setInterval(() => {
    socket.emit('data', {
        timeslice: Date.now(),
        job: 'programmer',
        language: 'javascript',
        position: 'backend'
    });
}, 1000);
