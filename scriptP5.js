let myself, boat; //images for rockets targets
let phase;
let cnv;
let rockets = [];
let allDone, counter;
const blotStep = 6;
let grid;
let cell, cellHeight, cellWidth;
let spawns_per_loop = 0;
const agent_radius = 7;
const ARRIVE_SPEED = 30;
const WONDER_SPEED = 18;

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
  cell = document.querySelector(".scroll-grid");
  cellWidth = cell.offsetWidth;
  cellHeight = cell.offsetHeight;
  counter = 0;
  phase = 0;
  cnv = createCanvas(cellWidth, cellHeight);
  cnv.parent('face');
  pixelDensity(1);
  findImageSpots();
  allDone = false;

  /* FOR TESTING ONLY */
  noLoop();
  /* FOR TESTING ONLY */
}

/* I use a variable to make the website a state machine and make the elements
  behave accordingly to the phase they are in */
function draw() {
  background(0);
  updateCanvasSize();
  switch (phase) {
    case 0:
      sendAgents('arrive', ARRIVE_SPEED);
      break;
    case 1:
      sendAgents('wonder', WONDER_SPEED);
      break;
    case 2:
      // would like to scroll to show few tabs to click
      noLoop();
      break;
    default:
      break;
  }

}

/* here I spawn rockets within the canvas and drive them towards their targets */
function sendAgents(mode, speed) {
  counter = 0;
  for (let i = 0; i < spawns_per_loop - 1 && i < rockets.length; i++) {
    rockets[i].move(mode, speed);
    rockets[i].show();
    if (rockets[i].done){
      counter++;
      continue;
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
    myself.resize(cellWidth / 2, 0);
    res = createVector(cellWidth / 8, cellHeight / 2.8);
  } else {
    myself.resize(0, cellHeight / 1.8);
    res = createVector(cellWidth / 2, cellHeight / 4);
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

function dropBomb() {
  switch (phase) {
    case 0:
      let distance, effect, scared, bomb;
      phase = 0;
      console.log("I am dropping a bomb!");
      bomb = createVector(mouseX, mouseY);
      for (let k = 0; k < rockets.length; k++) {
        distance = p5.Vector.sub(bomb, rockets[k].pos);
        effect = map(distance.mag(), 0, 300, 55, 0, true);
        scared = p5.Vector.sub(rockets[k].pos, bomb);
        scared.setMag(effect);
        rockets[k].done = false;
        rockets[k].applyForce(scared);
        rockets[k].done = false;
        rockets[k].move('bomb', ARRIVE_SPEED);
        rockets[k].show();
      }
      break;
    case 1:

      break;
    default:
  }
  // loop();
}

// adapt canvas size to window size
function updateCanvasSize() {
  cellWidth = cell.offsetWidth;
  cellHeight = cell.offsetHeight;
  cnv.resize(cellWidth, cellHeight);
}

function morph(){
  phase = 1;
  rockets.forEach((item, i) => {
    item.undo();
    item.move('wonder', WONDER_SPEED);
    item.show();
  });
  // loop();
}
