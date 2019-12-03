let video, cnv;
const camWidth = 1024;
let camHeight;
let index;
let jmpX, jmpY;
let x, y;
let r, g, b, bright;
let vScale = 16;
let angle, speed;

function setup() {
  camHeight = int((3 * camWidth) / 4);
  cnv = createCanvas(camWidth, camHeight);
  video = createCapture(VIDEO);
  video.size(camWidth / vScale, camHeight / vScale);
  video.hide();
  angle = TWO_PI;
  speed = 16;
  pixelDensity(1);
}

function draw() {
  background(0);
  video.loadPixels();
  for (y = 0; y < video.height; y++) {
    for (x = 0; x < video.width; x++) {
      index = (x + y * video.width) * 4;
      r = video.pixels[index];
      g = video.pixels[index + 1];
      b = video.pixels[index + 2];
      bright = int((r + g + b) / 3);
      sizing = map(bright, 0, 255, 0, vScale);
      jmpX = x * vScale;
      jmpY = y * vScale;
      push();
      translate(jmpX + vScale/2, jmpY + vScale/2);
      rotate(angle);
      stroke(r, g, b);
      strokeWeight(sizing);
      createX();
      pop();
    }
  }
  angle += PI/speed;
}

function createX(){
  line(0, 0, -vScale/2, -vScale/2);
  line(0, 0, vScale/2, -vScale/2);
  line(0, 0, vScale/2, vScale/2);
  line(0, 0, -vScale/2, vScale/2);
}
