"use strict";
exports.__esModule = true;
exports.assert = void 0;
var assert = function (condition, reason) {
    try {
        if (condition() === false) {
            throw new Error("Assertion failed: " + reason);
        }
    }
    catch (err) {
        throw new Error("Assertion failed: " + reason + "\n" + err);
    }
};
exports.assert = assert;
