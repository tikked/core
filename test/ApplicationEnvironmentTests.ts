import { ApplicationEnvironment } from "../src/domain/ApplicationEnvironment";
import { FeatureFlag } from "../src/domain/FeatureFlag";
import { ContextSchema } from "../src/domain/ContextSchema";
import { expect } from "chai";

describe('ApplicationEnvironment contructor', () => {
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
            new FeatureFlag(defaultId, defaultName, defaultDescription)
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
            new FeatureFlag(defaultId, defaultName, defaultDescription),
            new FeatureFlag(defaultId, defaultName, defaultDescription)
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
});