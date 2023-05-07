import Sketch from "react-p5";
import { Population } from './game/Population.js';
import './App.css';

function App() {
  let goal;
  let test;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(800, 800).parent(canvasParentRef);
    p5.frameRate(100);//increase this to make the dots go faster
    goal  = p5.createVector(400, 10);
    test = new Population(p5, goal, 1000);//create a new population with 1000 members
  };

  const draw = (p5) => {
    p5.background(255);

    //draw goal
    p5.fill(255, 0, 0);
    p5.ellipse(goal.x, goal.y, 10, 10);
  
    //draw obstacle(s)
    p5.fill(0, 0, 255);
  
    p5.rect(0, 300, 600, 10);
  
  
    if (test.allDotsDead()) {
      //genetic algorithm
      test.calculateFitness();
      test.naturalSelection();
      test.mutateDemBabies();
    } else {
      //if any of the dots are still alive then update and then show them
  
      test.update();
      test.show();
    }
  };
  return (
    <div className="App">
      <Sketch setup={setup} draw={draw} />
    </div>
  );
}

export default App;
