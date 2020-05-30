let myself;
let phase;
let cnv, bright;
let rockets = [];
let allDone, counter;
const blotStep = 6;
let grid;
let gridWidth, gridHeight;
let cell, cellHeight, cellWidth;
let spawns_per_loop = 0;
let rnd;
let fib_a = 1, fib_b = 1;

function preload() {
  myself = loadImage('images/me.png');
}

function setup() {
  grid = document.querySelector(".grid");
  gridWidth = grid.offsetWidth;
  gridHeight = grid.offsetHeight;
  cell = document.querySelector("#face");
  cellWidth = cell.offsetWidth;
  cellHeight = cell.offsetHeight;
  cnv = createCanvas(gridWidth, gridHeight);
  cnv.parent('face');
  pixelDensity(1);
  findImageSpots();
  // for when the user clicks
  rnd = int(random(0, rockets.length));
  counter = 0;
  phase = 0;
  allDone = false;
}

function draw() {
  updateSize();
  switch (phase) {
    case 0:
      sendAgents();
      break;
    case 1:
      // pitch black
      grow();
      break;
    case 2:
      // dripping color
      // push()
      // fill(0)
      // rect(0, 0, cellWidth, cellHeight, 15);
      // pop();

      noLoop();
      break;
    default:
      break;
  }
}

function perfect_ratio(){
  let res = 0;
  if(windowWidth<=windowHeight){
    myself.resize(cellWidth/2.5, 0);
    res = createVector(cellWidth/8, cellHeight/2.8);
  } else {
    myself.resize(0, cellHeight/1.5);
    res = createVector(cellWidth/15, cellHeight/10)
  }
  return res;
}

function findImageSpots() {
  let scale_t = perfect_ratio();
  agent_radius = 7;
  myself.loadPixels();
  // the image is B&W so r, g, and b values are the same
  for (var y = 0; y < myself.height; y+=blotStep) {
      for (var x = 0; x < myself.width; x+=blotStep) {
        let index = (x + y * myself.width) * 4;
          if(index % 4 == 0){
            if (myself.pixels[index] < 51 && myself.pixels[index+3] > 0) {
              rockets.push(new Agent(x+scale_t.x, y+scale_t.y, agent_radius-1));
            } else if (myself.pixels[index] >= 51 && myself.pixels[index] < 102) {
              rockets.push(new Agent(x+scale_t.x, y+scale_t.y, agent_radius-2));
            } else if (myself.pixels[index] >= 102 && myself.pixels[index] < 153) {
              rockets.push(new Agent(x+scale_t.x, y+scale_t.y, agent_radius-4));
            } else if (myself.pixels[index] >= 153 && myself.pixels[index] < 205) {
              rockets.push(new Agent(x+scale_t.x, y+scale_t.y, agent_radius-5));
            }
      }
    }
  }
}

function sendAgents() {
  for (let i = 0; i < spawns_per_loop -1 && i < rockets.length; i++) {
    if(rockets[i].done){
      counter++;
    }
    rockets[i].show();
    rockets[i].move(35);
  }
  if(counter == rockets.length){
    allDone = true;
    noLoop();
  } else {
    spawns_per_loop += 20;
    counter = 0;
  }
}

function grow(){
  for (var i = 0; i < rockets.length; i++) {
    if(rockets[i].done){
      rockets[i].show();
    }
  }
  if(fib_a < 1000){
    let tmp = fib_a;
    fib_a += fib_b;
    fib_b = tmp/2;
    rockets[rnd].r += fib_a;
  } else {
    $(".details").hide();
    phase = 2;
  }
}

function updateSize(){
  cellWidth = cell.offsetWidth;
  cellHeight = cell.offsetHeight;
  cnv.resize(cellWidth, cellHeight);
}

// jquery methods

$(function() {
  $('.fa-github').hide().delay(6000).slideDown(300);
  $('.fa-linkedin').hide().delay(7000).slideDown(300);
  $('.fa-instagram').hide().delay(8000).slideDown(300);
  $('.fa-facebook').hide().delay(9000).slideDown(300);
  $('.bio').hide();
});

$(document).click(function() {
  loop();
  phase=1;
  setTimeout(function(){
    $('.bio').fadeIn(500);
    $('.bio').css("display", "flex");
    $('.bio').mouseenter(function(){
      $('#my_bio').html("My engineering passion led me to focus on computer sciences, in particular embedded systems, while expressing my creativity through front-end development");
    });
    $('.bio').mouseleave(function(){
      $('#my_bio').html("Bio");
    });
  }, 2000);
});
