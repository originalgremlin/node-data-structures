var Class = require('uberclass');

// Symbol Table backed by an associative array.

module.exports = Class.extend({
    init: function () {
        this.st = { };
        this.size = 0;
    },

    // creates value, or overwrites old value with new value
    put: function (key, value) {
        this.st[key] = value;
        this.size++;
    },

    // returns undefined if key not present
    get: function (key) {
        return this.st[key];
    },

    remove: function (key) {
        var value = this.st[key];
        delete this.st[key];
        this.size--;
        return value;
    }

    contains: function (key) {
        return this.st.hasOwnProperty(key);
    },

    isEmpty: function () {
        return this.size === 0;
    },

    size: function () {
        return this.size;
    },

    keys: function () {
        var keys = [];
        for (key in this.st)
            keys.push(key);
        return keys;
    }
});

/*
min()
    smallest key
max()
    largest key
deleteMin()
    delete smallest key
deleteMax()
    delete largest key
floor(key)
    largest key less than or equal to key
ceiling(key)
    smallest key greater than or equal to key
rank(key)
    number of keys less than key
select(int k)
    key rank of k
size(low, high)
    number of keys in [low..high]
keys(low, high)
    keys [low..high] in sorted order
