interface Array<T> {
    duplicates(): T[];
    unique(): T[];
    max(extractor: (elem: T) => number): T;
    equals(other: T[]): boolean;
}

Array.prototype.duplicates = function() {
    return this.filter((elem, i) => this.indexOf(elem) !== i).unique();
};

Array.prototype.unique = function() {
    return Array.from(new Set(this));
};

Array.prototype.max = function(extractor: (elem) => number) {
    if (this.length === 0) {
        throw new Error('Unable to get max value of empty array');
    }
    return this.reduce((acc, cur) => extractor(cur) > extractor(acc) ? cur : acc, this[0]);
};

// https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript/14853974
Array.prototype.equals = function (array) {
    if (!array) {
        return false;
    }

    if (this.length !== array.length) {
        return false;
    }

    const l = this.length;
    for (let i = 0; i < l; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].equals(array[i])) {
                return false;
            }
        }
        else if (this[i] !== array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};
// Hide method from for-in loops
Object.defineProperty(Array.prototype, 'equals', {enumerable: false});
