import { Connection } from "../src/Connection";

describe('connection', () => {
    let conn;

    beforeEach(() => {
        const url = 'amqp://localhost';
        jest.mock('../src/Protocol');
        const {AMQP} = require('../src/Protocol');
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

    test('channelBindQueue_BindQueueInChannel_ReturnQueueName', async () => {
        // Arrange
        const channel = jest.fn().mockImplementation(() => {
            return {
                bindQueue: function(qNm, exchange, pattern) {
                    return Promise.resolve(qNm);
                }
            };
        })();
        const ex = 'exchange';
        const queueName = 'q';
        // Act
        const assert = await conn.channelBindQueue(channel, ex, queueName);
        // Assert
        expect(assert).toBe('q');
    });
});