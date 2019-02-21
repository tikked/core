import { Attribute } from '../src/domain/Attribute';
import { createId, createName, createDescription } from './Fixture';
import { expect } from 'chai';

describe('Attribute', () => {
    describe('constructor', () => {
        it('should be implemented', () => {
            // Act
            const attr = new Attribute(createId(), createName(), createDescription(), 1);

            // Assert (should not throw)
        });
        [
            0,
            -1,
            31
        ].forEach(data => {
            it(`should throw given invalid weight ${data}`, () => {
                // Act
                expect(() => {
                    const attr = new Attribute(createId(), createName(), createDescription(), data);
                })
                    // Assert
                    .to.throw(new RegExp(`weight.*${data}`));
            });
        });
    });

    describe('Id', () => {
        it('returns id passed in constructor', () => {
            const id = createId();
            const attr = new Attribute(id, createName(), createDescription(), 1);
            expect(attr.Id).to.eql(id);
        });
    });

    describe('Name', () => {
        it('returns name passed in constructor', () => {
            const name = createName();
            const attr = new Attribute(createId(), name, createDescription(), 1);
            expect(attr.Name).to.eql(name);
        });
    });

    describe('Description', () => {
        it('returns description passed in constructor', () => {
            const description = createDescription();
            const attr = new Attribute(createId(), createName(), description, 1);
            expect(attr.Description).to.eql(description);
        });
    });

    describe('Weight', () => {
        it('returns weight passed in constructor', () => {
            const weight = 1;
            const attr = new Attribute(createId(), createName(), createDescription(), weight);
            expect(attr.Weight).to.eql(weight);
        });
    });
});
