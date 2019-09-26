var r, g, b;
var menu_open = false;
var strokeMenu;
var stroke_menu_open = false;
var pickerColor, whichShape, whatColor;
var button, imgTools;
var myScale, funky;
var ax, ay, bx, by;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  menu_open = false;
  imgTools = createImg('images/burger_button.png');
  imgTools.position(10,10);
  imgTools.size(100, 100);
  myScale = Math.min(
    windowWidth / 100,
    windowHeight / 100
  );
  pickerColor = select('#markerColor');
  imgTools.attribute('transform', 'scale(myScale)');
  imgTools.mousePressed(openNav);
  strokeMenu = select(".strokeSetup");
}

function draw() {
  var size = random(5, 50);
  r = random(1, 255);
  g = random(1, 255);
  b = random(1, 255);
  noFill();
  if(mouseIsPressed && menu_open == false){
    if(funky == true){
      stroke(r, g, b);
    } else {
      whatColor = pickerColor.value();
      print(whatColor);
      stroke(whatColor);
    }
    switch (whichShape){
      case 'triangle':
        calcEquiVertex(pmouseX, pmouseY - size);
        triangle(ax, ay, pmouseX, pmouseY - size, bx, by);
        break;
      case 'circle':
        ellipse(pmouseX, pmouseY, size, size);
        break;
      case 'square':
        rect(pmouseX, pmouseY, size);
        break;
      default:
        ellipse(pmouseX, pmouseY, size, size);
    }
  } else if(keyIsPressed){
    background(0,0,0);
  }
}

function openNav() {
  menu_open = true;
  document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  menu_open = false;
}

function smallMark(){
  strokeWeight(2);
  closeNav();
}
function medMark(){
  strokeWeight(4);
  closeNav();
}
function largeMark(){
  strokeWeight(6);
  closeNav();
}
function calcEquiVertex(origX, origY, size){
  bx = origX * cos(120 * TWO_PI/180) - ( origY * sin( 120 * TWO_PI/180 ) )
  by = origX * sin( 120 * TWO_PI/180 ) + ( origY * cos( 120 * TWO_PI/180 ) )
  ax = origX * cos( 240 * TWO_PI/180 ) - ( origY * sin( 240 * TWO_PI/180 ) )
  ay = origX * sin( 240 * TWO_PI/180 ) + ( origY * cos( 240 * TWO_PI/180 ) )
}

function goFunkyColor(value){
  if(value){
    funky = true;
  } else {
    funky = false;
  }
}

function openStrokeSetup(){
  if(stroke_menu_open == true){
    closeStrokeSetup();
  } else {
    stroke_menu_open = true;
    strokeMenu.show();
  }
}

function closeStrokeSetup(){
  strokeMenu.hide();
  stroke_menu_open = false;
}

function triangleTool(){
  whichShape = "triangle";
  closeNav();
}
function circleTool(){
  whichShape = "circle";
  closeNav();
}
function boxTool(){
  whichShape = "square";
  closeNav();
}
