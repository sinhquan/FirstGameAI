import { Vector } from "p5";

export class Brain {

  directions: Vector[] = [];//series of vectors which get the dot to the goal (hopefully)
  step = 0;

  constructor (size: number) {
    this.directions = new Array(size);
    this.randomize();
  }

  //--------------------------------------------------------------------------------------------------------------------------------
  //sets all the vectors in directions to a random vector with length 1
  //tạo ra 1000 hướng đi random
  randomize = () => {
    for (let i = 0; i< this.directions.length; i++) {
      let randomAngle = Math.random()*2*Math.PI;
      this.directions[i] = window.p5?.Vector.fromAngle(randomAngle);
      // console.log('aaaaaaaa: ', this.directions[i])
      // console.log('bbbbbbbb: ', Population.p5.createVector(1, -1))
      // for test 
      // this.directions[i] = Population.p5.createVector(1, -1);
    }
  }

  //-------------------------------------------------------------------------------------------------------------------------------------
  //returns a perfect copy of this brain object
  //tạo ra 1 brain chính nó
  clone = (): Brain => {
    let clone = new Brain(this.directions.length);
    for (let i = 0; i < this.directions.length; i++) {
      clone.directions[i] = this.directions[i]
    }

    return clone;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------

  //mutates the brain by setting some of the directions to random vectors
  //đột biến brain, random một số hướng
  mutate = () => {
    let mutationRate = 0.01;//chance that any vector in directions gets changed
    for (let i =0; i< this.directions.length; i++) {
      let rand = Math.random();
      if (rand < mutationRate) {
        //set this direction as a random direction 
        let randomAngle = Math.random()*2*Math.PI;
        this.directions[i] = window.p5?.Vector.fromAngle(randomAngle);
      }
    }
  }
}