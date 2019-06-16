import { Producer } from '../src/producer/Producer';

describe('Producer', () => {
    let producer;
    let channel;

    beforeEach(() => {
        jest.mock('../src/Channel');
        const {Channel} = require('../src/Channel');
        Channel.mockImplementation(() => {
            return {
                queue: [],
                sendToQueue: function(buffer) {
                    this.queue.push(buffer);
                }
            };
        });
        channel = new Channel();
        producer = new Producer(channel);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('constructor_GenerateInstance_ProducerInstanceIsDefined', () => {
        // Assert
        expect(producer).toBeDefined();
    });

    test('publish_ProducerCanPublishMessageToQueue_ReturnChannelMock', () => {
        // Arrange
        const message = JSON.stringify({'say': 'hi'});
        // Act
        producer.publish(message);
        // Assert
        expect(channel.queue[0].toString()).toBe(message);
    });
});