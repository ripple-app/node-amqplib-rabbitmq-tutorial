import { Connection } from "../src/app2/Connection";

describe('connection', () => {
    let conn;

    beforeEach(() => {
        const url = 'amqp://localhost';
        jest.mock('../src/app2/Protocol');
        const {AMQP} = require('../src/app2/Protocol');
        AMQP.mockImplementation((_url) => {
            return {
                connect: () => {
                    return Promise.resolve('connection');
                }
            };
        })
        const amqp = new AMQP(url);
        conn = new Connection(amqp);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('constructor_GenerateInstace_ReturnConnectionInstance', () => {
        // Assert
        expect(conn).toBeDefined();
    });

    test('connect_ConnectToTarget_ReturnConnectionMock', async () => {
        // Arrange
        const url = 'amqp://localhost';
        // Act
        const connection = await conn.connect(url);
        // Assert
        expect(connection).toBe('connection');
    });

    test('createChannel_CreateChannel_ReturnChannelMock', async () => {
        // Arrange
        const connection = jest.fn().mockImplementation(() => {
            return {
                createChannel: () => {
                    return Promise.resolve('channel');
                }
            };
        })();
        // Act
        const channel = await conn.createChannel(connection);
        // Assert
        expect(channel).toBe('channel');
    });

    test('channelAssertQueue_AssertQueueInChannel_ReturnQueueName', async () => {
        // Arrange
        const channel = jest.fn().mockImplementation(() => {
            return {
                assertQueue: function(qNm) {
                    return Promise.resolve(qNm);
                }
            };
        })();
        const queueName = 'q';
        // Act
        const assert = await conn.channelAssertQueue(channel, queueName);
        // Assert
        expect(assert).toBe('q');
    });
});