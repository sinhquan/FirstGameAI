"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dot = void 0;
var Brain_1 = require("./Brain");
var Dot = /** @class */ (function () {
    function Dot(p5, goal) {
        var _this = this;
        this.dead = false;
        this.reachedGoal = false;
        this.isBest = false; //true if this dot is the best dot from the previous generation
        this.fitness = 0;
        this.width = 800;
        this.height = 800;
        //-----------------------------------------------------------------------------------------------------------------
        //draws the dot on the screen
        this.show = function () {
            //if this dot is the best dot from the previous generation then draw it as a big green dot
            if (_this.isBest) {
                _this.p5.fill(0, 255, 0);
                _this.p5.ellipse(_this.pos.x, _this.pos.y, 8, 8);
            }
            else { //all other dots are just smaller black dots
                _this.p5.fill(0, 0, 255);
                _this.p5.ellipse(_this.pos.x, _this.pos.y, 4, 4);
            }
        };
        //-----------------------------------------------------------------------------------------------------------------------
        //moves the dot according to the brains directions
        this.move = function () {
            if (_this.brain.directions.length > _this.brain.step) { //if there are still directions left then set the acceleration as the next PVector in the direcitons array
                _this.acc = _this.brain.directions[_this.brain.step];
                _this.brain.step++;
            }
            else { //if at the end of the directions array then the dot is dead
                _this.dead = true;
            }
            //apply the acceleration and move the dot
            _this.vel.add(_this.acc);
            _this.vel.limit(5); //not too fast
            _this.pos.add(_this.vel);
        };
        //-------------------------------------------------------------------------------------------------------------------
        //calls the move function and check for collisions and stuff
        this.update = function () {
            if (!_this.dead && !_this.reachedGoal) {
                _this.move();
                if (_this.pos.x < 2 || _this.pos.y < 2 || _this.pos.x > _this.width - 2 || _this.pos.y > _this.height - 2) { //if near the edges of the window then kill it 
                    _this.dead = true;
                }
                else if (_this.p5.dist(_this.pos.x, _this.pos.y, _this.goal.x, _this.goal.y) < 5) { //if reached goal
                    _this.reachedGoal = true;
                }
                else if (_this.pos.x < 600 && _this.pos.y < 310 && _this.pos.x > 0 && _this.pos.y > 300) { //if hit obstacle
                    _this.dead = true;
                }
            }
        };
        //--------------------------------------------------------------------------------------------------------------------------------------
        //calculates the fitness
        this.calculateFitness = function () {
            if (_this.reachedGoal) { //if the dot reached the goal then the fitness is based on the amount of steps it took to get there
                _this.fitness = 1.0 / 16.0 + 10000.0 / (_this.brain.step * _this.brain.step);
            }
            else { //if the dot didn't reach the goal then the fitness is based on how close it is to the goal
                var distanceToGoal = _this.p5.dist(_this.pos.x, _this.pos.y, _this.goal.x, _this.goal.y);
                _this.fitness = 1.0 / (distanceToGoal * distanceToGoal);
            }
        };
        //---------------------------------------------------------------------------------------------------------------------------------------
        //clone it 
        this.gimmeBaby = function () {
            var baby = new Dot(_this.p5, _this.goal);
            baby.brain = _this.brain.clone(); //babies have the same brain as their parents
            return baby;
        };
        this.p5 = p5;
        this.goal = goal;
        //start the dots at the bottom of the window with a no velocity or acceleration
        this.pos = this.p5.createVector(this.width / 2, this.height - 10);
        this.vel = this.p5.createVector(0, 0);
        this.acc = this.p5.createVector(0, 0);
        this.brain = new Brain_1.Brain(this.p5, 1000); //new brain with 1000 instructions
    }
    return Dot;
}());
exports.Dot = Dot;
