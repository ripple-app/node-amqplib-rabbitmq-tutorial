import { Producer } from '../src/app2/Producer';
// import {Channel} from '../src/Channel';
/**
 * Queue에 메세지를 넣는다. (publish)
 */
describe('Producer', () => {
    let producer;
    let channel;

    beforeEach(() => {
        jest.mock('../src/app2/Channel');
        const {Channel} = require('../src/app2/Channel');
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
        expect(channel.queue[0]).toBe(message);
    });
});