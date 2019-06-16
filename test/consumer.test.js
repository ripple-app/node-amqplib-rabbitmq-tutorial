import { Consumer } from "../src/consumer/Consumer";

describe('consumer', () => {
    let consumer;

    beforeEach(() => {
        jest.mock('../src/Channel');
        const { Channel } = require('../src/Channel');
        Channel.mockImplementation(() => {
            return {
                consume: function(callback) {
                    callback();
                }
            };
        });
        const channel = new Channel();
        consumer = new Consumer(channel);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('constructor_GenerateInstace_ReturnInstance', () => {
        // Assert
        expect(consumer).toBeDefined();
    });

    test('consume_ConsumeMessageInMessageQueue_BindEvent', () => {
        // Arrange
        const cb = jest.fn(() => {});
        // Act
        consumer.consume(cb);
        // Assert
        expect(cb).toHaveBeenCalled();
    });
});