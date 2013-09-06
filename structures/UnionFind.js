var Class = require('uberclass');

module.exports = Class.extend({
    init: function (n) {
        var id = new Array(n),
            size = new Array(n);
        for (var i = 0, length = id.length; i < length; i++) {
            id[i] = i;
            size[i] = 1;
        }
        this.id = id;
        this.size = size;
        this.count = n;
    },

    // find root while performing path compression
    find: function (i) {
        var id = this.id;
        while (i !== id[i]) {
            id[i] = id[id[i]];
            i = id[i];
        }
        return i;
    },

    connected: function (p, q) {
        return this.find(p) === this.find(q);
    },

    // quick union
    // merge the smaller tree into the bigger tree
    // (i.e. the bigger tree keeps the root)
    union: function (p, q) {
        var id = this.id,
            size = this.size,
            i = this.find(p),
            j = this.find(q);
        if (i === j) {
            return;
        } else if (size[i] < size[j]) {
            id[i] = j;
            size[j] += size[i];
            size[i] = 0;
            count--;
        } else {
            id[j] = i;
            size[i] += size[j];
            size[j] = 0;
            count--;
        }
    },

    toString: function () {
        return this.id.join(' ');
    }
});
