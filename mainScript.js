let myself;
let phase;
let cnv, bright;
let rockets = [];
let speed, allDone;
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
  myself.resize(300, 0);
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('cnvs');
  pixelDensity(1);
  findImageSpots();
  phase = 0;
  speed = 0;
  allDone = false;
  bodyBgColor = color('#e69665');
  select_elements();
}

function draw() {
  updateSize();
  background(bodyBgColor);
  switch (phase) {
    case 0:
      // draw_background();
      // sendAgents();
      break;
    case 1:
      saveImage();
      break;
    case 2:
      check_mouse();

      break;
    default:
      draw_background();
      sendAgents();
      break;
  }

}

function findImageSpots() {
  scale_t = windowWidth/windowHeight;
  offset = [windowWidth * 0.1, windowHeight*0.1];
  agent_radius = 7;
  myself.loadPixels();
  // the image is B&W so r, g, and b values are the same
  // for (let x = 0; x < myself.pixels.length; x += 4) {
  for (var y = 0; y < myself.height; y+=blotStep) {
      for (var x = 0; x < myself.width; x+=blotStep) {
        let index = (x + y * myself.width) * 4;
          if(index % 4 == 0){
            if (myself.pixels[index] < 51 && myself.pixels[index+3] > 0) {
              rockets.push(new Agent(x*scale_t+offset[0], y*scale_t+offset[1], agent_radius-1, scale_t));
            } else if (myself.pixels[index] >= 51 && myself.pixels[index] < 102) {
              rockets.push(new Agent(x*scale_t+offset[0], y*scale_t+offset[1], agent_radius-2, scale_t));
            } else if (myself.pixels[index] >= 102 && myself.pixels[index] < 153) {
              rockets.push(new Agent(x*scale_t+offset[0], y*scale_t+offset[1], agent_radius-4, scale_t));
            } else if (myself.pixels[index] >= 153 && myself.pixels[index] < 205) {
              rockets.push(new Agent(x*scale_t+offset[0], y*scale_t+offset[1], agent_radius-5, scale_t));
            }
      }
    }
  }
}

function sendAgents() {
  let counter = 0;
  if(speed < rockets.length){
    speed += 13;
  }
  for (let i = 0; i < speed -1; i++) {
    if(rockets[i].done == true){
      counter++;
    }
    rockets[i].show();
    rockets[i].move();
  }
  if(counter == rockets.length){
    allDone = true;
    print(rockets.length)
    noLoop();
  } else {
    counter = 0;
  }
}

function saveImage() {
  save('images/background.png');
  phase += 1;
  let bg = select('body');
  bg.attribute('style', 'url(images/background.png); background-size: 100% 100%');
  cnv.hide();
}

function mousePressed() {
    phase += 1;
}

function updateSize(){
  cnv.resize(windowWidth, windowHeight);
}

function check_mouse(){
  noLoop();
}

function draw_background(){
  push();
  randomSeed(12);
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
