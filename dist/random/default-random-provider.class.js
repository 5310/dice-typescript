"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Random = require("random-js");
var DefaultRandomProvider = /** @class */ (function () {
    function DefaultRandomProvider() {
        this.random = new Random(Random.engines.mt19937().autoSeed());
    }
    DefaultRandomProvider.prototype.numberBetween = function (min, max) {
        return this.random.integer(min, max);
    };
    return DefaultRandomProvider;
}());
exports.DefaultRandomProvider = DefaultRandomProvider;
//# sourceMappingURL=default-random-provider.class.js.map