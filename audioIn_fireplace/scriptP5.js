let permBox, infoBox, micContext;
let mic;

function setup(){
  cnv = createCanvas(windowWidth, windowHeight);
  infoBox = select(".infoBox");
  permBox = select(".modal");
  mic = new p5.AudioIn();
  mic.start();
  micContext = getAudioContext();
}

function draw(){
  background(0);
  let vol = mic.getLevel();
  fill(127);
  stroke(255);
  let h = map(vol, 0, 1, 5, 100);
  ellipse(windowWidth/2, windowHeight/2, h);
}

function createAudioContext(){
  permBox.hide();
  micContext.resume();
}

function infoBoxDisplay(){
  infoBox.show();
}
