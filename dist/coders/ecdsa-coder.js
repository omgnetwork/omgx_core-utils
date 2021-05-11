"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ctcCoder = exports.CTC_TX_GAS_PRICE_MULT_FACTOR = exports.ETH_SIGN_TX_FIELD_POSITIONS = exports.EIP155_TX_FIELD_POSITIONS = exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS = exports.SIGNATURE_FIELD_POSITIONS = exports.TX_TYPE_POSITION = exports.txTypePlainText = exports.TxType = void 0;
/* Internal Imports */
var common_1 = require("../common");
/***********************
 * TxTypes and TxData  *
 **********************/
var TxType;
(function (TxType) {
    TxType[TxType["EIP155"] = 0] = "EIP155";
    TxType[TxType["EthSign"] = 1] = "EthSign";
})(TxType = exports.TxType || (exports.TxType = {}));
exports.txTypePlainText = {
    0: TxType.EIP155,
    1: TxType.EthSign,
    EIP155: TxType.EIP155,
    EthSign: TxType.EthSign
};
/***********************
 * Encoding Positions  *
 **********************/
/*
 * The positions in the tx data for the different transaction types
 */
exports.TX_TYPE_POSITION = { start: 0, end: 1 };
/*
 * The positions in the tx data for the EIP155TxData and EthSignTxData
 */
exports.SIGNATURE_FIELD_POSITIONS = {
    r: { start: 1, end: 33 },
    s: { start: 33, end: 65 },
    v: { start: 65, end: 66 }
};
exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS = {
    txType: exports.TX_TYPE_POSITION,
    sig: exports.SIGNATURE_FIELD_POSITIONS,
    gasLimit: { start: 66, end: 69 },
    gasPrice: { start: 69, end: 72 },
    nonce: { start: 72, end: 75 },
    target: { start: 75, end: 95 },
    data: { start: 95 }
};
exports.EIP155_TX_FIELD_POSITIONS = exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS;
exports.ETH_SIGN_TX_FIELD_POSITIONS = exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS;
exports.CTC_TX_GAS_PRICE_MULT_FACTOR = 1000000;
/***************
 * EcdsaCoders *
 **************/
var DefaultEcdsaTxCoder = /** @class */ (function () {
    function DefaultEcdsaTxCoder(txType) {
        this.txType = txType;
    }
    DefaultEcdsaTxCoder.prototype.encode = function (txData) {
        var txType = common_1.encodeHex(this.txType, common_1.getLen(exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS.txType));
        var r = common_1.toVerifiedBytes(txData.sig.r, common_1.getLen(exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS.sig.r));
        var s = common_1.toVerifiedBytes(txData.sig.s, common_1.getLen(exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS.sig.s));
        var v = common_1.encodeHex(txData.sig.v, common_1.getLen(exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS.sig.v));
        var gasLimit = common_1.encodeHex(txData.gasLimit, common_1.getLen(exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS.gasLimit));
        if (txData.gasPrice % exports.CTC_TX_GAS_PRICE_MULT_FACTOR !== 0) {
            throw new Error("Gas Price " + txData.gasPrice + " cannot be encoded");
        }
        var gasPrice = common_1.encodeHex(txData.gasPrice / exports.CTC_TX_GAS_PRICE_MULT_FACTOR, common_1.getLen(exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS.gasPrice));
        var nonce = common_1.encodeHex(txData.nonce, common_1.getLen(exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS.nonce));
        var target = common_1.toVerifiedBytes(txData.target, common_1.getLen(exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS.target));
        // Make sure that the data is even
        if (txData.data.length % 2 !== 0) {
            throw new Error('Non-even hex string for tx data!');
        }
        var encoding = '0x' +
            txType +
            r +
            s +
            v +
            gasLimit +
            gasPrice +
            nonce +
            target +
            common_1.remove0x(txData.data);
        return encoding;
    };
    DefaultEcdsaTxCoder.prototype.decode = function (txData) {
        txData = common_1.remove0x(txData);
        var sliceBytes = function (position) {
            return txData.slice(position.start * 2, position.end * 2);
        };
        var pos = exports.DEFAULT_ECDSA_TX_FIELD_POSITIONS;
        if (parseInt(sliceBytes(pos.txType), 16) !== this.txType) {
            throw new Error('Invalid tx type');
        }
        return {
            sig: {
                r: common_1.add0x(sliceBytes(pos.sig.r)),
                s: common_1.add0x(sliceBytes(pos.sig.s)),
                v: parseInt(sliceBytes(pos.sig.v), 16)
            },
            gasLimit: parseInt(sliceBytes(pos.gasLimit), 16),
            gasPrice: parseInt(sliceBytes(pos.gasPrice), 16) * exports.CTC_TX_GAS_PRICE_MULT_FACTOR,
            nonce: parseInt(sliceBytes(pos.nonce), 16),
            target: common_1.add0x(sliceBytes(pos.target)),
            data: common_1.add0x(txData.slice(pos.data.start * 2)),
            type: this.txType
        };
    };
    return DefaultEcdsaTxCoder;
}());
var EthSignTxCoder = /** @class */ (function (_super) {
    __extends(EthSignTxCoder, _super);
    function EthSignTxCoder() {
        return _super.call(this, TxType.EthSign) || this;
    }
    EthSignTxCoder.prototype.encode = function (txData) {
        return _super.prototype.encode.call(this, txData);
    };
    EthSignTxCoder.prototype.decode = function (txData) {
        return _super.prototype.decode.call(this, txData);
    };
    return EthSignTxCoder;
}(DefaultEcdsaTxCoder));
var Eip155TxCoder = /** @class */ (function (_super) {
    __extends(Eip155TxCoder, _super);
    function Eip155TxCoder() {
        return _super.call(this, TxType.EIP155) || this;
    }
    Eip155TxCoder.prototype.encode = function (txData) {
        return _super.prototype.encode.call(this, txData);
    };
    Eip155TxCoder.prototype.decode = function (txData) {
        return _super.prototype.decode.call(this, txData);
    };
    return Eip155TxCoder;
}(DefaultEcdsaTxCoder));
/*************
 * ctcCoder  *
 ************/
function encode(data) {
    if (data.type === TxType.EIP155) {
        return new Eip155TxCoder().encode(data);
    }
    if (data.type === TxType.EthSign) {
        return new EthSignTxCoder().encode(data);
    }
    return null;
}
function decode(data) {
    if (Buffer.isBuffer(data)) {
        data = data.toString();
    }
    data = common_1.remove0x(data);
    var type = parseInt(data.slice(0, 2), 16);
    if (type === TxType.EIP155) {
        return new Eip155TxCoder().decode(data);
    }
    if (type === TxType.EthSign) {
        return new EthSignTxCoder().decode(data);
    }
    return null;
}
/*
 * Encoding and decoding functions for all txData types.
 */
exports.ctcCoder = {
    eip155TxData: new Eip155TxCoder(),
    ethSignTxData: new EthSignTxCoder(),
    encode: encode,
    decode: decode
};
