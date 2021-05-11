"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.injectL2Context = void 0;
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
/**
 * Helper for adding additional L2 context to transactions
 */
var injectL2Context = function (l1Provider) {
    var provider = cloneDeep_1["default"](l1Provider);
    // Pass through the state root
    var blockFormat = provider.formatter.block.bind(provider.formatter);
    provider.formatter.block = function (block) {
        var b = blockFormat(block);
        b.stateRoot = block.stateRoot;
        return b;
    };
    // Pass through the state root and additional tx data
    var blockWithTransactions = provider.formatter.blockWithTransactions.bind(provider.formatter);
    provider.formatter.blockWithTransactions = function (block) {
        var b = blockWithTransactions(block);
        b.stateRoot = block.stateRoot;
        for (var i = 0; i < b.transactions.length; i++) {
            b.transactions[i].l1BlockNumber = block.transactions[i].l1BlockNumber;
            if (b.transactions[i].l1BlockNumber != null) {
                b.transactions[i].l1BlockNumber = parseInt(b.transactions[i].l1BlockNumber, 16);
            }
            b.transactions[i].l1TxOrigin = block.transactions[i].l1TxOrigin;
            b.transactions[i].txType = block.transactions[i].txType;
            b.transactions[i].queueOrigin = block.transactions[i].queueOrigin;
        }
        return b;
    };
    // Handle additional tx data
    var formatTxResponse = provider.formatter.transactionResponse.bind(provider.formatter);
    provider.formatter.transactionResponse = function (transaction) {
        var tx = formatTxResponse(transaction);
        tx.txType = transaction.txType;
        tx.queueOrigin = transaction.queueOrigin;
        tx.rawTransaction = transaction.rawTransaction;
        tx.l1BlockNumber = transaction.l1BlockNumber;
        if (tx.l1BlockNumber != null) {
            tx.l1BlockNumber = parseInt(tx.l1BlockNumber, 16);
        }
        tx.l1TxOrigin = transaction.l1TxOrigin;
        return tx;
    };
    return provider;
};
exports.injectL2Context = injectL2Context;
