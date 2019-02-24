import { JsonMapper } from '../src/mappers/JsonMapper';
import { createId, createName, createDescription } from './Fixture';
import { expect } from 'chai';

describe('JsonMapper', () => {
    describe('map', () => {
        describe('with no feature flags and no attributes', () => {
            // Arrange
            const mapper = new JsonMapper();
            const id = createId();
            const name = createName();
            const description = createDescription();
            const contextSchema = {
                attributes: []
            };
            const featureFlags = [];
            const runMapper = () => mapper.map(JSON.stringify({
                id,
                name,
                description,
                contextSchema,
                featureFlags
            }));

            it('should map to something', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res).to.be.not.undefined;
            });

            it('should store the application environment id', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.Id).to.be.equal(id);
            });

            it('should store the application environment name', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.Name).to.be.equal(name);
            });

            it('should store the application environment description', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.Description).to.be.equal(description);
            });

            it('should store the empty context schema', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.ContextSchema).to.be.not.undefined;
                expect(res.ContextSchema.Attributes).to.be.empty;
            });

            it('should store the empty feature flags', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.FeatureFlags).to.be.empty;
            });
        });
        describe('with missing attributes', () => {
            // Arrange
            const mapper = new JsonMapper();
            const id = createId();
            const name = createName();
            const description = createDescription();
            const contextSchema = {
                attributes: []
            };
            const featureFlags = [];
            const runMapper = () => mapper.map(JSON.stringify({
                id,
                name,
                description,
                contextSchema,
                featureFlags
            }));

            it('throw when missing id', () => {
                // Act
                expect(() => {
                    const res = mapper.map(JSON.stringify({
                        name,
                        description,
                        contextSchema,
                        featureFlags
                    }));
                })
                    // Assert
                    .to.throw('id');
            });

            it('throw when missing name', () => {
                // Act
                expect(() => {
                    const res = mapper.map(JSON.stringify({
                        id,
                        description,
                        contextSchema,
                        featureFlags
                    }));
                })
                    // Assert
                    .to.throw('name');
            });

            it('throw when missing description', () => {
                // Act
                expect(() => {
                    const res = mapper.map(JSON.stringify({
                        id,
                        name,
                        contextSchema,
                        featureFlags
                    }));
                })
                    // Assert
                    .to.throw('description');
            });

            it('throw when missing context schema', () => {
                // Act
                expect(() => {
                    const res = mapper.map(JSON.stringify({
                        id,
                        name,
                        description,
                        featureFlags
                    }));
                })
                    // Assert
                    .to.throw('contextSchema');
            });

            it('throw when missing feature flags', () => {
                // Act
                expect(() => {
                    const res = mapper.map(JSON.stringify({
                        id,
                        name,
                        description,
                        contextSchema
                    }));
                })
                    // Assert
                    .to.throw('featureFlags');
            });
        });
        describe('with feature flags and no attributes', () => {
            // Arrange
            const mapper = new JsonMapper();
            const id = createId();
            const name = createName();
            const description = createDescription();
            const isActive = true;
            const context = {};
            const contextSchema = {
                attributes: []
            };
            const featureFlags = [
                {
                    id,
                    name,
                    description,
                    toggles: [
                        {
                            isActive,
                            context
                        }
                    ]
                }
            ];
            const runMapper = () => mapper.map(JSON.stringify({
                id: createId(),
                name: createName(),
                description: createDescription(),
                contextSchema,
                featureFlags
            }));

            it('should map the feature flags', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.FeatureFlags).to.be.not.empty;
            });

            it('should map the id of the feature flag', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.FeatureFlags[0].Id).to.be.equal(id);
            });

            it('should map the name of the feature flag', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.FeatureFlags[0].Name).to.be.equal(name);
            });

            it('should map the description of the feature flag', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.FeatureFlags[0].Description).to.be.equal(description);
            });

            it('should map the toggles of the feature flag', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.FeatureFlags[0].Toggles).to.be.not.empty;
            });

            it('should map the toggles->isActive of the feature flag', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.FeatureFlags[0].Toggles[0].IsActive).to.be.equal(isActive);
            });

            it('should map the toggles->context of the feature flag', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.FeatureFlags[0].Toggles[0].Context.Keys).to.be.empty;
            });
        });
        describe('with no feature flags and with attributes', () => {
            // Arrange
            const mapper = new JsonMapper();
            const id = createId();
            const name = createName();
            const description = createDescription();
            const weight = 1;
            const contextSchema = {
                attributes: [
                    {
                        id,
                        name,
                        description,
                        weight
                    }
                ]
            };
            const featureFlags = [];
            const runMapper = () => mapper.map(JSON.stringify({
                id: createId(),
                name: createName(),
                description: createDescription(),
                contextSchema,
                featureFlags
            }));

            it('should map the attributes of the context schema', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.ContextSchema).to.be.not.undefined;
                expect(res.ContextSchema.Attributes).to.be.not.empty;
            });

            it('should store id of attribute in context schema', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.ContextSchema.Attributes[0].Id).to.be.equal(id);
            });

            it('should store name of attribute in context schema', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.ContextSchema.Attributes[0].Name).to.be.equal(name);
            });

            it('should store description of attribute in context schema', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.ContextSchema.Attributes[0].Description).to.be.equal(description);
            });

            it('should store weight of attribute in context schema', () => {
                // Act
                const res = runMapper();

                // Assert
                expect(res.ContextSchema.Attributes[0].Weight).to.be.equal(weight);
            });
        });
    });
});
