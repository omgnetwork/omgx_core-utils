"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Watcher = void 0;
/* External Imports */
var ethers_1 = require("ethers");
var Watcher = /** @class */ (function () {
    function Watcher(opts) {
        this.NUM_BLOCKS_TO_FETCH = 10000000;
        this.l1 = opts.l1;
        this.l2 = opts.l2;
    }
    Watcher.prototype.getMessageHashesFromL1Tx = function (l1TxHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getMessageHashesFromTx(this.l1, l1TxHash)];
            });
        });
    };
    Watcher.prototype.getMessageHashesFromL2Tx = function (l2TxHash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getMessageHashesFromTx(this.l2, l2TxHash)];
            });
        });
    };
    Watcher.prototype.getL1TransactionReceipt = function (l2ToL1MsgHash, pollForPending) {
        if (pollForPending === void 0) { pollForPending = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getTransactionReceipt(this.l2, l2ToL1MsgHash, pollForPending)];
            });
        });
    };
    Watcher.prototype.getL2TransactionReceipt = function (l1ToL2MsgHash, pollForPending) {
        if (pollForPending === void 0) { pollForPending = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getTransactionReceipt(this.l2, l1ToL2MsgHash, pollForPending)];
            });
        });
    };
    Watcher.prototype.getMessageHashesFromTx = function (layer, txHash) {
        return __awaiter(this, void 0, void 0, function () {
            var receipt, msgHashes, _i, _a, log, message;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, layer.provider.getTransactionReceipt(txHash)];
                    case 1:
                        receipt = _b.sent();
                        if (!receipt) {
                            return [2 /*return*/, []];
                        }
                        msgHashes = [];
                        for (_i = 0, _a = receipt.logs; _i < _a.length; _i++) {
                            log = _a[_i];
                            if (log.address === layer.messengerAddress &&
                                log.topics[0] === ethers_1.ethers.utils.id('SentMessage(bytes)')) {
                                message = ethers_1.ethers.utils.defaultAbiCoder.decode(['bytes'], log.data)[0];
                                msgHashes.push(ethers_1.ethers.utils.solidityKeccak256(['bytes'], [message]));
                            }
                        }
                        return [2 /*return*/, msgHashes];
                }
            });
        });
    };
    Watcher.prototype.getTransactionReceipt = function (layer, msgHash, pollForPending) {
        if (pollForPending === void 0) { pollForPending = true; }
        return __awaiter(this, void 0, void 0, function () {
            var blockNumber, startingBlock, filter, logs, matches;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, layer.provider.getBlockNumber()];
                    case 1:
                        blockNumber = _a.sent();
                        startingBlock = Math.max(blockNumber - this.NUM_BLOCKS_TO_FETCH, 0);
                        filter = {
                            address: layer.messengerAddress,
                            topics: [ethers_1.ethers.utils.id("RelayedMessage(bytes32)")],
                            fromBlock: startingBlock
                        };
                        return [4 /*yield*/, layer.provider.getLogs(filter)];
                    case 2:
                        logs = _a.sent();
                        matches = logs.filter(function (log) { return log.data === msgHash; });
                        // Message was relayed in the past
                        if (matches.length > 0) {
                            if (matches.length > 1) {
                                throw Error('Found multiple transactions relaying the same message hash.');
                            }
                            return [2 /*return*/, layer.provider.getTransactionReceipt(matches[0].transactionHash)];
                        }
                        if (!pollForPending) {
                            return [2 /*return*/, Promise.resolve(undefined)];
                        }
                        // Message has yet to be relayed, poll until it is found
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    layer.provider.on(filter, function (log) { return __awaiter(_this, void 0, void 0, function () {
                                        var txReceipt, e_1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(log.data === msgHash)) return [3 /*break*/, 4];
                                                    _a.label = 1;
                                                case 1:
                                                    _a.trys.push([1, 3, , 4]);
                                                    return [4 /*yield*/, layer.provider.getTransactionReceipt(log.transactionHash)];
                                                case 2:
                                                    txReceipt = _a.sent();
                                                    layer.provider.off(filter);
                                                    resolve(txReceipt);
                                                    return [3 /*break*/, 4];
                                                case 3:
                                                    e_1 = _a.sent();
                                                    reject(e_1);
                                                    return [3 /*break*/, 4];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    return Watcher;
}());
exports.Watcher = Watcher;
