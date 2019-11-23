let spattersize = 25;
let paint_color;
let bgcolor;
let paint_blot;
let cnv;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  smooth();
  paint_color = color(255, 153, 0);
  bgcolor = color(0, 0, 0);
  background(bgcolor);
}

function draw() {
  if (mouseIsPressed) {
    let speed = abs(mouseX - pmouseX) + abs(mouseY - pmouseY);
    if (speed < 5) {
      spill_paint();
      paint_spatter(paint_blot);
    } else {
      draw_line(speed);
      paint_spatter(paint_blot);
      paint_blot = 0;
    }
  }
}

function spill_paint() {
  paint_blot = paint_blot + .3;
}

// create all blots around the mouse position
function paint_spatter(blotsize) {
  if (blotsize < 100) {
    fill(paint_color);
    noStroke();
    let range = 20;
    let randX = random(-blotsize - range, blotsize + range);
    let randY = random(-blotsize - range, blotsize + range);
    let radius = random(1, blotsize / 3);
    ellipse(mouseX + randX, mouseY + randY, radius, radius);
  }
}

// draw a line between the last mouse position and the current
function draw_line(mouseSpeed) {
  stroke(paint_color);
  strokeWeight(100 / mouseSpeed);
  line(pmouseX, pmouseY, mouseX, mouseY);
}

function keyTyped() {
  switch (key) {
    case 's':
      save(cnv, "Spilledpaint__" + frameCount + ".jpg");
      break;
    case ' ':
      paint_color = color(random(255), random(255), random(255));
  }
}

function keyPressed() {
  switch (keyCode) {
    case 'DELETE':
      background(bgcolor);
  }
}
