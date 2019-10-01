let cnv, title;
let bg_colorFrom;
let bg_colorTo;
let planet_colorFrom;
let planet_colorTo;
let winH, winW;
let planetSize;
let myRandomSeed;



function setup(){
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.attribute("z-index", "1");  //supposed to set the depth of elements
  bg_colorFrom = color('#b4eaf0');  // starting shade fro background
  bg_colorTo = color('#161f6b');    // ending shade
  planet_colorFrom = color('#fcfc42');  // starting shade for planet
  planet_colorTo = color('#ffffff');
  background(bg_colorFrom);
  winH = windowHeight;
  winW = windowWidth;
  planetSize = winW / 10;
  myRandomSeed = random(0, 10);
}

function draw(){
  //map transition ratios for each element
  let posTransit = map(mouseX, 50, winW-50, winW/4, winW*0.65, true);
  let antiPosTransit = map(mouseX, 50, winW-50, winW/2, winW*0.69, true);
  let colTransit = map(mouseX, 0, winW, 0, 1);
  let planet_colTransit = map(mouseX, 0, winW/2, 0, 1, true);
  let rayTransp = map(mouseX, 0, winW/2, 255, 0, true);
  let starTransp = map(mouseX, winW/2, winW, 0, 255, true);

  // set a color transition
  let bg_colorCurr = lerpColor(bg_colorFrom, bg_colorTo, colTransit)
  let planet_colorCurr = lerpColor(planet_colorFrom, planet_colorTo, planet_colTransit);
  // I must create the same value again with another name
  // in order to change its alpha value for transparency
  let rays_colorCurr = lerpColor(planet_colorFrom, planet_colorTo, planet_colTransit);

  //draw the various elements in teh right sequence in order to stack them
  background(bg_colorCurr);
  drawStars(starTransp);
  drawHills();
  drawRays(posTransit, rays_colorCurr, rayTransp);
  drawPlanet(posTransit, planet_colorCurr);
  drawAntiPlanet(antiPosTransit, bg_colorCurr);
}

function drawHills(){
  push();
  strokeWeight(3);
  stroke(0);
  fill(color('#2b5c39'));
  ellipse(winW*3/5 + 50, winH + 50, winW/3, winH);
  fill(color('#427d53'));
  ellipse(winW/2 - 50, winH - 10, winW/5, winH/3);
  fill(color('#5ea873'));
  ellipse(winW/4, winH, winW/3.5, winH/1.5);
  fill(color('#53ed7f'));
  ellipse(winW*3/5, winH + 5, winW/3, winH/8);
  pop();
}

function drawRays(x_shift, rayColor, transparency){
  push();
  noStroke();
  rayColor.setAlpha(transparency);
  fill(rayColor);
  translate(x_shift, winH/3);
  for(let i=0; i < 8; i++){
    triangle(-10, -1*planetSize*2/3, 0, -1*planetSize, +10, -1*planetSize*2/3);
    rotate(PI/4);
  }
  pop();
}

function drawPlanet(shift, paint){
  push();
  noStroke();
  fill(paint);
  circle(shift, winH/3, planetSize);
  pop();
}

function drawAntiPlanet(shift, clr){
  push();
  noStroke();
  fill(clr);
  circle(shift, winH/3 - 20, planetSize/1.5);
  pop();
}

function drawStars(star_transp){
  push();
  randomSeed(myRandomSeed);
  noStroke();
  fill(255, star_transp);
  for(let i=0; i<15; i++){
    let star_x = random(winW/10, winW*9/10);
    let star_y = random(winH/6, winH*5/6);
    let inner_sz = random(1, 4);
    let outer_sz = random(6, 10);
    let angle = TWO_PI / 5;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = star_x + cos(a) * outer_sz;
      let sy = star_y + sin(a) * outer_sz;
      vertex(sx, sy);
      sx = star_x + cos(a + halfAngle) * inner_sz;
      sy = star_y + sin(a + halfAngle) * inner_sz;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
  pop();
}
