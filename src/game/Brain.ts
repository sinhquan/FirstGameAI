import { Vector } from "p5";

export class Brain {

  directions: any[] = [];//series of vectors which get the dot to the goal (hopefully)
  step = 0;

  constructor (size: number) {
    this.directions = new Array(size);
    this.randomize();
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  //sets all the vectors in directions to a random vector with length 1
  randomize = () => {
    for (let i = 0; i< this.directions.length; i++) {
      let randomAngle = Math.random()*2*Math.PI;
      this.directions[i] = Vector.fromAngle(randomAngle);
    }
  }

  //-------------------------------------------------------------------------------------------------------------------------------------
  //returns a perfect copy of this brain object
  clone = (): Brain => {
    let clone = new Brain(this.directions.length);
    for (let i = 0; i < this.directions.length; i++) {
      clone.directions[i] = [...this.directions[i]]
    }

    return clone;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------

  //mutates the brain by setting some of the directions to random vectors
  mutate = () => {
    let mutationRate = 0.01;//chance that any vector in directions gets changed
    for (let i =0; i< this.directions.length; i++) {
      let rand = Math.random();
      if (rand < mutationRate) {
        //set this direction as a random direction 
        let randomAngle = Math.random()*2*Math.PI;
        this.directions[i] = Vector.fromAngle(randomAngle);
      }
    }
  }
}