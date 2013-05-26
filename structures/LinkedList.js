var Class = require('uberclass');

module.exports = {
    Node: Class.extend({
        init: function (key, value) {
            this.key = key;
            this.value = value;
            this.next = null;
            this.prev = null;
        },

        detach: function () {
            this.next = null;
            this.prev = null;
            return this;
        }
    }),

    List: Class.extend({
        init: function () {
            this.length = 0;
            this.front = null;
            this.back = null;
        },

        // view front
        peek: function () {
            return this.front;
        },

        // view back
        check: function () {
            return this.back;
        },

        // add to back
        push: function (node) {
            node.detach();
            if (this.back) {
                this.back.next = node;
                node.prev = this.back;
                this.back = node;
            } else {
                this.front = node;
                this.back = node;
            }
            this.length++;
            return node;
        },

        // remove from back
        pop: function () {
            if (this.back) {
                var node = this.back;
                this.length--;
                this.back = this.back.prev;
                this.back.next = null;
                return node.detach();
            } else {
                return null;
            }
        },

        // add to front
        unshift: function (node) {
            node.detach();
            if (this.front) {
                this.front.prev = node;
                node.next = this.front;
                this.front = node;
            } else {
                this.front = node;
                this.back = node;
            }
            this.length++;
            return node;
        },

        // remove from front
        shift: function () {
            if (this.front) {
                var node = this.front;
                this.length--;
                this.front = this.front.next;
                this.front.prev = null;
                return node.detach();
            } else {
                return null;
            }
        },

        find: function (key) {
            var node = this.front;
            while (node && node.key !== key)
                node = node.next;
            return node;
        },

        toArray: function () {
            var arr = new Array(this.length),
                node = this.front,
                i = 0;
            while (node) {
                arr[i++] = node.value;
                node = node.next;
            }
            return arr;
        },

        toObject: function () {
            var obj = { },
                node = this.front;
            while (node) {
                obj[node.key] = node.value;
                node = node.next;
            }
            return obj;
        }
    })
};
