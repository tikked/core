import { expect } from 'chai';
import { Context } from '../src/domain/Context';

describe('Context', () => {

    describe('constructor', () => {

        it('should be implemented', () => {
            // Arrange
            const input = {};

            // Act
            const context = new Context(input);

            // Assert (should not throw)
        });

        it('should store input data', () => {
            // Arrange
            const expectedKey = 'key';
            const expectedValue = 'value';
            const input = {
                [expectedKey]: expectedValue
            };

            // Act
            const context = new Context(input);

            // Assert
            expect(context.get(expectedKey)).to.equal(expectedValue);
        });

        it('should create copy of featureFlags argument', () => {
            // Arrange
            const expectedKey = 'key';
            const expectedValue = 'value';
            const input = {
                [expectedKey]: expectedValue
            };

            // Act
            const context = new Context(input);
            input[expectedKey] = '';

            // Assert
            expect(context.get(expectedKey)).to.equal(expectedValue);
        });
    });

});
