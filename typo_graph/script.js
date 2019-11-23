var font;
var txt = "magnameo";
let agents = [];

function preload(){
  font = loadFont('Arvo-Bold.ttf');
}
function setup() {
  // use full screen size
  cnv = createCanvas(displayWidth, displayHeight);
  textFont(font);
  textAlign(CENTER);
  textSize(256);
  var points = font.textToPoints(txt, 150, height/2, 256);
  for (var i = 0; i < points.length; i++) {
    fill(255);
    let agent = new Agent(points[i].x, points[i].y);
    agents.push(agent);
  }
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
