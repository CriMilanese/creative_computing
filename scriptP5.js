var r, g, b;
var menu_open = false;
var button, imgTools;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  menu_open = false;
  imgTools = createImg('images/burger_button.png');
  // imgTools.style();
  imgTools.position(10,10);
  imgTools.mousePressed(openNav);
  // imgTools.parent(button);
}

function draw() {
  var size = random(5, 50);
  r = random(1, 255);
  g = random(1, 255);
  b = random(1, 255);

  if(mouseIsPressed && menu_open == false){
    fill(r, g, b);
    // ellipse(pmouseX, pmouseY, size, size);
    imageMode(CENTER);
  } else if(keyIsPressed){
    background(0,0,0);
  }
}

function openNav() {
  menu_open = true;
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  menu_open = false;
}
