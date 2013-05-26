var assert = require('chai').assert,
    LinkedList = require('../structures/LinkedList'),
    Node = LinkedList.Node,
    List = LinkedList.List;

describe('Node', function () {
    var n = new Node('one', 1);
    it('is a Node object', function () {
        assert.instanceOf(n, Node);
    });
    it('has expected properties', function () {
        assert.propertyVal(n, 'key', 'one');
        assert.propertyVal(n, 'value', 1);
        assert.isNull(n.next);
        assert.isNull(n.prev);
    });
});

describe('LinkedList', function () {
    describe('#init()', function () {
        var ll = new List();
        it('is a List object', function () {
            assert.instanceOf(ll, List);
        });
        it('is empty', function () {
            assert.strictEqual(ll.length, 0);
            assert.isNull(ll.front);
            assert.isNull(ll.back);
        });
    });

    describe('#peek()', function () {
        describe('empty', function () {
            var ll = new List();

            var n = ll.peek();
            it('is null', function () {
                assert.isNull(n);
            });
        });

        describe('single push', function () {
            var ll = new List();
            ll.push(new Node('one', 1));

            var n = ll.peek();
            it('is a Node object', function () {
                assert.instanceOf(n, Node);
            });
            it('matches the expected value', function () {
                assert.propertyVal(n, 'key', 'one');
                assert.propertyVal(n, 'value', 1);
            });
        });

        describe('multiple push', function () {
            var ll = new List();
            ll.push(new Node('one', 1));
            ll.push(new Node('two', 2));
            ll.push(new Node('three', 3));

            var n = ll.peek();
            it('matches the expected value', function () {
                assert.propertyVal(n, 'key', 'one');
                assert.propertyVal(n, 'value', 1);
            });
        });

        describe('multiple push and pop', function () {
            var ll = new List();
            ll.push(new Node('one', 1));
            ll.push(new Node('two', 2));
            ll.push(new Node('three', 3));
            ll.pop();

            var n = ll.peek();
            it('matches the expected value', function () {
                assert.propertyVal(n, 'key', 'one');
                assert.propertyVal(n, 'value', 1);
            });
        });
    });

describe('#check()', function () {
    describe('empty', function () {
        var ll = new List();

        var n = ll.check();
        it('is null', function () {
            assert.isNull(n);
        });
    });

    describe('single push', function () {
        var ll = new List();
        ll.push(new Node('one', 1));

        var n = ll.check();
        it('is a Node object', function () {
            assert.instanceOf(n, Node);
        });
        it('matches the expected value', function () {
            assert.propertyVal(n, 'key', 'one');
            assert.propertyVal(n, 'value', 1);
        });
    });

    describe('multiple push', function () {
        var ll = new List();
        ll.push(new Node('one', 1));
        ll.push(new Node('two', 2));
        ll.push(new Node('three', 3));

        var n = ll.check();
        it('matches the expected value', function () {
            assert.propertyVal(n, 'key', 'three');
            assert.propertyVal(n, 'value', 3);
        });
    });

    describe('multiple push and pop', function () {
        var ll = new List();
        ll.push(new Node('one', 1));
        ll.push(new Node('two', 2));
        ll.push(new Node('three', 3));
        ll.pop();

        var n = ll.check();
        it('matches the expected value', function () {
            assert.propertyVal(n, 'key', 'two');
            assert.propertyVal(n, 'value', 2);
        });
    });
});
});
