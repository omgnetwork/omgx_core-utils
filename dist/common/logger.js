"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Logger = void 0;
var pino_1 = __importDefault(require("pino"));
/**
 * Temporary wrapper class to maintain earlier module interface.
 */
var Logger = /** @class */ (function () {
    function Logger(options) {
        this.options = options;
        var loggerOptions = {
            name: options.name,
            level: options.level || 'debug',
            // Remove pid and hostname considering production runs inside docker
            base: null
        };
        this.inner = options.destination
            ? pino_1["default"](loggerOptions, pino_1["default"].destination(options.destination))
            : pino_1["default"](loggerOptions);
    }
    Logger.prototype.child = function (bindings) {
        var inner = this.inner.child(bindings);
        var logger = new Logger(this.options);
        logger.inner = inner;
        return logger;
    };
    Logger.prototype.trace = function (msg, o) {
        var _a, _b;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (o) {
            (_a = this.inner).trace.apply(_a, __spreadArray([o, msg], args));
        }
        else {
            (_b = this.inner).trace.apply(_b, __spreadArray([msg], args));
        }
    };
    Logger.prototype.debug = function (msg, o) {
        var _a, _b;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (o) {
            (_a = this.inner).debug.apply(_a, __spreadArray([o, msg], args));
        }
        else {
            (_b = this.inner).debug.apply(_b, __spreadArray([msg], args));
        }
    };
    Logger.prototype.info = function (msg, o) {
        var _a, _b;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (o) {
            (_a = this.inner).info.apply(_a, __spreadArray([o, msg], args));
        }
        else {
            (_b = this.inner).info.apply(_b, __spreadArray([msg], args));
        }
    };
    Logger.prototype.warn = function (msg, o) {
        var _a, _b;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (o) {
            (_a = this.inner).warn.apply(_a, __spreadArray([o, msg], args));
        }
        else {
            (_b = this.inner).warn.apply(_b, __spreadArray([msg], args));
        }
    };
    Logger.prototype.warning = function (msg, o) {
        var _a, _b;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (o) {
            (_a = this.inner).warn.apply(_a, __spreadArray([o, msg], args));
        }
        else {
            (_b = this.inner).warn.apply(_b, __spreadArray([msg], args));
        }
    };
    Logger.prototype.error = function (msg, o) {
        var _a, _b;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (o) {
            (_a = this.inner).error.apply(_a, __spreadArray([o, msg], args));
        }
        else {
            (_b = this.inner).error.apply(_b, __spreadArray([msg], args));
        }
    };
    Logger.prototype.fatal = function (msg, o) {
        var _a, _b;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (o) {
            (_a = this.inner).fatal.apply(_a, __spreadArray([o, msg], args));
        }
        else {
            (_b = this.inner).fatal.apply(_b, __spreadArray([msg], args));
        }
    };
    Logger.prototype.crit = function (msg, o) {
        var _a, _b;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (o) {
            (_a = this.inner).fatal.apply(_a, __spreadArray([o, msg], args));
        }
        else {
            (_b = this.inner).fatal.apply(_b, __spreadArray([msg], args));
        }
    };
    Logger.prototype.critical = function (msg, o) {
        var _a, _b;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (o) {
            (_a = this.inner).fatal.apply(_a, __spreadArray([o, msg], args));
        }
        else {
            (_b = this.inner).fatal.apply(_b, __spreadArray([msg], args));
        }
    };
    return Logger;
}());
exports.Logger = Logger;
