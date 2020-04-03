let myself;
let phase;
let cnv, bright;
let rockets = [];
let how_many, allDone, scale_t, offset, counter;
let bodyBgColor;
const blotStep = 6;

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
  myself.resize(windowWidth/5, 0);
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('cnvs');
  // cnv.attribute('display', 'inline');
  // cnv.attribute('position', 'left');
  // cnv.attribute('float', 'left');
  // cnv.attribute('z-index', '5');
  pixelDensity(1);
  findImageSpots();
  counter = 0;
  phase = 0;
  how_many = 0;
  allDone = false;
  bodyBgColor = color('#e69665');
  select_elements();
}

function draw() {
  updateSize();
  switch (phase) {
    case 0:
      background(bodyBgColor);
      draw_background();
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
  if(windowWidth<windowHeight){
    res[0] = windowWidth/800;
  } else if(windowHeight<windowWidth){
    res[0] = windowWidth/windowHeight;
  }
  res[1] = offset.copy();
  res[0] = map(res[0], 0.5, res[0], 0.5, 1.8, true);
  return res;
}

function findImageSpots() {
  offset = createVector(windowWidth*0.2, windowHeight*0.03);
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
  cnv.resize(windowWidth, windowHeight);
}

function draw_background(){
  push();
  randomSeed(9);
  noStroke();
  // translate(windowWidth/2, windowWidth/2);
  for(j=0;j<20;j++){
    fill(color('rgba(207, 191, 105, 0.35)'));
    ellipse(random(windowWidth), random(windowHeight), random(windowWidth/3));
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
