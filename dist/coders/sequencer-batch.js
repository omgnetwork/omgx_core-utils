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
exports.sequencerBatch = exports.decodeAppendSequencerBatch = exports.encodeAppendSequencerBatch = void 0;
var common_1 = require("../common");
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
/**********************
 * Internal Functions *
 *********************/
var APPEND_SEQUENCER_BATCH_METHOD_ID = 'appendSequencerBatch()';
var appendSequencerBatch = function (OVM_CanonicalTransactionChain, batch) { return __awaiter(void 0, void 0, void 0, function () {
    var methodId, calldata;
    return __generator(this, function (_a) {
        methodId = utils_1.keccak256(Buffer.from(APPEND_SEQUENCER_BATCH_METHOD_ID)).slice(2, 10);
        calldata = exports.encodeAppendSequencerBatch(batch);
        return [2 /*return*/, OVM_CanonicalTransactionChain.signer.sendTransaction({
                to: OVM_CanonicalTransactionChain.address,
                data: '0x' + methodId + calldata
            })];
    });
}); };
var encodeAppendSequencerBatch = function (b) {
    var encodeShouldStartAtElement = common_1.encodeHex(b.shouldStartAtElement, 10);
    var encodedTotalElementsToAppend = common_1.encodeHex(b.totalElementsToAppend, 6);
    var encodedContextsHeader = common_1.encodeHex(b.contexts.length, 6);
    var encodedContexts = encodedContextsHeader +
        b.contexts.reduce(function (acc, cur) { return acc + encodeBatchContext(cur); }, '');
    var encodedTransactionData = b.transactions.reduce(function (acc, cur) {
        if (cur.length % 2 !== 0) {
            throw new Error('Unexpected uneven hex string value!');
        }
        var encodedTxDataHeader = common_1.remove0x(ethers_1.BigNumber.from(common_1.remove0x(cur).length / 2).toHexString()).padStart(6, '0');
        return acc + encodedTxDataHeader + common_1.remove0x(cur);
    }, '');
    return (encodeShouldStartAtElement +
        encodedTotalElementsToAppend +
        encodedContexts +
        encodedTransactionData);
};
exports.encodeAppendSequencerBatch = encodeAppendSequencerBatch;
var encodeBatchContext = function (context) {
    return (common_1.encodeHex(context.numSequencedTransactions, 6) +
        common_1.encodeHex(context.numSubsequentQueueTransactions, 6) +
        common_1.encodeHex(context.timestamp, 10) +
        common_1.encodeHex(context.blockNumber, 10));
};
var decodeAppendSequencerBatch = function (b) {
    b = common_1.remove0x(b);
    var shouldStartAtElement = b.slice(0, 10);
    var totalElementsToAppend = b.slice(10, 16);
    var contextHeader = b.slice(16, 22);
    var contextCount = parseInt(contextHeader, 16);
    var offset = 22;
    var contexts = [];
    for (var i = 0; i < contextCount; i++) {
        var numSequencedTransactions = b.slice(offset, offset + 6);
        offset += 6;
        var numSubsequentQueueTransactions = b.slice(offset, offset + 6);
        offset += 6;
        var timestamp = b.slice(offset, offset + 10);
        offset += 10;
        var blockNumber = b.slice(offset, offset + 10);
        offset += 10;
        contexts.push({
            numSequencedTransactions: parseInt(numSequencedTransactions, 16),
            numSubsequentQueueTransactions: parseInt(numSubsequentQueueTransactions, 16),
            timestamp: parseInt(timestamp, 16),
            blockNumber: parseInt(blockNumber, 16)
        });
    }
    var transactions = [];
    for (var _i = 0, contexts_1 = contexts; _i < contexts_1.length; _i++) {
        var context = contexts_1[_i];
        for (var i = 0; i < context.numSequencedTransactions; i++) {
            var size = b.slice(offset, offset + 6);
            offset += 6;
            var raw = b.slice(offset, offset + parseInt(size, 16) * 2);
            transactions.push(common_1.add0x(raw));
            offset += raw.length;
        }
    }
    return {
        shouldStartAtElement: parseInt(shouldStartAtElement, 16),
        totalElementsToAppend: parseInt(totalElementsToAppend, 16),
        contexts: contexts,
        transactions: transactions
    };
};
exports.decodeAppendSequencerBatch = decodeAppendSequencerBatch;
exports.sequencerBatch = {
    encode: function (b) {
        return (ethers_1.ethers.utils.id(APPEND_SEQUENCER_BATCH_METHOD_ID).slice(0, 10) +
            exports.encodeAppendSequencerBatch(b));
    },
    decode: function (b) {
        b = common_1.remove0x(b);
        var functionSelector = b.slice(0, 8);
        if (functionSelector !==
            ethers_1.ethers.utils.id(APPEND_SEQUENCER_BATCH_METHOD_ID).slice(2, 10)) {
            throw new Error('Incorrect function signature');
        }
        return exports.decodeAppendSequencerBatch(b.slice(8));
    }
};
