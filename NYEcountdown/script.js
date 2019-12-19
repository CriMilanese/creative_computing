let img;
let imgHeight;
let circles = [];
let validSpots = [];
let indexSpot;
let stopAdding = false;
let interv;
let mic, micLevel, micPermit;
let minMicLevel = 0.08;
let btn;

function preload() {
  img = loadImage('NewYear2020Eve.png');
}

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, 0);
  img.loadPixels();
  let px = pixelDensity();
  pixelDensity(1);
  selectSpots();
  smooth();
  pixelDensity(px);
  introSceneSetup();
}

function draw() {
  background(0);
  if (micPermit) {
    if (!stopAdding && micLevel>minMicLevel) {
      for (let i = 0; i < 10; i++) {
        indexSpot = floor(random(0, validSpots.length));
        addIfNotOverlapping(validSpots[indexSpot].x, validSpots[indexSpot].y);
      }
    }
    circleShow();
    micLevel = mic.getLevel();
    if (frameCount % 60 == 0) {
      console.log(micLevel);
    }
  } else {

  }
}

function selectSpots() {
  let r, g, b, index, bright;
  for (y = 0; y < img.height; y++) {
    for (x = 0; x < img.width; x++) {
      index = (x + y * img.width) * 4;
      r = img.pixels[index];
      g = img.pixels[index + 1];
      b = img.pixels[index + 2];
      bright = int((r + g + b) / 3);
      if (bright < 10) {
        validSpots.push(createVector(x, y));
      }
    }
  }
}

function addIfNotOverlapping(dx, dy) {
  let valid = true;
  for (let i = 0; i < circles.length; i++) {
    let d = dist(circles[i].x, circles[i].y, dx, dy);
    if (d < (circles[i].r + 4) && d > 0) {
      valid = false;
      break;
    }
  }
  if (valid) {
    let tmpCircle = new Circle(dx, dy);
    tmpCircle.buildFireworks();
    circles.push(tmpCircle);
  }
  validSpots.splice(indexSpot, 1);
}

function circleShow() {
  for (let j = 0; j < circles.length; j++) {
    if (!circles[j].tooBig && micLevel>minMicLevel) {
      circles[j].grow();
      circles[j].stop(circles);
    }
    circles[j].show();
  }
}

function explode() {
  let j = 0;
  if (circles.length == 0) {
    noLoop();
    clearInterval(interv);
  } else {
    while (j < 10) {
      let tmpIndex = floor(random(circles.length));
      if (circles[tmpIndex].done) {
        circles.splice(tmpIndex, 1);
      } else {
        circles[tmpIndex].fire = true;
      }
      j++;
    }
  }
}

function fireShow() {
  if (!stopAdding) {
    stopAdding = true;
    interv = setInterval(explode, 300);
  }
}

function introSceneSetup() {
  micPermit = false;
  btn = createButton('start countdown');
  let sz = btn.size();
  btn.position(windowWidth / 2 - sz.width / 2, windowHeight / 2);
  btn.mousePressed(letsBegin);
}

function letsBegin() {
  micPermit = true;
  btn.hide();
  mic = new p5.AudioIn();
  mic.start();
  getAudioContext().resume();
  setInterval(fireShow, 6000);
}
