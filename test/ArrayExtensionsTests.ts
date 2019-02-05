import { expect } from 'chai';
import '../src/utils/ArrayExtensions';

describe('getDuplicates', () => {
    it('return empty array on empty input', () => {
        expect([].duplicates()).to.eql([]);
    });
    it('return empty array on single value input', () => {
        expect([1].duplicates()).to.eql([]);
    });
    it('return empty array on non-duplicates input', () => {
        expect([1, 2].duplicates()).to.eql([]);
    });
    it('return single element on duplicate input', () => {
        expect([1, 1].duplicates()).to.eql([1]);
    });
    it('return single element on multi-duplicate input', () => {
        expect([1, 1, 1].duplicates()).to.eql([1]);
    });
    it('return single element on duplicate/non-duplicate input', () => {
        expect([1, 1, 2].duplicates()).to.eql([1]);
    });
});

describe('getUnique', () => {
    it('return empty array on empty input', () => {
        expect([].unique()).to.eql([]);
    });
    it('return input array on single value input', () => {
        expect([1].unique()).to.eql([1]);
    });
    it('return input array on non-duplicates input', () => {
        expect([1, 2].unique()).to.eql([1, 2]);
    });
    it('return single element on duplicate input', () => {
        expect([1, 1].unique()).to.eql([1]);
    });
    it('return single element on multi-duplicate input', () => {
        expect([1, 1, 1].unique()).to.eql([1]);
    });
    it('return unique elements on duplicate/non-duplicate input', () => {
        expect([1, 1, 2].unique()).to.eql([1, 2]);
    });
});