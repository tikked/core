import { ContextSchema } from '../src/domain/ContextSchema';
import { expect } from 'chai';
import { Attribute } from '../src/domain/Attribute';
import { Context } from '../src/domain/Context';
import { createAttribute, createId } from './Fixture';

describe('ContextSchema', () => {

    describe('contructor', () => {

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
                createAttribute()
            ];

            // Act
            const schema = new ContextSchema(attrs);

            // Assert (no error thrown)
        });

        it('should invalidate with two attributes with the same id', () => {
            // Arrange
            const id = createId();
            const attrs = [
                createAttribute(id, 1),
                createAttribute(id, 2)
            ];

            // Act
            expect(() => {
                const schema = new ContextSchema(attrs);
            })
            // Assert
            .to.throw(new RegExp(`id.*${id}`));
        });

        it('should invalidate with two attributes of the same weight', () => {
            // Arrange
            const weight = 1;
            const attrs = [
                createAttribute(createId(), 1),
                createAttribute(createId(), 1)
            ];

            // Act
            expect(() => {
                const schema = new ContextSchema(attrs);
            })
            // Assert
            .to.throw(new RegExp(`weight.*${weight}`));
        });
    });

    describe('filterContext', () => {
        const contextData1 = {key1: 'value1'};
        const contextData2 = {key2: 'value2'};
        const testData = [
            {text: 'empty context', value: new Context({})},
            {text: 'single-entry context', value: new Context({...contextData1})},
            {text: 'multi-entry context', value: new Context({...contextData1, ...contextData2})}
        ];

        describe('with no attributes', () => {
            const schema = new ContextSchema([]);
            testData.forEach(data => {
                it(`should return empty context on ${data.text}`, () => {
                    // Act
                    const res = schema.filterContext(data.value);

                    // Assert
                    expect(res.Keys).to.be.empty;
                });
            });
        });

        describe('with single attribute', () => {
            const schema = new ContextSchema([createAttribute('key1')]);
            testData.slice(0, 1).forEach(data => {
                it(`should return empty context on ${data.text}`, () => {
                    // Act
                    const res = schema.filterContext(data.value);

                    // Assert
                    expect(res.Keys).to.be.empty;
                });
            });
            testData.slice(1).forEach(data => {
                it(`should return stripped context on ${data.text}`, () => {
                    // Act
                    const res = schema.filterContext(data.value);

                    // Assert
                    expect(res.Keys).to.eql(['key1']);
                    expect(res.Keys.length).to.equal(1);
                });
            });
        });
    });

    //describe('getMostRelevant', () => {});
});
