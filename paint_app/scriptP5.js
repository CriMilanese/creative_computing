var r, g, b;
var menu_open = false;
var strokeMenu;
var stroke_menu_open = false;
var pickerColor, whichShape, whatColor;
var angle = 0;
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
  angleMode(DEGREES);
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
        rotate(angle);
        triangle(ax, ay, bx, by, pmouseX, pmouseY - size);
        break;
      case 'circle':
        ellipse(pmouseX, pmouseY, size, size);
        break;
      case 'square':
        rectMode(CENTER);
        rotate(angle);
        rect(pmouseX, pmouseY, size, size);
        break;
      default:
        ellipse(pmouseX, pmouseY, size, size);
    }
  } else if(keyIsPressed){
    background(0,0,0);
  }
  angle += 10;
  if(angle > 360){
    angle = 0;
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

function calcEquiVertex(origX, origY){
  ax = origX * cos( 120 ) - ( origY * sin( 120 ) )
  ay = origX * sin( 120 ) + ( origY * cos( 120 ) )
  bx = origX * cos( 240 ) - ( origY * sin( 240 ) )
  by = origX * sin( 240 ) + ( origY * cos( 240 ) )
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
