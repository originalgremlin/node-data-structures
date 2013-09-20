var Class = require('uberclass'),
    LinkedList = require('./LinkedList').List;

var Node = Class.extend({
    size: function (node) {
        return node === null ? 0 : node.count;
    }
}, {
    init: function (key, value) {
        this.key = key;
        this.value = value;
        this.left = null;
        this.right = null;
        this.count = 1;
    }
});

module.exports = Class.extend({
    init: function (compareTo) {
        this.root = null;
        this.compareTo = compareTo || function (a, b) { return (a < b) ? -1 : (a > b ? 1 : 0); };
    },

    put: function (key, value) {
        // recursive helper function
        var _put = function (node, key, value) {
            // add new node to the (empty) end of the tree
            if (node === null)
                return new Node(key, value);
            // search the tree for the proper place to insert or update
            var cmp = this.compareTo(key, node.key);
            if (cmp < 0)
                node.left = _put(node.left, key, value);
            else if (cmp > 0)
                node.right = _put(node.right, key, value);
            else
                node.value = value;
            }
            node.count = 1 + Node.size(node.left) + Node.size(node.right);
            return node;
        };
        // start insertion at the root
        this.root = _put(this.root, key, value;)
    },

    get: function (key) {
        var node = this.root;
        while (node !== null) {
            var cmp = this.compareTo(key, node.key);
            if (cmp < 0)
                node = node.left;
            else if (cmp > 0)
                node = node.right;
            else
                return node;
        }
        return undefined;
    },

    remove: function (key) {

    },

    size: function () {
        return Node.size(this.root);
    },

    keys: function () {
        var inorder = function (node, q) {
            if (node !== null) {
                inorder(node.left, q);
                q.push(node.key);
                inorder(node.right, q);
            }
        };
        var queue = new LinkedList();
        inorder(this.root, queue);
        return queue;
    }
});
