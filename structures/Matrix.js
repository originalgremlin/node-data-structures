var Class = require('uberclass');

// A simple class to manipulate real-valued matrices.
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

    isTransposeSameSize: function (other) {
        return (this.rows === other.cols) && (this.cols === other.rows);
    },

    isSquare: function () {
        return (this.rows === this.cols);
    },

    isDiagonal: function () {
        // short-circuit failure if not square
        if (!this.isSquare())
            return false;
        // make sure all off-diagonal elements are 0
        var m, n, elem;
        for (m = 0; m < other.rows; m++) {
            for (n = 0; n < other.cols; n++) {
                elem = this.matrix[m][n];
                if (m !== n && elem !== 0)
                    return false;
            }
        }
        return true;
    },

    isIdentity: function () {
        // short-circuit failure if not square
        if (!this.isSquare())
            return false;
        // make sure all off-diagonal elements are 0 and on-diagonal elements are 1
        var m, n, elem;
        for (m = 0; m < other.rows; m++) {
            for (n = 0; n < other.cols; n++) {
                elem = this.matrix[m][n];
                if ((m !== n && elem !== 0) || (m === n && elem !== 1))
                    return false;
            }
        }
        return true;
    },

    isEqual: function (other) {
        // short-circuit failure if sizes are different
        if (!this.isSameSize(other))
            return false;
        // if sizes are the same compare each matrix element-wise
        var m, n;
        for (m = 0; m < other.rows; m++)
            for (n = 0; n < other.cols; n++)
                if (this.matrix[m][n] !== other.matrix[m][n])
                    return false;
        return true;
    },

    /*** derived properties ***/
    getTranspose: function () {
        return this;
    },

    getDeterminant: function () {

    },

    getEigenvalues: function () {
        return this;
    },

    /*** copy operations ***/
    // TODO: does node have any concept of memcopy?
    set: function (values) {
        // copy by value
        var m, n;
        for (m = 0; m < this.rows; m++)
            for (n = 0; n < this.cols; n++)
                this.matrix[m][n] = values[m][n];
        return this;
    },

    // return a matrix which is our exact copy
    clone: function () {
        var rv = new Matrix(this.rows, this.cols),
            m, n;
        for (m = 0; m < this.rows; m++)
            for (n = 0; n < this.cols; n++)
                rv.matrix[m][n] = this.matrix[m][n];
        return rv;
    },

    /*** algebraic operations ***/
    // add two matrices
    add: function (other) {
        var m, n;
        for (m = 0; m < this.rows; m++)
            for (n = 0; n < this.cols; n++)
                this.matrix[m][n] += other.matrix[m][n];
        return this;
    },

    // multiply two matrices
    // TODO: implements Strassen (or better)
    multiply: function (other) {
        return this;
    },

    // add the same value to all elements
    shift: function (value) {
        var m, n;
        for (m = 0; m < this.rows; m++)
            for (n = 0; n < this.cols; n++)
                this.matrix[m][n] += value;
        return this;
    },

    // multiply all elements by the same value
    scale: function (value) {
        var m, n;
        for (m = 0; m < this.rows; m++)
            for (n = 0; n < this.cols; n++)
                this.matrix[m][n] *= value;
        return this;
    },

    /*** utility functions ***/
    // apply some transform to each element
    map: function (func, args) {
        var m, n;
        args = args || [];
        for (m = 0; m < this.rows; m++)
            for (n = 0; n < this.cols; n++)
                this.matrix[m][n] = func.apply(this, [this.matrix, m, n].concat(args));
        return this;
    },

    // check every element against a predicate function
    // return true is all pass the predicate, and false if any fail
    // XXX: unfinished
    test: function (func, args) {
        var m, n;
        args = args || [];
        for (m = 0; m < other.rows; m++)
            for (n = 0; n < other.cols; n++)
                this.matrix[m][n] = func.apply(this, [this.matrix, m, n].concat(args));
        return this;
    }
});

module.exports = {
    Matrix: Matrix
};
