var font;
var txt = "Cris";
let agents = [];
let textInput;
let textLoc;
let points;

function preload(){
  font = loadFont('Arvo-Bold.ttf');
}

function setup() {
  // use full screen size
  cnv = createCanvas(windowWidth, windowHeight);
  textInput = createInput('insert here..');
  textInput.position(50, 50);
  textFont(font);
  init();
}

function draw() {
  background(255);
  agents.forEach(spawn);
}

function spawn(item, index, arr){
  agents[index].behave();
  agents[index].update();
  agents[index].show();
}

function init(){
  textSize(256);
  textLoc = textWidth(txt)/2;
  points = font.textToPoints(txt, width/2 - textLoc, height/2, 256);
  for (let i = 0; i < points.length; i++) {
    fill(255);
    let agent = new Agent(points[i].x, points[i].y);
    agents.push(agent);
  }
}

function clearArray(){
  for (let j = 0; agents.length != 0; j++) {
    agents.pop();
  }
}

function keyPressed(){
  switch(keyCode){
    case RETURN:
      noLoop();
      clearArray();
      txt = textInput.value();
      init();
      loop();
      break;
  }
}

function mousePressed(){
  dropBomb();
}

function dropBomb(){
  push();
  translate();
  let bomb = createVector(mouseX, mouseY);
  for (let k = 0; k < agents.length; k++) {
    let distance = p5.Vector.sub(bomb, agents[k].pos);
    let effect = map(distance.mag(), 0, 300, 50, 0, true);
    console.log(effect);
    let scared = p5.Vector.sub(agents[k].pos, bomb);
    scared.setMag(effect);
    agents[k].force(scared);
  }

}
