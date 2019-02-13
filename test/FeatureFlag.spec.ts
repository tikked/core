import { expect } from 'chai';
import { FeatureFlag } from '../src/domain/FeatureFlag';

describe('FeatureFlag', () => {

    describe('contructor', () => {
        const defaultId = 'some_id';
        const defaultName = 'some_name';
        const defaultDescription = 'some_desc';

        it('should store provided arguments', () => {
            // Act
            const featureFlag = new FeatureFlag(
                defaultId,
                defaultName,
                defaultDescription);

            // Assert
            expect(featureFlag.Id).to.equal(defaultId);
            expect(featureFlag.Name).to.equal(defaultName);
            expect(featureFlag.Description).to.equal(defaultDescription);
        });
    });
});
