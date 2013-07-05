var Class = require('uberclass');

// A simple class to manipulate real-valued matrices.
// https://en.wikipedia.org/wiki/Matrix_(mathematics)

// TODO: all sorts of bounds checks

var Matrix = Class.extend({
    rows: 0,
    cols: 0,
    matrix: null,

    init: function (rows, cols, values) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = (new Array(rows)).map(function () { return new Array(cols); });
        if (_.isArray(this.values)) this.set(values);
    },

    /*** properties ***/
    isSameSize: function (other) {
        return (this.rows === other.rows) && (this.cols === other.cols);
    },

    isSquare: function () {
        return (this.rows === this.cols);
    },

    isDiagonal: function () {
        // ensure all off-diagonal elements are 0
        // short-circuit failure if not square
        return this.isSquare() && this.test(function (matrix, m, n) {
            var elem = matrix[m][n];
            return (m === n) || (elem === 0);
        });
    },

    isUpperTriangular: function () {
        // ensure all elements below the diagonal are 0
        // short-circuit failure if not square
        return this.isSquare() && this.test(function (matrix, m, n) {
            var elem = matrix[m][n];
            return (m >= n) || (elem === 0);
        });
    },

    isLowerTriangular: function () {
        // ensure all elements above the diagonal are 0
        // short-circuit failure if not square
        return this.isSquare() && this.test(function (matrix, m, n) {
            var elem = matrix[m][n];
            return (m <= n) || (elem === 0);
        });
    },

    isIdentity: function () {
        // ensure all off-diagonal elements are 0 and on-diagonal elements are 1
        // short-circuit failure if not square
        return this.isSquare() && this.test(function (matrix, m, n) {
            var elem = matrix[m][n];
            return (m === n) ? (elem === 1) : (elem === 0);
        });
    },

    isEqual: function (other) {
        // compare matrices element-wise
        // short-circuit failure if sizes are different
        return this.isSameSize(other) && this.test(function (matrix, m, n, v) {
            return matrix[m][n] === v[m][n];
        }, other.matrix);
    },

    /*** derived properties ***/
    getDimensions: function () {
        return [this.rows, this.cols];
    },

    getMatrix: function () {
        return this.matrix;
    },

    getTranspose: function () {
        return (new Matrix(this.cols, this.rows)).map(function (matrix, m, n, v) {
            return v[n][m];
        }, this.matrix);
    },

    // XXX: unfinished
    getDeterminant: function () {
        return rv;
    },

    // XXX: unfinished
    getEigenvalues: function () {
        return rv;
    },

    /*** copy operations ***/
    // copy by value
    // TODO: This seems woefully inefficient. Does node have any concept of memcopy?
    set: function (values) {
        return this.map(function (matrix, m, n, v) {
            return v[m][n];
        }, values);
    },

    // return a matrix which is our exact copy
    clone: function () {
        return new Matrix(this.rows, this.cols, this.matrix);
    },

    /*** algebraic operations ***/
    // add two matrices
    add: function (other) {
        return this.map(function (matrix, m, n, o) {
            return matrix[m][n] + o[m][n];
        }, other.matrix);
    },

    // multiply two matrices
    // TODO: implement Strassen (or better)
    // XXX: unfinished.  the logic is okay but the parameters may be totally whacked.
    multiply: function (other) {
        if ((this.rows !== other.cols) && (this.cols === other.rows))
            throw "InvalidDimensionException";
        return (new Matrix(this.rows, other.rows)).map(function (matrix, m, n, a, b) {
            var sum = 0;
            for (var i = 0; i < matrix.rows; i++)
                sum += a[m][i] * b[i][n];
            return sum;
        }, this.matrix, other.matrix);
    },

    // add the same value to all elements
    shift: function (value) {
        return this.map(function (matrix, m, n, v) {
            return matrix[m][n] + v;
        }, value);
    },

    // multiply all elements by the same value
    scale: function (value) {
        return this.map(function (matrix, m, n, v) {
            return matrix[m][n] * v;
        }, value);
    },

    /*** utility functions ***/
    // apply some transform to each element
    map: function (transform) {
        var m, n, args = Array.prototype.slice.call(arguments, 1);
        for (m = 0; m < this.rows; m++)
            for (n = 0; n < this.cols; n++)
                this.matrix[m][n] = transform.apply(this, [this.matrix, m, n].concat(args));
        return this;
    },

    // check every element against a predicate function
    // return true is all pass the predicate, and false if any fail
    test: function (predicate) {
        var m, n, args = Array.prototype.slice.call(arguments, 1);
        for (m = 0; m < this.rows; m++)
            for (n = 0; n < this.cols; n++)
                if (!predicate.apply(this, [this.matrix, m, n].concat(args)))
                    return false;
        return true;
    }
});

module.exports = {
    Matrix: Matrix
};
