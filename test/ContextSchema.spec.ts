import { ContextSchema } from '../src/domain/ContextSchema';
import { expect } from 'chai';
import { Attribute } from '../src/domain/Attribute';

describe('ContextSchema', () => {

    describe('contructor', () => {
        const defaultId = 'some_id';
        const defaultName = 'some_name';
        const defaultDescription = 'some_desc';
        const defaultWeight = 1;

        it('should validate without any flags', () => {
            // Arrange
            const attrs = [];

            // Act
            const schema = new ContextSchema(attrs);

            // Assert (no error thrown)
        });

        it('should validate a single valid flag', () => {
            // Arrange
            const attrs = [
                new Attribute(defaultId, defaultName, defaultDescription, defaultWeight)
            ];

            // Act
            const schema = new ContextSchema(attrs);

            // Assert (no error thrown)
        });

        it('should invalidate with two attributes with the same id', () => {
            // Arrange
            const attrs = [
                new Attribute(defaultId, defaultName, defaultDescription, defaultWeight),
                new Attribute(defaultId, defaultName, defaultDescription, defaultWeight + 1)
            ];

            // Act
            expect(() => {
                const schema = new ContextSchema(attrs);
            })
            // Assert
            .to.throw(new RegExp(`id.*${defaultId}`));
        });

        it('should invalidate with two attributes of the same weight', () => {
            // Arrange
            const attrs = [
                new Attribute(defaultId, defaultName, defaultDescription, defaultWeight),
                new Attribute(defaultId + '2', defaultName, defaultDescription, defaultWeight)
            ];

            // Act
            expect(() => {
                const schema = new ContextSchema(attrs);
            })
            // Assert
            .to.throw(new RegExp(`weight.*${defaultWeight}`));
        });
    });

});
