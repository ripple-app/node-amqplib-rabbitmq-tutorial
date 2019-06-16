import { Channel } from '../src/Channel';

describe('Channel', () => {
    let channel;

    beforeEach(() => {
        jest.mock('../src/Connection');
        const {Connection} = require('../src/Connection');
        Connection.mockImplementation((pt) => {
            return {
                connect: () => {
                    return Promise.resolve('conn');
                },
                createChannel: (conn) => {
                    return Promise.resolve({
                        sendToQueue: (q, buf) => {
                            console.log(buf);
                        },
                        consume: (q, fn) => {
                            fn({
                                content: JSON.stringify({'say': 'hi'})
                            });
                        },
                        ack: (m) => {

                        }
                    });
                },
                channelAssertQueue: () => {
                    return Promise.resolve('assert')
                }
            }
        })
        const connection = new Connection('protocol');
        channel = new Channel(connection, 'q');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('constrctor_GenerateInstance_ReturnChannelInstance', () => {
        // Assert
        expect(channel).toBeDefined();
        expect(channel.queueName).toBe('q');
    });

    test('sendToQueue_SendMessageToQueue_SpyHaveBeenCalled', () => {
        // Arrange
        const message = JSON.stringify({'say': 'hi'});
        const spy = jest.spyOn(console, 'log');
        // Act
        channel.sendToQueue(message);
        // Assert
        expect(spy).toHaveBeenCalled();
    });

    test('consume_ConsumeMessageInMessageQueue_BindQueueNameToCallbackFunction', () => {
        // Arrange
        const cb = jest.fn((msg) => {
            console.log(msg);
        });
        // Act
        channel.consume(cb);
        // Assert
        expect(cb).toHaveBeenCalled();
    });
});