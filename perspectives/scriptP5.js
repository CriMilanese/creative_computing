let beamer = [];
let half1 = [];
let half2 = [];
let a, b;
let textX, textY;
const DIVISIONS = 10;

function setup(){
  createCanvas(windowWidth,windowHeight);

  angleSlider = createSlider(0, 5, 2, 1);
  angleSlider.position(60, 60);
  sizeSlider = createSlider(30, 250, 50, 1);
  sizeSlider.position(60, 20);
  colPic1 = createColorPicker('black');
  colPic1.position(60, 140);
  colPic2 = createColorPicker('red');
  colPic2.position(60, 180);
  textInput = createInput('Use arrows to move the text');
  textInput.position(60, 100);
  // textInput.input(textHandle);
  angleMode(DEGREES);
  textX = 0;
  textY = 0;
  // noLoop();
}

function draw(){
  //add parameters taken from user picker
  // randomSeed(0);
  background(255);
  push()
  baseline(sizeSlider.value());
  beam();
  pop();
  textHandle();
}

function baseline(mag){
  translate(width/2, height/2);
  rotate(30 * angleSlider.value());
  a = createVector(-mag, -mag);
  a_dir = a.heading();
  b = createVector(mag, mag);
  // b_dir = b.heading();
  stroke(255, 0, 0);
  strokeWeight(3);

  // here I want to create all the vectors to divide the outter circle
  step = 360/(DIVISIONS*2);
  for (var i = 0; i <= DIVISIONS+2; i++) {
    // the idea is to divide the circle into sectors, from
    // both sides of the baseline + origin and end
    x1 = width * cos(a_dir + step * i);
    y1 = width * sin(a_dir + step * i);
    x2 = width * cos(a_dir - step * i);
    y2 = width * sin(a_dir - step * i);
    noise_x = noise(x1)*1000;
    noise_y = noise(y1)*1000;
    if(x1<0)
      x1 -= noise_x;
    x1 += noise_x;
    if(x2<0)
      x2 -= noise_x;
    x2 += noise_x;
    if(y1<0)
      y1 -= noise_y;
    y1 += noise_y;
    if(y2<0)
      y2 -= noise_y;
    y2 += noise_y;

    half1[i] = createVector(x1, y1);
    half2[i] = createVector(x2, y2);
  }

  // here I want to divide the centered line into sections
  distance = p5.Vector.dist(a, b);
  step = distance/DIVISIONS;
  for (var i = 0; i <= distance; i+=step) {
    let interpolation = map(i, 0, distance, 0, 1);
    let tmp = p5.Vector.lerp(a, b, interpolation);
    let index = i/step + 1;
    beamer[int(i/step)] = tmp;
  }
}

function beam(){
  // here I want to connect the two and draw the rectangles
  push();
  for (var i = 0; i < beamer.length; i++) {
    tmp2 = map(i, 0, beamer.length, 0, 1);
    c = lerpColor(colPic1.color(), colPic2.color(), tmp2)
    noStroke();
    fill(c);
    if(beamer[i+1]!= null && half1[i+1] != null && half2[i+1] != null){
      quad(
        half1[i].x, half1[i].y,
        half1[i+1].x, half1[i+1].y,
        beamer[i+1].x, beamer[i+1].y,
        beamer[i].x, beamer[i].y
      );
      quad(
        half2[i].x, half2[i].y,
        half2[i+1].x, half2[i+1].y,
        beamer[i+1].x, beamer[i+1].y,
        beamer[i].x, beamer[i].y
      );
    }
  }
  pop();
}

function keyPressed(){
  switch (keyCode) {
    case UP_ARROW:
      textY-=5;
      break;
    case DOWN_ARROW:
      textY+=5;
      break;
    case RIGHT_ARROW:
      textX+=5;
      break;
    case LEFT_ARROW:
      textX-=5;
      break;
    default:

  }
}

//I want to place a text in the middle
function textHandle(){
  // textAlign(CENTER, CENTER);
  stringa = textInput.value();
  translate(width/2, height/2);
  stroke(255);
  textSize(50);
  text(stringa, textX, textY, 50, 50);
}
