import { Attribute } from "../src/domain/Attribute";
import { createId, createName, createDescription } from "./Fixture";
import { expect } from "chai";

describe('Attribute', () => {
    describe('constructor', () => {
        it('should be implemented', () => {
            // Act
            new Attribute(createId(), createName(), createDescription(), 1);

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
                    new Attribute(createId(), createName(), createDescription(), data);
                })
                    // Assert
                    .to.throw(new RegExp(`weight.*${data}`));
            });
        });
    });
});