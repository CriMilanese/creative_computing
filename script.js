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

/* I use a variable to make the website a state machine and make the elements
  behave accordingly to the phase they are in */
function draw() {
  updateCanvasSize();
  switch (phase) {
    case 0:
      sendAgents(35);
      break;
    case 1:
      sendAgents(30);
      break;
    case 2:
      // would like to scroll to show few tabs to click
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
    myself.resize(0, cellHeight/1.8);
    res = createVector(cellWidth/15, cellHeight/10)
  }
  return res;
}

/* for efficiency purposes I calculate points only at the begin */
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

/* here I spawn rockets outside the screen and drive them towards their targets */
function sendAgents(speed) {
  for (let i = 0; i < spawns_per_loop -1 && i < rockets.length; i++) {
    rockets[i].show();
    rockets[i].move(speed);
    if(rockets[i].done)
      counter++;
  }
  if(counter == rockets.length){
    allDone = true;
    noLoop();
  } else {
    spawns_per_loop += 20;
    counter = 0;
  }
}

/* when a click occurs on the document a random agent grows in size and covers
  it as a transiction to page 2 */
function grow(){
  for (var i = 0; i < rockets.length; i++) {
    if(rockets[i].done){
      rockets[i].show();
    }
  }
  // if(fib_a < 1000){
  //   let tmp = fib_a;
  //   fib_a += fib_b;
  //   fib_b = tmp/2;
  //   rockets[rnd].r += fib_a;
  // } else {
  //   $(".details").hide();
  //   phase = 2;
  // }
}

function dropBomb(){
  let bomb = createVector(mouseX, mouseY);
  for (let k = 0; k < rockets.length; k++) {
    let distance = p5.Vector.sub(bomb, rockets[k].pos);
    let effect = map(distance.mag(), 0, 300, 50, 0, true);
    let scared = p5.Vector.sub(rockets[k].pos, bomb);
    scared.setMag(effect);
    rockets[k].acceleration.add(scared);
  }
}

function retarget(){
  // move destination to something
  for(i=0; i<rockets.length; i++){

  }

  // move the target point of each agent to destination

}

// adapt canvas size to window size
function updateCanvasSize(){
  cellWidth = cell.offsetWidth;
  cellHeight = cell.offsetHeight;
  cnv.resize(cellWidth, cellHeight);
}

function githubPage(){
  window.open();
  let appWindow = window.open('https://github.com/CriMilanese', '_blank');
  setTimeout( function () {
    if (appWindow) {
      appWindow.location ="https://github.com/CriMilanese";
    }
  },1000);
}

function facebookPage(){
  let appWindow = window.open('fb://profile/100000686899395', '_blank');
  setTimeout( function () {
    if(appWindow) {
      appWindow.location = "https:://facebook.com/CriMilanese7";
    }
  }, 1000);
}

function instaPage(){
  window.open('instagram://user?username=elmilanes', '_blank');
}

function linkedinPage(){
  window.open('https://www.linkedin.com/in/cristianomilanese', '_blank');
}

function send_mail(){
  Email.send({
    Host: "smtp.gmail.com",
    Username : "people.first.infomail@gmail.com",
    Password : "dMM3rnUW3mu73J7",
    To : 'it4ll.infobox@gmail.com',
    From : "people.first.infomail@gmail.com",
    Subject : "feedback",
    Body : $("#fb").val(),
  }).then(
    message => alert("mail sent successfully")
  );
}

// jquery methods
// at html loading complete
$(function() {
  $('.fa-github').hide().delay(6000).slideDown(300);
  $('.fa-linkedin').hide().delay(7000).slideDown(300);
  $('.fa-instagram').hide().delay(8000).slideDown(300);
  $('.fa-facebook').hide().delay(9000).slideDown(300);
  $('.bio').hide();
});

$(function(){
  $('#pagetwo_grid').hide();
})
//
// $("scroll-page").scroll(function(){
//   loop();
//   if(phase<2){phase=1;}
//   transform_1()
// })



  $(document).click(function() {
    loop();
    for(i=0;i<rockets.length;i++){
      rockets[i].done = false;
    }
    dropBomb();
    // setTimeout(function(){noLoop; }, 1000);
    // if(phase<2){phase=1;}
    // setTimeout(function(){
    //   $('.bio').fadeIn(500);
    //   $('.bio').css("display", "flex");
    //   $('.bio').mouseenter(function(){
    //     $('#my_bio').html("My engineering passion led me to focus on computer sciences, in particular embedded systems, while expressing my creativity through front-end development");
    //   });
    //   $('.bio').mouseleave(function(){
    //     $('#my_bio').html("I am glad you are interested in knowing more about me, but this site is still under development..");
    //   });
    // }, 2000);


  });
