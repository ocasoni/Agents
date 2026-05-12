const AGENT_COUNT = 400;
const SIM_MARGINS = 20;

let agents = [];
let cursorImage;

function preload() {
  cursorImage = loadImage('img/cursor.png');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  noStroke();
  angleMode(DEGREES);

  for (let count = 0; count < AGENT_COUNT; count++) {
    const position = createVector(random(0, width), random(0, height));
    const angle = random(0, 360);
    agents.push(new Agent(position, angle, cursorImage));
  }

  console.log(agents[0]);
  agents[0].debug = true;
}

function draw() {
  background(220);

  agents.forEach(agent => {
    agent.update();
    agent.display();
  });
}