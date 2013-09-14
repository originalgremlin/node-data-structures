var Class = require('uberclass');

// http://en.wikipedia.org/wiki/Heap_(data_structure)
// abstract base class for heaps
var Heap = Class.extend({
    RESIZE_SCALE: 2,

    // efficiently create a heap out of given array of elements
    heapify: function (nodes, comparator) {
        var h = new this(comparator);
        h.heap = nodes;
        h.size = nodes.length;
        for (var i = Math.floor(h.size / 2); i >= 0; i--)
            h.siftDown(i);
        return h;
    },

    nodify: function (key, value) {
        return { key: key, value: value };
    }
},  {
    // create an empty heap
    init: function (comparator) {
        this.heap = [];
        this.size = 0;
        this.comparator = comparator || function (pVal, cVal) { return pVal <= cVal; };  // default to min-heap
    },

    getSize: function () {
        return this.size;
    },

    // apply a callback to all elements in the array
    // NOTE: does not necessarily walk the heap in heap order
    forEach: function (callback) {
        this.heap.forEach(callback);
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
    insert: function (key, value) {
        // resize heap
        var length = this.heap.length;
        if (this.size >= length)
            this.heap.length = (length > 0) ? (length * Heap.RESIZE_SCALE) : 1;
        // insert node
        this.heap[this.size] = Heap.nodify(key, value);
        this.size++;
        // restore the heap property
        this.siftUp(this.size - 1);
        return this;
    },

    // delete a node from the heap
    // WARNING: O(n) time (for find operation)
    remove: function (key) {
        for (var i = 0; i < this.size; i++) {
            if (this.heap[i].key === key) {
                return this.removeAt(i);
        return null;
    },

    removeAt: function (index) {
        // resize heap
        var length = this.heap.length;
        if (length >= this.size * Heap.RESIZE_SCALE * 2)
            this.heap.length = Math.ceil(length / Heap.RESIZE_SCALE);
        this.size--;
        // remove node
        var node = this.heap[index];
        this._swap(index, this.size);
        this.heap[this.size] = null;
        // restore the heap property
        this.siftDown(index);
        return node;
    },

    // view the root node
    peek: function () {
        return this.heap[0];
    },

    // removing the root node
    pop: function () {
        return this.removeAt(0);
    },

    // methods for maintaining the heap property
    // NOTE: these are specific to every heap type and must be overridden in concrete subclasses
    _swap: function (i1, i2) {
        var tmp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = tmp;
    },

    siftUp: function (index) {
        throw "AbstractMethodError";
    },

    siftDown: function (index) {
        throw "AbstractMethodError";
    }
});

module.exports = {
    // https://en.wikipedia.org/wiki/Binary_heap
    BinaryHeap: Heap.extend({
        siftUp: function (cIndex) {
            var pIndex = Math.floor(cIndex / 2);
            if (!this.comparator(this.heap[pIndex].value, this.heap[cIndex].value)) {
                this._swap(pIndex, cIndex);
                this.siftUp(pIndex);
            }
        },

        siftDown: function (pIndex) {
            var largest = pIndex,
                c1Index = pIndex * 2,
                c2Index = pIndex * 2 + 1;
            if (c1Index < this.size && !this.comparator(this.heap[largest].value, this.heap[c1Index].value))
                largest = c1Index;
            if (c2Index < this.size && !this.comparator(this.heap[largest].value, this.heap[c2Index].value))
                largest = c2Index;
            if (largest !== pIndex) {
                this._swap(pIndex, largest);
                this.siftDown(largest);
            }
        }
    })
};
