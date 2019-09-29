let cnv;
let delta;

function setup(){
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.attribute("z-index", "1");
  background(0, 0, 0);
  stroke(255);
  strokeWeight(3);
}

function draw(){
  for(let i=0; i< 10; i++){
    delta = (10*i) + 1;
    print(delta)
    line(delta, delta, 50+ delta, 50+delta);
  }
}
