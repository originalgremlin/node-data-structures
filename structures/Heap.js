var Class = require('uberclass');

// http://en.wikipedia.org/wiki/Heap_(data_structure)


// abstract base class for heaps
var Heap = Class.extend({
    INITIAL_SIZE: 64,
    RESIZE_SCALE: 2,

    nodify: function (key, value) {
        return { key: key, value: value };
    }
},  {
    // create an empty heap
    init: function (size, comparator) {
        this.heap = new Array(size || Heap.INITIAL_SIZE);
        this.size = 0;
        this.comparator = comparator || function (pVal, cVal) { return pVal <= cVal; };  // default to min-heap
    },

    // resize the underlying array
    _grow: function () {
        var oldlen = this.heap.length,
            newlen = oldlen * Heap.RESIZE_SCALE;
        this.length = this.heap.length = newlen;
    },

    _shrink: function () {
        var oldlen = this.heap.length,
            newlen = Math.ceil(oldlen / Heap.RESIZE_SCALE);
        if (newlen > this.size)
            this.length = this.heap.length = newlen;
        return this;
    },

    // apply a callback to all elements in the array
    // NOTE: does not necessarily walk the heap in heap order
    each: function (callback) {
        this.heap.forEach(callback);
        return this;
    },

    // create a heap out of given array of elements
    heapify: function (data) {
        this.data.forEach(this.insert);
        return this;
    },

    // joining two heaps to form a valid new heap containing all the elements of both
    merge: function (other) {
        this.other.each(this.insert);
        return this;
    },

    // return the highest-level node that matches the key
    find: function (key) {
        for (var i = 0; i < this.size; i++)
            if (this.heap[i].key === key)
                return this.heap[i];
        return null;
    },

    // add a new key to the heap
    // { key: 'key', value: 'value' }
    insert: function (node) {
        if (this.size >= this.length)
            this._grow();
        this.size++;
        this.heap[this.size] = node;
        this.siftUp(this.size);
        return this;
    },

    // remove an arbitrary node
    remove: function (key) {
        for (var i = 0; i < this.size; i++) {
            if (this.heap[i] === key) {
                var found = this.heap[i];
                this._swap(i, this.size);
                this.size--;
                this.sift(i);
                if (this.size < this.length / Heap.RESIZE_SCALE)
                    this._shrink();
                return found;
            }
        }
        return null;
    },

    // update a key with a new value
    update: function (node) {
        for (var i = 0; i < this.size; i++) {
            if (this.heap[i].key === key) {
                var found = this.heap[i];
                found.value = node.value;
                this.sift(i);
                return found;
            }
        }
        return null;
    },

    // view the root node
    peek: function () {
        return this.heap[0];
    },

    // removing the root node
    pop: function () {
        var node = this.heap[0];
        this._swap(0, this.size);
        this.size--;
        this.siftDown(0);
        if (this.size < this.length / Heap.RESIZE_SCALE)
            this._shrink();
        return node;
    },

    // methods for maintaining the heap property
    // NOTE: these are specific to every heap type and must be overridden in concrete subclasses
    _swap: function (i1, i2) {
        var tmp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = tmp;
        return this;
    },

    sift: function (index) {
        var pVal = this.heap[Math.floor(index / 2)].value,
            cVal = this.heap[index].value,
            methodName = this.comparator(pVal, cVal) ? 'siftDown' : 'siftUp';
        return this[methodName](index);
    },

    siftUp: function (index) {
        throw "AbstractMethodError";
    },

    siftDown: function (index) {
        throw "AbstractMethodError";
    }
});

module.exports = {
    BinaryHeap: Heap.extend({
        siftUp: function (index) {

        },

        siftDown: function (index) {

        }
    })
};
