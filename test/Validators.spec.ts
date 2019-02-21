import { validateIsNotEmpty } from '../src/utils/Validators';
import { expect } from 'chai';

describe('validateIsNotEmpty', () => {
    describe('with invalid input', () => {
        [
            // tslint:disable-next-line:no-null-keyword
            { text: 'null', value: null },
            { text: 'undefined', value: undefined },
            { text: 'blank string', value: '' },
            { text: 'empty array', value: [] }
        ].forEach(data => {
            it(`should throw expection on ${data.text}`, () => {
                expect(() => {
                    validateIsNotEmpty(data.value);
                }).to.throw();
            });
        });

        it(`should throw expection with custom message`, () => {
            // Arrange
            const expectedMessage = 'some message';

            expect(() => {
                validateIsNotEmpty(undefined, expectedMessage);
            }).to.throw(expectedMessage);
        });
    });
    describe('with valid input', () => {
        [
            { text: 'short string', value: 'Hi' },
            { text: 'string with only 0', value: '0' },
            { text: 'long string', value: 'This is a longer string' }
        ].forEach(data => {
            it(`should not throw expection on ${data.text}`, () => {
                validateIsNotEmpty(data.value);
            });
        });
    });
});
