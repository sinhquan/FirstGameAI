"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brain = void 0;
var p5_1 = require("p5");
var Brain = /** @class */ (function () {
    function Brain(p5, size) {
        var _this = this;
        this.directions = []; //series of vectors which get the dot to the goal (hopefully)
        this.step = 0;
        //--------------------------------------------------------------------------------------------------------------------------------
        //sets all the vectors in directions to a random vector with length 1
        this.randomize = function () {
            for (var i = 0; i < _this.directions.length; i++) {
                var randomAngle = Math.random() * 2 * Math.PI;
                _this.directions[i] = p5_1.Vector.fromAngle(randomAngle);
            }
        };
        //-------------------------------------------------------------------------------------------------------------------------------------
        //returns a perfect copy of this brain object
        this.clone = function () {
            var clone = new Brain(_this.p5, _this.directions.length);
            for (var i = 0; i < _this.directions.length; i++) {
                clone.directions[i] = __spreadArray([], _this.directions[i], true);
            }
            return clone;
        };
        //----------------------------------------------------------------------------------------------------------------------------------------
        //mutates the brain by setting some of the directions to random vectors
        this.mutate = function () {
            var mutationRate = 0.01; //chance that any vector in directions gets changed
            for (var i = 0; i < _this.directions.length; i++) {
                var rand = Math.random();
                if (rand < mutationRate) {
                    //set this direction as a random direction 
                    var randomAngle = Math.random() * 2 * Math.PI;
                    _this.directions[i] = p5_1.Vector.fromAngle(randomAngle);
                }
            }
        };
        this.p5 = p5;
        this.directions = new Array(size);
        this.randomize();
    }
    return Brain;
}());
exports.Brain = Brain;
