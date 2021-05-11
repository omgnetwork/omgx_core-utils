"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.getRandomHexString = exports.toVerifiedBytes = exports.encodeHex = exports.getLen = exports.padHexString = exports.toRpcHexString = exports.toHexString = exports.fromHexString = exports.isHexString = exports.add0x = exports.remove0x = void 0;
/* Imports: External */
var ethers_1 = require("ethers");
/**
 * Removes "0x" from start of a string if it exists.
 * @param str String to modify.
 * @returns the string without "0x".
 */
var remove0x = function (str) {
    if (str === undefined) {
        return str;
    }
    return str.startsWith('0x') ? str.slice(2) : str;
};
exports.remove0x = remove0x;
/**
 * Adds "0x" to the start of a string if necessary.
 * @param str String to modify.
 * @returns the string with "0x".
 */
var add0x = function (str) {
    if (str === undefined) {
        return str;
    }
    return str.startsWith('0x') ? str : '0x' + str;
};
exports.add0x = add0x;
/**
 * Returns whether or not the provided string is a hex string.
 * @param str The string to test.
 * @returns True if the provided string is a hex string, false otherwise.
 */
var isHexString = function (inp) {
    return typeof inp === 'string' && inp.startsWith('0x');
};
exports.isHexString = isHexString;
/**
 * Casts a hex string to a buffer.
 * @param inp Input to cast to a buffer.
 * @return Input cast as a buffer.
 */
var fromHexString = function (inp) {
    if (typeof inp === 'string' && inp.startsWith('0x')) {
        return Buffer.from(inp.slice(2), 'hex');
    }
    return Buffer.from(inp);
};
exports.fromHexString = fromHexString;
/**
 * Casts an input to a hex string.
 * @param inp Input to cast to a hex string.
 * @return Input cast as a hex string.
 */
var toHexString = function (inp) {
    if (typeof inp === 'number') {
        return ethers_1.BigNumber.from(inp).toHexString();
    }
    else {
        return '0x' + exports.fromHexString(inp).toString('hex');
    }
};
exports.toHexString = toHexString;
var toRpcHexString = function (n) {
    if (n === 0) {
        return '0x0';
    }
    else {
        return '0x' + exports.toHexString(n).slice(2).replace(/^0+/, '');
    }
};
exports.toRpcHexString = toRpcHexString;
var padHexString = function (str, length) {
    if (str.length === 2 + length * 2) {
        return str;
    }
    else {
        return '0x' + str.slice(2).padStart(length * 2, '0');
    }
};
exports.padHexString = padHexString;
var getLen = function (pos) { return (pos.end - pos.start) * 2; };
exports.getLen = getLen;
var encodeHex = function (val, len) {
    return exports.remove0x(ethers_1.BigNumber.from(val).toHexString()).padStart(len, '0');
};
exports.encodeHex = encodeHex;
var toVerifiedBytes = function (val, len) {
    val = exports.remove0x(val);
    if (val.length !== len) {
        throw new Error('Invalid length!');
    }
    return val;
};
exports.toVerifiedBytes = toVerifiedBytes;
/**
 * @param byteLength The length of the hex string in bytes
 * @returns a random hex string of the specified byteLength (string length will be byteLength*2)
 */
var getRandomHexString = function (byteLength) {
    return ('0x' +
        __spreadArray([], Array(byteLength * 2)).map(function () {
            return Math.floor(Math.random() * 16).toString(16);
        })
            .join(''));
};
exports.getRandomHexString = getRandomHexString;
