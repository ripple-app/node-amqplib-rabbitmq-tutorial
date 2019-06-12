const producer = require('./src/producer')
.then((fn) => {
    setInterval(() => {
        fn.publish(JSON.stringify({'say': 'hi'}));
    }, 1000)
});
const consumer = require('./src/consumer');