"use strict";
exports.__esModule = true;
exports.getRandomAddress = void 0;
/* Imports: External */
var ethers_1 = require("ethers");
/* Imports: Internal */
var hex_strings_1 = require("./hex-strings");
/* @returns a random Ethereum address as a string of 40 hex characters, normalized as a checksum address. */
var getRandomAddress = function () {
    return ethers_1.ethers.utils.getAddress(hex_strings_1.getRandomHexString(20));
};
exports.getRandomAddress = getRandomAddress;
