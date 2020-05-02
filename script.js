let myself;
let phase;
let cnv, bright;
let rockets = [];
let allDone, counter;
const blotStep = 6;
let grid;
let gridWidth, gridHeight;
let cell, cellHeight, cellWidth;
let spawns_per_loop = 0;

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
  cell = document.querySelector("#face");
  cellWidth = cell.offsetWidth;
  cellHeight = cell.offsetHeight;
  myself.resize(cellWidth, 0);
  cnv = createCanvas(gridWidth, gridHeight);
  cnv.parent('face');
  pixelDensity(1);
  findImageSpots();
  counter = 0;
  phase = 0;
  allDone = false;
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
function perfect_ratio(offset){
  let res = [];
  if(gridWidth<gridHeight){
    res[0] = gridWidth/800;
  } else if(gridHeight<gridWidth){
    res[0] = gridWidth/gridHeight;
  }
  // removed the offset cause css is tidier
  res[1] = createVector(0, cellHeight/10);

  res[0] = 1;
  return res;
}

function findImageSpots() {
  let offset = createVector(gridWidth*0.05, gridHeight*0.05);
  let scale_t = perfect_ratio(offset);
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
  spawns_per_loop += 13;
  for (let i = 0; i < spawns_per_loop -1 && i < rockets.length; i++) {
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
