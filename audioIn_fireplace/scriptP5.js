let permBox, infoBox, micContext;
let mic;

let numSegments = 30,
  x = [],
  y = [],
  angle = [],
  segLength = 5,
  targetX,
  targetY;

for (let i = 0; i < numSegments; i++) {
  x[i] = 0;
  y[i] = 0;
  angle[i] = 0;
}

function setup(){
  cnv = createCanvas(windowWidth, windowHeight);
  infoBox = select(".infoBox");
  permBox = select(".modal");
  // mic = new p5.AudioIn();
  // mic.start();
  // micContext = getAudioContext();
  strokeWeight(20);
  stroke(255, 100);

  x[x.length - 1] = width / 2; // Set base x-coordinate
  y[x.length - 1] = height; // Set base y-coordinate

}

function draw(){
  background(0);
  reachSegment(0, mouseX, mouseY);
  for (let i = 1; i < numSegments; i++) {
    reachSegment(i, targetX, targetY);
  }
  for (let j = x.length - 1; j >= 1; j--) {
    positionSegment(j, j - 1);
  }
  for (let k = 0; k < x.length; k++) {
    segment(x[k], y[k], angle[k], (k + 1) * 2);
  }
}

function createAudioContext(){
  permBox.hide();
  // micContext.resume();
}

function infoBoxDisplay(){
  infoBox.show();
}

function positionSegment(a, b) {
  x[b] = x[a] + cos(angle[a]) * segLength;
  y[b] = y[a] + sin(angle[a]) * segLength;
}

function reachSegment(i, xin, yin) {
  const dx = xin - x[i];
  const dy = yin - y[i];

  // atan: given a point in 2D space is the angle formed
  // by the vector interecting that point
  angle[i] = atan2(dy, dx);

  // cos() = given an angle is the x value of the vector
  // intersecting the origin and a specified point normally
  // given by the unit circle at that angle
  targetX = xin - cos(angle[i]) * segLength;

  // sin() = is the corresponding y value of that point
  targetY = yin - sin(angle[i]) * segLength;
}

function segment(x, y, a, sw) {
  strokeWeight(sw);
  push();
  translate(x, y);
  rotate(a);
  line(0, 0, segLength, 0);
  pop();
}
