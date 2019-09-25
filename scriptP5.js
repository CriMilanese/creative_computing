var r, g, b;
var menu_open = false;
var button, imgTools;

function preload(){
  //this file is used to load images and sound and other thinks
  // and it happens to eb run even before setup
  imgTools = loadImage('images/burger_button.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  menu_open = false;
  button = createButton('Tools');
  // imgTools.style();
  button.position(10,10);
  button.mousePressed(openNav);
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
    image(imgTools, pmouseX, pmouseY);
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
