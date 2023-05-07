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
var Brain = /** @class */ (function () {
    function Brain(size) {
        var _this = this;
        this.directions = []; //series of vectors which get the dot to the goal (hopefully)
        this.step = 0;
        //--------------------------------------------------------------------------------------------------------------------------------
        //sets all the vectors in directions to a random vector with length 1
        this.randomize = function () {
            var _a;
            for (var i = 0; i < _this.directions.length; i++) {
                var randomAngle = Math.random() * 2 * Math.PI;
                _this.directions[i] = (_a = window.p5) === null || _a === void 0 ? void 0 : _a.Vector.fromAngle(randomAngle);
                // console.log('aaaaaaaa: ', this.directions[i])
                // console.log('bbbbbbbb: ', Population.p5.createVector(1, -1))
                // for test 
                // this.directions[i] = Population.p5.createVector(1, -1);
            }
        };
        //-------------------------------------------------------------------------------------------------------------------------------------
        //returns a perfect copy of this brain object
        this.clone = function () {
            var clone = new Brain(_this.directions.length);
            for (var i = 0; i < _this.directions.length; i++) {
                clone.directions[i] = __spreadArray([], _this.directions[i], true);
            }
            return clone;
        };
        //----------------------------------------------------------------------------------------------------------------------------------------
        //mutates the brain by setting some of the directions to random vectors
        this.mutate = function () {
            var _a;
            var mutationRate = 0.01; //chance that any vector in directions gets changed
            for (var i = 0; i < _this.directions.length; i++) {
                var rand = Math.random();
                if (rand < mutationRate) {
                    //set this direction as a random direction 
                    var randomAngle = Math.random() * 2 * Math.PI;
                    _this.directions[i] = (_a = window.p5) === null || _a === void 0 ? void 0 : _a.Vector.fromAngle(randomAngle);
                }
            }
        };
        this.directions = new Array(size);
        this.randomize();
    }
    return Brain;
}());
exports.Brain = Brain;
