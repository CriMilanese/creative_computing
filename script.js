let myself, boat; //images for rockets targets
let phase;
let cnv;
let rockets = [];
let allDone, counter;
const blotStep = 6;
let grid;
let gridWidth, gridHeight;
let cell, cellHeight, cellWidth;
let spawns_per_loop = 0;
const agent_radius = 7;

/*
*  TODO: create a file containing the text-based coordinates for each
*        image point selected, so that I do not have to load the image
*        in the future.
*/

function preload() {
  myself = loadImage('images/me.png');
  // boat = loadImage('images/sailingBoat.png')
}

function setup() {
  grid = document.querySelector(".grid");
  gridWidth = grid.offsetWidth;
  gridHeight = grid.offsetHeight;
  cell = document.querySelector("#face");
  cellWidth = cell.offsetWidth;
  cellHeight = cell.offsetHeight;
  counter = 0;
  phase = 0;
  cnv = createCanvas(gridWidth, gridHeight);
  cnv.parent('face');
  pixelDensity(1);
  findImageSpots();
  allDone = false;
}

/* I use a variable to make the website a state machine and make the elements
  behave accordingly to the phase they are in */
function draw() {
  updateCanvasSize();
  switch (phase) {
    case 0:
      sendAgents('arrive', 29);
      break;
    case 1:
      sendAgents('wonder', 8);
      break;
    case 2:
      // would like to scroll to show few tabs to click
      noLoop();
      break;
    default:
      break;
  }

}

/* here I spawn rockets outside the screen and drive them towards their targets */
function sendAgents(mode, speed) {
  counter = 0;
  for (let i = 0; i < spawns_per_loop - 1 && i < rockets.length; i++) {
    rockets[i].show();
    rockets[i].move(mode, speed);
    if (rockets[i].done){
      counter++;
    }
  }
  if (counter == rockets.length - 1) {
    // allDone = true;
    console.log('blocking the loop');
    noLoop();
  } else {
    if (spawns_per_loop > rockets.length){
      spawns_per_loop = rockets.length;
    } else {
      spawns_per_loop += 20;
    }
  }
}

function perfect_ratio() {
  let res = 0;
  if (windowWidth <= windowHeight) {
    myself.resize(cellWidth / 2.5, 0);
    res = createVector(cellWidth / 8, cellHeight / 2.8);
  } else {
    myself.resize(0, cellHeight / 1.8);
    res = createVector(cellWidth / 15, cellHeight / 10)
  }
  return res;
}

/* for efficiency purposes I calculate points only at the begin */
function findImageSpots() {
  let pr = perfect_ratio();
  initAgents(myself, pr);
}

function initAgents(myImage, scale_t) {
  // the image is B&W so r, g, and b values are the same
  myImage.loadPixels();
  for (var y = 0; y < myImage.height; y += blotStep) {
    for (var x = 0; x < myImage.width; x += blotStep) {
      let index = (x + y * myImage.width) * 4;
      if (index % 4 == 0) {
        if (myImage.pixels[index] < 51 && myImage.pixels[index] > 0) {
          rockets.push(new Agent(x + scale_t.x, y + scale_t.y, agent_radius - 1));
        } else if (myImage.pixels[index] >= 51 && myImage.pixels[index] < 102) {
          rockets.push(new Agent(x + scale_t.x, y + scale_t.y, agent_radius - 2));
        } else if (myImage.pixels[index] >= 102 && myImage.pixels[index] < 153) {
          rockets.push(new Agent(x + scale_t.x, y + scale_t.y, agent_radius - 4));
        } else if (myImage.pixels[index] >= 153 && myImage.pixels[index] < 205) {
          rockets.push(new Agent(x + scale_t.x, y + scale_t.y, agent_radius - 5));
        }
      }
    }
  }
}

function reTarget(image) {
  // move destination to something
  for (i = 0; i < rockets.length; i++) {

  }

  // move the target point of each agent to destination

}

function dropBomb() {
  let bomb = createVector(mouseX, mouseY);
  for (let k = 0; k < rockets.length; k++) {
    let distance = p5.Vector.sub(bomb, rockets[k].pos);
    let effect = map(distance.mag(), 0, 300, 55, 0, true);
    let scared = p5.Vector.sub(rockets[k].pos, bomb);
    scared.setMag(effect);
    rockets[k].done = false;
    rockets[k].applyForce(scared);
  }
  loop()
}

// adapt canvas size to window size
function updateCanvasSize() {
  cellWidth = cell.offsetWidth;
  cellHeight = cell.offsetHeight;
  cnv.resize(cellWidth, cellHeight);
}

function morph(){
  phase = 1;
}
