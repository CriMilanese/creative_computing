function setup() {
  createCanvas(windowWidth, windowWidth);
  background(0, 0, 0);
  var r, g, b;
}

function draw() {
  var size = random(5, 50);
  r = random(1, 255);
  g = random(1, 255);
  b = random(1, 255);

  if(mouseIsPressed){

    fill(r, g, b);
    ellipse(pmouseX, pmouseY, size, size);
  } else if(keyIsPressed){
    background(0,0,0);
  }
}
