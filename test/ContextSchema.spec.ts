import { ContextSchema } from '../src/domain/ContextSchema';
import { expect } from 'chai';
import { Attribute } from '../src/domain/Attribute';

describe('ContextSchema', () => {

    describe('contructor', () => {
        const defaultId = 'some_id';
        const defaultName = 'some_name';
        const defaultDescription = 'some_desc';
        const defaultPriority = 1;

        it('should be valid without any flags', () => {
            // Arrange
            const attrs = [];

            // Act
            const schema = new ContextSchema(attrs);

            // Assert (no error thrown)
        });

        it('should be valid a single valid flag', () => {
            // Arrange
            const attrs = [
                new Attribute(defaultId, defaultName, defaultDescription, defaultPriority)
            ];

            // Act
            const schema = new ContextSchema(attrs);

            // Assert (no error thrown)
        });

        it('should be invalid with feature two flags with the same id', () => {
            // Arrange
            const attrs = [
                new Attribute(defaultId, defaultName, defaultDescription, defaultPriority),
                new Attribute(defaultId, defaultName, defaultDescription, defaultPriority)
            ];

            // Act
            expect(() => {
                const schema = new ContextSchema(attrs);
            })
            // Assert
            .to.throw(defaultId);
        });
    });

});
