var font;
var txt;
let agents = [];
let points = [];

function preload(){
  font = loadFont('Arvo-Bold.ttf');
}

function setup() {
  // use full screen size
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(dropBomb);
  textFont(font);
  txt = ['Freedom', 'is not', 'Free'];
  init();
}

function draw() {
  background(0);
  agents.forEach(spawn);
}

function spawn(item, index, arr){
  agents[index].behave();
  agents[index].update();
  agents[index].show();
}

function init(){
  for (var i = 0; i < txt.length; i++) {
    textSize(256);
    let textLocX = (width/2) - (textWidth(txt[i])/2);
    let textLocY = (i+1)*height/3 - 50;
    console.log(i+' LocX'+': '+textLocX+' '+' LocY'+': '+textLocY);
    points = points.concat(font.textToPoints(txt[i], textLocX, textLocY, 256));
  }

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

function dropBomb(){
  let bomb = createVector(mouseX, mouseY);
  for (let k = 0; k < agents.length; k++) {
    let distance = p5.Vector.sub(bomb, agents[k].pos);
    let effect = map(distance.mag(), 0, 300, 50, 0, true);
    let scared = p5.Vector.sub(agents[k].pos, bomb);
    scared.setMag(effect);
    agents[k].force(scared);
  }
}
