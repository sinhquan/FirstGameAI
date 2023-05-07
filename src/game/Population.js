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
exports.Population = void 0;
var Dot_1 = require("./Dot");
var Population = /** @class */ (function () {
    function Population(p5, goal, size) {
        var _this = this;
        this.dots = [];
        this.gen = 1;
        this.bestDot = 0; //the index of the best dot in the dots[]
        this.minStep = 1000;
        //------------------------------------------------------------------------------------------------------------------------------
        //show all dots
        this.show = function () {
            for (var i = 1; i < _this.dots.length; i++) {
                _this.dots[i].show();
            }
            _this.dots[0].show();
        };
        //-------------------------------------------------------------------------------------------------------------------------------
        //update all dots 
        this.update = function () {
            for (var i = 0; i < _this.dots.length; i++) {
                if (_this.dots[i].brain.step > _this.minStep) { //if the dot has already taken more steps than the best dot has taken to reach the goal
                    _this.dots[i].dead = true; //then it dead
                }
                else {
                    _this.dots[i].update();
                }
            }
        };
        //-----------------------------------------------------------------------------------------------------------------------------------
        //calculate all the fitnesses
        this.calculateFitness = function () {
            for (var i = 0; i < _this.dots.length; i++) {
                _this.dots[i].calculateFitness();
            }
        };
        //------------------------------------------------------------------------------------------------------------------------------------
        //returns whether all the dots are either dead or have reached the goal
        this.allDotsDead = function () {
            for (var i = 0; i < _this.dots.length; i++) {
                if (!_this.dots[i].dead && !_this.dots[i].reachedGoal) {
                    return false;
                }
            }
            return true;
        };
        //-------------------------------------------------------------------------------------------------------------------------------------
        //gets the next generation of dots
        this.naturalSelection = function () {
            var newDots = new Array(_this.dots.length); //next gen
            _this.setBestDot();
            _this.calculateFitnessSum();
            //the champion lives on 
            newDots[0] = _this.dots[_this.bestDot].gimmeBaby();
            newDots[0].isBest = true;
            for (var i = 1; i < newDots.length; i++) {
                //select parent based on fitness
                var parent_1 = _this.selectParent();
                //get baby from them
                newDots[i] = (parent_1 === null || parent_1 === void 0 ? void 0 : parent_1.gimmeBaby()) || new Dot_1.Dot(_this.goal);
            }
            _this.dots = __spreadArray([], newDots, true);
            _this.gen++;
        };
        //--------------------------------------------------------------------------------------------------------------------------------------
        //you get it
        this.calculateFitnessSum = function () {
            _this.fitnessSum = 0;
            for (var i = 0; i < _this.dots.length; i++) {
                _this.fitnessSum += _this.dots[i].fitness;
            }
        };
        //-------------------------------------------------------------------------------------------------------------------------------------
        //chooses dot from the population to return randomly(considering fitness)
        //this function works by randomly choosing a value between 0 and the sum of all the fitnesses
        //then go through all the dots and add their fitness to a running sum and if that sum is greater than the random value generated that dot is chosen
        //since dots with a higher fitness function add more to the running sum then they have a higher chance of being chosen
        this.selectParent = function () {
            var rand = Math.random() * _this.fitnessSum;
            var runningSum = 0;
            for (var i = 0; i < _this.dots.length; i++) {
                runningSum += _this.dots[i].fitness;
                if (runningSum > rand) {
                    return _this.dots[i];
                }
            }
            //should never get to this point
            return null;
        };
        //------------------------------------------------------------------------------------------------------------------------------------------
        //mutates all the brains of the babies
        this.mutateDemBabies = function () {
            for (var i = 1; i < _this.dots.length; i++) {
                _this.dots[i].brain.mutate();
            }
        };
        //---------------------------------------------------------------------------------------------------------------------------------------------
        //finds the dot with the highest fitness and sets it as the best dot
        this.setBestDot = function () {
            var max = 0;
            var maxIndex = 0;
            for (var i = 0; i < _this.dots.length; i++) {
                if (_this.dots[i].fitness > max) {
                    max = _this.dots[i].fitness;
                    maxIndex = i;
                }
            }
            _this.bestDot = maxIndex;
            //if this dot reached the goal then reset the minimum number of steps it takes to get to the goal
            if (_this.dots[_this.bestDot].reachedGoal) {
                _this.minStep = _this.dots[_this.bestDot].brain.step;
                console.log("step:", _this.minStep);
            }
        };
        Population.p5 = p5;
        this.goal = goal;
        this.dots = new Array(size);
        for (var i = 0; i < size; i++) {
            this.dots[i] = new Dot_1.Dot(this.goal);
        }
    }
    return Population;
}());
exports.Population = Population;
