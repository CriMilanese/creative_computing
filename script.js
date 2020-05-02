let myself;
let phase;
let cnv, bright;
let rockets = [];
let how_many, allDone, scale_t, offset, counter;
const blotStep = 6;
let grid;
let gridWidth, gridHeight;

// DOM components
let home_frame;
let det_name;
let det_city;
let det_interests;
let det_social;

function preload() {
  myself = loadImage('images/me.png');
}

function setup() {
  grid = document.querySelector(".grid");
  gridWidth = grid.offsetWidth;
  gridHeight = grid.offsetHeight;
  myself.resize(gridWidth/3, 0);
  cnv = createCanvas(gridWidth, gridHeight);
  cnv.parent('face');
  pixelDensity(1);
  findImageSpots();
  counter = 0;
  phase = 0;
  how_many = 0;
  allDone = false;
  select_elements();
}

function draw() {
  updateSize();
  switch (phase) {
    case 0:
      sendAgents();
      break;
    case 1:
      // noLoop()
      break;
    case 2:


      break;
    default:
      break;
  }

}
function perfect_ratio(){
  let res = [];
  if(gridWidth<gridHeight){
    res[0] = gridWidth/800;
  } else if(gridHeight<gridWidth){
    res[0] = gridWidth/gridHeight;
  }
  res[1] = offset.copy();
  res[0] = map(res[0], 0.5, res[0], 0.5, 1.8, true);
  return res;
}

function findImageSpots() {
  offset = createVector(gridWidth*0.05, gridHeight*0.05);
  scale_t = perfect_ratio();
  agent_radius = 7;
  myself.loadPixels();
  // the image is B&W so r, g, and b values are the same
  for (var y = 0; y < myself.height; y+=blotStep) {
      for (var x = 0; x < myself.width; x+=blotStep) {
        let index = (x + y * myself.width) * 4;
          if(index % 4 == 0){
            if (myself.pixels[index] < 51 && myself.pixels[index+3] > 0) {
              rockets.push(new Agent(x*scale_t[0]+scale_t[1].x, y*scale_t[0]+scale_t[1].y, agent_radius-1, scale_t[0]));
            } else if (myself.pixels[index] >= 51 && myself.pixels[index] < 102) {
              rockets.push(new Agent(x*scale_t[0]+scale_t[1].x, y*scale_t[0]+scale_t[1].y, agent_radius-2, scale_t[0]));
            } else if (myself.pixels[index] >= 102 && myself.pixels[index] < 153) {
              rockets.push(new Agent(x*scale_t[0]+scale_t[1].x, y*scale_t[0]+scale_t[1].y, agent_radius-4, scale_t[0]));
            } else if (myself.pixels[index] >= 153 && myself.pixels[index] < 205) {
              rockets.push(new Agent(x*scale_t[0]+scale_t[1].x, y*scale_t[0]+scale_t[1].y, agent_radius-5, scale_t[0]));
            }
      }
    }
  }
}

function sendAgents() {
  how_many += 13;
  for (let i = 0; i < how_many -1 && i < rockets.length; i++) {
    if(rockets[i].done){
      counter++;
    }
    rockets[i].show();
    rockets[i].move(35);
  }
  if(counter == rockets.length){
    allDone = true;
    noLoop();
  } else {
    counter = 0;
  }
}

function mousePressed() {
  phase = 1;
  loop();
}

function updateSize(){
  cnv.resize(gridWidth, gridHeight);
}

function draw_background(){
  push();
  randomSeed(9);
  noStroke();
  // translate(gridWidth/2, gridWidth/2);
  for(j=0;j<20;j++){
    fill(color('rgba(207, 191, 105, 0.35)'));
    ellipse(random(gridWidth), random(gridHeight), random(gridWidth/3));
  }
  pop();
}

function select_elements(){
  home_frame = select('#homeFrame')
  det_name = select('#name')
  det_city = select('#city')
  det_interests = select('#interests')
  det_social = select('#social')
}
