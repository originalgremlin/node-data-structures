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
    },

    // find root while performing path compression
    _root: function (i) {
        var id = this.id;
        while (i !== id[i]) {
            id[i] = id[id[i]];
            i = id[i];
        }
        return i;
    },

    connected: function (p, q) {
        return this._root(p) === this._root(q);
    },

    // quick union
    // merge the smaller tree into the bigger tree
    // (i.e. the bigger tree keeps the root)
    union: function (p, q) {
        var id = this.id,
            size = this.size,
            i = this._root(p),
            j = this._root(q);
        if (size[i] < size[j]) {
            id[i] = j;
            size[j] += size[i];
            size[i] = 0;
        } else {
            id[j] = i;
            size[i] += size[j];
            size[j] = 0;
        }
    },

    toString: function () {
        return this.id.join(' ');
    }
});
