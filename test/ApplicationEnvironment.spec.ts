import { expect } from 'chai';
import { ApplicationEnvironment } from '../src/domain/ApplicationEnvironment';
import { ContextSchema } from '../src/domain/ContextSchema';
import { createFeatureFlag } from './Fixture';

describe('ApplicationEnvironment', () => {

    describe('contructor', () => {
        const defaultId = 'some_id';
        const defaultName = 'some_name';
        const defaultDescription = 'some_desc';
        const defaultContextSchema = new ContextSchema([]);
        const defaultFeatureFlags = [];

        it('should be valid without any flags', () => {
            // Arrange
            const ffs = [];

            // Act
            const appEnv = new ApplicationEnvironment(
                defaultId,
                defaultName,
                defaultDescription,
                defaultContextSchema,
                ffs);

            // Assert (no error thrown)
        });

        it('should be valid a single valid flag', () => {
            // Arrange
            const ffs = [
                createFeatureFlag()
            ];

            // Act
            const appEnv = new ApplicationEnvironment(
                defaultId,
                defaultName,
                defaultDescription,
                defaultContextSchema,
                ffs);

            // Assert (no error thrown)
        });

        it('should be invalid with feature two flags with the same id', () => {
            // Arrange
            const ffs = [
                createFeatureFlag(defaultId),
                createFeatureFlag(defaultId)
            ];

            // Act
            expect(() => {
                const appEnv = new ApplicationEnvironment(
                    defaultId,
                    defaultName,
                    defaultDescription,
                    defaultContextSchema,
                    ffs);
            })
            // Assert
            .to.throw(defaultId);
        });

        it('should be invalid with empty string id', () => {
            // Arrange
            const id = '';

            // Act
            expect(() => {
                const appEnv = new ApplicationEnvironment(
                    id,
                    defaultName,
                    defaultDescription,
                    defaultContextSchema,
                    defaultFeatureFlags);
            })
            // Assert
            .to.throw('Id');
        });

        it('should store provided arguments', () => {
            // Act
            const appEnv = new ApplicationEnvironment(
                defaultId,
                defaultName,
                defaultDescription,
                defaultContextSchema,
                defaultFeatureFlags);

            // Assert
            expect(appEnv.Id).to.equal(defaultId);
            expect(appEnv.Name).to.equal(defaultName);
            expect(appEnv.Description).to.equal(defaultDescription);
            expect(appEnv.ContextSchema).to.equal(defaultContextSchema);
            expect(appEnv.FeatureFlags).to.eql(defaultFeatureFlags);
        });

        it('should create copy of featureFlags argument', () => {
            // Arrange
            const ffs = [
                createFeatureFlag()
            ];
            const expectedFfs = [...ffs];

            // Act
            const appEnv = new ApplicationEnvironment(
                defaultId,
                defaultName,
                defaultDescription,
                defaultContextSchema,
                ffs);
            ffs.push(createFeatureFlag());

            // Assert
            expect(appEnv.FeatureFlags).to.eql(expectedFfs);
        });
    });
});
