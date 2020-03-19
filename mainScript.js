let myself;
let phase;
let cnv, bright;
let rockets = [];
let speed, allDone;
let bodyBgColor;
const blotStep = 6;

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
}

function draw() {
  updateSize();
  background(bodyBgColor);
  switch (phase) {
    case 0:
      sendAgents();
      break;
    case 1:
      saveImage();
      break;
    default:
      break;
  }

}

function findImageSpots() {
  myself.loadPixels();
  // the image is B&W so r, g, and b values are the same
  // for (let x = 0; x < myself.pixels.length; x += 4) {
  for (var y = 0; y < myself.height; y+=blotStep) {
      for (var x = 0; x < myself.width; x+=blotStep) {
        let index = (x + y * myself.width) * 4;
          if(index % 4 == 0){
            if (myself.pixels[index] < 51 && myself.pixels[index+3] > 0) {
              rockets.push(new Agent(x, y, 5));
            } else if (myself.pixels[index] >= 51 && myself.pixels[index] < 102) {
              rockets.push(new Agent(x, y, 4));
            } else if (myself.pixels[index] >= 102 && myself.pixels[index] < 153) {
              rockets.push(new Agent(x, y, 3));
            } else if (myself.pixels[index] >= 153 && myself.pixels[index] < 205) {
              rockets.push(new Agent(x, y, 2));
            }
      }
    }
  }
}

function sendAgents() {
  let counter = 0;
  if(speed < rockets.length){
    speed += 3;
  }
  for (var i = 0; i < speed -1; i++) {
    if(rockets[i].done == true){
      counter++;
    }
    rockets[i].move();
    rockets[i].show();
  }
  if(counter == rockets.length){
    allDone = true;
    noLoop();
  } else {
    counter = 0;
  }
}

function saveImage() {
}

function mousePressed() {}

function updateSize(){
  cnv.resize(windowWidth, windowHeight);
}
