let producer;

function publish(message) {
    if (!producer) {
        return ;
    }

    producer.publish(JSON.stringify(message))
        .catch((err) => {
            console.warn(err);
        });
}

module.exports = (async function () {
    producer = await require('./producer');
    return {
        publish
    };
})();