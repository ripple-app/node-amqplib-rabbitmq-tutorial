import { AMQP } from "../src/Protocol";
const sinon = require('sinon');

describe('protocol', () => {
    afterEach(() => {
        sinon.restore();
    });

    test('constructor_GenerateInstance_ReturnInstance', () => {
        // Act
        const amqp = new AMQP('localhost');
        // Assert
        expect(amqp).toBeDefined();
    });

    test('connect_ConnectToRabbitMQ_ReturnConnection', () => {
        // Arrange
        const amqplib = require('amqplib');
        sinon.stub(amqplib, 'connect').callsFake(function(url) {
            return {
                url
            };
        });
        const amqp = new AMQP('localhost');
        // Act
        const conn = amqp.connect('localhost');
        // Assert
        expect(conn.url).toBe('amqp://localhost');
    });
});