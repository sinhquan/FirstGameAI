import { Brain } from './Brain';

export class Dot {
  pos;
  vel;
  acc;
  brain;

  dead = false;
  reachedGoal = false;
  isBest = false;//true if this dot is the best dot from the previous generation

  fitness = 0;

  width = 800;
  height = 800;

  p5: any;
  goal: any;

  constructor(p5, goal) {
    this.p5 = p5;
    this.goal = goal;

    //start the dots at the bottom of the window with a no velocity or acceleration
    this.pos = this.p5.createVector(this.width/2, this.height- 10);
    this.vel = this.p5.createVector(0, 0);
    this.acc = this.p5.createVector(0, 0);
    this.brain = new Brain(this.p5, 1000);//new brain with 1000 instructions
  }


  //-----------------------------------------------------------------------------------------------------------------
  //draws the dot on the screen
  show = () => {
    //if this dot is the best dot from the previous generation then draw it as a big green dot
    if (this.isBest) {
      this.p5.fill(0, 255, 0);
      this.p5.ellipse(this.pos.x, this.pos.y, 8, 8);
    } else {//all other dots are just smaller black dots
      this.p5.fill(0);
      this.p5.ellipse(this.pos.x, this.pos.y, 4, 4);
    }
  }

  //-----------------------------------------------------------------------------------------------------------------------
  //moves the dot according to the brains directions
  move = () => {

    if (this.brain.directions.length > this.brain.step) {//if there are still directions left then set the acceleration as the next PVector in the direcitons array
      this.acc = this.brain.directions[this.brain.step];
      this.brain.step++;
    } else {//if at the end of the directions array then the dot is dead
      this.dead = true;
    }

    //apply the acceleration and move the dot
    this.vel.add(this.acc);
    this.vel.limit(5);//not too fast
    this.pos.add(this.vel);
  }

  //-------------------------------------------------------------------------------------------------------------------
  //calls the move function and check for collisions and stuff
  update = () => {
    if (!this.dead && !this.reachedGoal) {
      this.move();
      if (this.pos.x< 2|| this.pos.y<2 || this.pos.x>this.width-2 || this.pos.y>this.height -2) {//if near the edges of the window then kill it 
        this.dead = true;
      } else if (this.p5.dist(this.pos.x, this.pos.y, this.goal.x, this.goal.y) < 5) {//if reached goal

        this.reachedGoal = true;
      } else if (this.pos.x< 600 && this.pos.y < 310 && this.pos.x > 0 && this.pos.y > 300) {//if hit obstacle
        this.dead = true;
      }
    }
  }


  //--------------------------------------------------------------------------------------------------------------------------------------
  //calculates the fitness
  calculateFitness = () => {
    if (this.reachedGoal) {//if the dot reached the goal then the fitness is based on the amount of steps it took to get there
      this.fitness = 1.0/16.0 + 10000.0/(this.brain.step * this.brain.step);
    } else {//if the dot didn't reach the goal then the fitness is based on how close it is to the goal
      let distanceToGoal = this.p5.dist(this.pos.x, this.pos.y, this.goal.x, this.goal.y);
      this.fitness = 1.0/(distanceToGoal * distanceToGoal);
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------
  //clone it 
  gimmeBaby = (): Dot => {
    let baby = new Dot(this.p5, this.goal);
    baby.brain = this.brain.clone();//babies have the same brain as their parents
    return baby;
  }
}