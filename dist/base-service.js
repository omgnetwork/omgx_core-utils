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
exports.BaseService = void 0;
/* Imports: Internal */
var logger_1 = require("./common/logger");
/**
 * Base for other "Service" objects. Handles your standard initialization process, can dynamically
 * start and stop.
 */
var BaseService = /** @class */ (function () {
    function BaseService(name, options, optionSettings) {
        this.initialized = false;
        this.running = false;
        validateOptions(options, optionSettings);
        this.name = name;
        this.options = mergeDefaultOptions(options, optionSettings);
        this.logger = new logger_1.Logger({ name: name });
    }
    /**
     * Initializes the service.
     */
    BaseService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.initialized) {
                            return [2 /*return*/];
                        }
                        this.logger.info('Service is initializing...');
                        return [4 /*yield*/, this._init()];
                    case 1:
                        _a.sent();
                        this.logger.info('Service has initialized.', {
                            options: this.options
                        });
                        this.initialized = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Starts the service (initializes it if needed).
     */
    BaseService.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.running) {
                            return [2 /*return*/];
                        }
                        this.logger.info('Service is starting...');
                        return [4 /*yield*/, this.init()
                            // set the service to running
                        ];
                    case 1:
                        _a.sent();
                        // set the service to running
                        this.running = true;
                        return [4 /*yield*/, this._start()];
                    case 2:
                        _a.sent();
                        this.logger.info('Service has started');
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Stops the service.
     */
    BaseService.prototype.stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.running) {
                            return [2 /*return*/];
                        }
                        this.logger.info('Service is stopping...');
                        return [4 /*yield*/, this._stop()];
                    case 1:
                        _a.sent();
                        this.logger.info('Service has stopped');
                        this.running = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Internal init function. Parent should implement.
     */
    BaseService.prototype._init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Internal start function. Parent should implement.
     */
    BaseService.prototype._start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    /**
     * Internal stop function. Parent should implement.
     */
    BaseService.prototype._stop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return BaseService;
}());
exports.BaseService = BaseService;
/**
 * Combines user provided and default options.
 */
function mergeDefaultOptions(options, optionSettings) {
    for (var _i = 0, _a = Object.keys(optionSettings); _i < _a.length; _i++) {
        var optionName = _a[_i];
        var optionDefault = optionSettings[optionName]["default"];
        if (optionDefault === undefined) {
            continue;
        }
        if (options[optionName] !== undefined && options[optionName] !== null) {
            continue;
        }
        options[optionName] = optionDefault;
    }
    return options;
}
/**
 * Performs option validation against the option settings
 */
function validateOptions(options, optionSettings) {
    for (var _i = 0, _a = Object.keys(optionSettings); _i < _a.length; _i++) {
        var optionName = _a[_i];
        var optionValidationFunction = optionSettings[optionName].validate;
        if (optionValidationFunction === undefined) {
            continue;
        }
        var optionValue = options[optionName];
        if (optionValidationFunction(optionValue) === false) {
            throw new Error("Provided input for option \"" + optionName + "\" is invalid: " + optionValue);
        }
    }
}
