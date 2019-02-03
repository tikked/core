interface Array<T> {
    duplicates(): T[];
    unique(): T[]
}

Array.prototype.duplicates = function() {
    return this.filter((elem, i) => this.indexOf(elem) !== i).unique();
}

Array.prototype.unique = function() {
    return Array.from(new Set(this));
}