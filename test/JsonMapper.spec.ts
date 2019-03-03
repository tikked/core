import { JsonMapper } from '../src/coders/JsonCoder';
import {
    createId,
    createName,
    createDescription,
    createContextSchema,
    createFeatureFlag,
    createAttribute
} from './Fixture';
import { expect } from 'chai';
import { ApplicationEnvironment } from '../src/domain/ApplicationEnvironment';

describe('JsonMapper', () => {
    describe('decode', () => {
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
            const runDecoder = () => mapper.decode(JSON.stringify({
                id,
                name,
                description,
                contextSchema,
                featureFlags
            }));

            it('should decode to something', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res).to.be.not.undefined;
            });

            it('should store the application environment id', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.Id).to.be.equal(id);
            });

            it('should store the application environment name', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.Name).to.be.equal(name);
            });

            it('should store the application environment description', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.Description).to.be.equal(description);
            });

            it('should store the empty context schema', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.ContextSchema).to.be.not.undefined;
                expect(res.ContextSchema.Attributes).to.be.empty;
            });

            it('should store the empty feature flags', () => {
                // Act
                const res = runDecoder();

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

            it('throw when missing id', () => {
                // Act
                expect(() => {
                    const res = mapper.decode(JSON.stringify({
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
                    const res = mapper.decode(JSON.stringify({
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
                    const res = mapper.decode(JSON.stringify({
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
                    const res = mapper.decode(JSON.stringify({
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
                    const res = mapper.decode(JSON.stringify({
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
            const runDecoder = () => mapper.decode(JSON.stringify({
                id: createId(),
                name: createName(),
                description: createDescription(),
                contextSchema,
                featureFlags
            }));

            it('should map the feature flags', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.FeatureFlags).to.be.not.empty;
            });

            it('should map the id of the feature flag', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.FeatureFlags[0].Id).to.be.equal(id);
            });

            it('should map the name of the feature flag', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.FeatureFlags[0].Name).to.be.equal(name);
            });

            it('should map the description of the feature flag', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.FeatureFlags[0].Description).to.be.equal(description);
            });

            it('should map the toggles of the feature flag', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.FeatureFlags[0].Toggles).to.be.not.empty;
            });

            it('should map the toggles->isActive of the feature flag', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.FeatureFlags[0].Toggles[0].IsActive).to.be.equal(isActive);
            });

            it('should map the toggles->context of the feature flag', () => {
                // Act
                const res = runDecoder();

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
            const runDecoder = () => mapper.decode(JSON.stringify({
                id: createId(),
                name: createName(),
                description: createDescription(),
                contextSchema,
                featureFlags
            }));

            it('should map the attributes of the context schema', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.ContextSchema).to.be.not.undefined;
                expect(res.ContextSchema.Attributes).to.be.not.empty;
            });

            it('should store id of attribute in context schema', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.ContextSchema.Attributes[0].Id).to.be.equal(id);
            });

            it('should store name of attribute in context schema', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.ContextSchema.Attributes[0].Name).to.be.equal(name);
            });

            it('should store description of attribute in context schema', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.ContextSchema.Attributes[0].Description).to.be.equal(description);
            });

            it('should store weight of attribute in context schema', () => {
                // Act
                const res = runDecoder();

                // Assert
                expect(res.ContextSchema.Attributes[0].Weight).to.be.equal(weight);
            });
        });
    });
    describe('encode', () => {
        describe('with no feature flags and no attributes', () => {
            // Arrange
            const id = createId();
            const name = createName();
            const description = createDescription();
            const contextSchema = createContextSchema();
            const appEnv = new ApplicationEnvironment(
                id,
                name,
                description,
                contextSchema,
                []);
            const mapper = new JsonMapper();
            const runEncode = () => mapper.encode(appEnv);

            it('should encode something', () => {
                // Act
                const res = runEncode();

                // Assert
                expect(res).to.be.not.undefined;
            });

            it('should encode id', () => {
                // Act
                const res = runEncode();

                // Assert
                expect(res).to.contain(`"id":"${id}"`);
            });

            it('should encode name', () => {
                // Act
                const res = runEncode();

                // Assert
                expect(res).to.contain(`"name":"${name}"`);
            });

            it('should encode description', () => {
                // Act
                const res = runEncode();

                // Assert
                expect(res).to.contain(`"description":"${description}"`);
            });

            it('should encode contextSchema', () => {
                // Act
                const res = runEncode();

                // Assert
                expect(res).to.contain(`"contextSchema":{"attributes":[]}`);
            });

            it('should encode featureFlags', () => {
                // Act
                const res = runEncode();

                // Assert
                expect(res).to.contain(`"featureFlags":[]`);
            });
        });
    });
    describe('encode->decode mirror', () => {
        const mapper = new JsonMapper();
        [
            {
                text: 'with no feature flags and no attributes',
                value: new ApplicationEnvironment(
                    createId(),
                    createName(),
                    createDescription(),
                    createContextSchema([]),
                    [])
            }, {
                text: 'with single feature flag and single attribute',
                value: new ApplicationEnvironment(
                    createId(),
                    createName(),
                    createDescription(),
                    createContextSchema([createAttribute()]),
                    [createFeatureFlag()])
            }, {
                text: 'with multiple feature flags and multiple attributes',
                value: new ApplicationEnvironment(
                    createId(),
                    createName(),
                    createDescription(),
                    createContextSchema([createAttribute(), createAttribute()]),
                    [createFeatureFlag(), createFeatureFlag(), createFeatureFlag()])
            }
        ].forEach(data => {
            describe(data.text, () => {
                it('should mirror', () => {
                    // Arrange
                    const expected = data.value;

                    // Act
                    const encoded = mapper.encode(data.value);
                    const res = mapper.decode(encoded);

                    // Assert
                    expect(res).to.be.deep.equal(expected);
                });
            });
        });
    });
});
