const AGENT_COUNT = 1;

let agents = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  noStroke();
  angleMode(DEGREES);

  for (let count = 0; count < AGENT_COUNT; count++) {
    const position = createVector(width/2, height/2);
    const angle = 45;
    agents.push(new Agent(position, angle));
  }

  console.log (agents[0]);
}

function draw() {
  background(220);

  agents.forEach(agent => {
    agent.update();
    agent.display();
  });
}
