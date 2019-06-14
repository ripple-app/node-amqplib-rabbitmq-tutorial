import { Channel } from '../src/app2/Channel';

describe('Channel', () => {
    let channel;

    beforeEach(() => {
        jest.mock('../src/app2/Connection');
        const {Connection} = require('../src/app2/Connection');
        Connection.mockImplementation((pt) => {
            return {
                connect: () => {
                    return Promise.resolve('conn');
                },
                createChannel: (conn) => {
                    return Promise.resolve({
                        sendToQueue: (q, buf) => {
                            console.log(buf);
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
});