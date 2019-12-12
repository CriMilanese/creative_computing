let participants = 2;
let mySlide;
let img;
let imgHeight;
let circles = [];
let validSpots = [];
let indexSpot;
let stopAdding = false;
let interv;

function preload() {
  img = loadImage('NewYear2020Eve.png');
}

function setup() {
  noStroke();
  createCanvas(windowWidth, windowHeight);
  img.resize(windowWidth, 0);
  img.loadPixels();
  setInterval(fireShow, 5000);
  let px = pixelDensity();
  pixelDensity(1);
  selectSpots();
  smooth();
  pixelDensity(px);
  translate((windowWidth / 2 - img.width / 2)*px, (windowHeight / 2 - img.height / 2))*px;
}

function draw() {
  background(0);
  // image(img, 0, 0);
  if (!stopAdding) {
    for (let i = 0; i < 10; i++) {
      indexSpot = floor(random(0, validSpots.length));
      addIfNotOverlapping(validSpots[indexSpot].x, validSpots[indexSpot].y);
    }
  }
  circleShow();
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
    if (!circles[j].tooBig) {
      circles[j].stop(circles);
      circles[j].grow();
    }
    circles[j].show();
  }
}

function explode() {
  let j = 0;
  if (circles.length == 0) {
    noLoop();
    clearInterval(interv);
    console.log("HAPPY NEW YEAR!");
  } else {
    while (j < 10) {
      let tmpIndex = floor(random(circles.length));
      if (circles[tmpIndex].done) {
        circles.splice(tmpIndex, 1);
        console.log("this firework is done");
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
  console.log(getFrameRate());
}
