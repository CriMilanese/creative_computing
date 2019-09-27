var r, g, b;
var menu_open = false;
var strokeMenu;
var stroke_menu_open = false;
var pickerColor, whichShape, whatColor;
var angle = 0;
var button, imgTools, imgSave;
var myScale, funky;
var ax, ay, bx, by, cx, cy;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 0, 0);
  menu_open = false;
  imgTools = createImg('images/burger_button.png');
  imgSave = createImg('images/saveFile.png');
  imgTools.position(10,10);
  imgSave.position(windowWidth - 110, 10)
  imgTools.size(100, 100);
  imgSave.size(100, 100);
  myScale = Math.min(
    windowWidth / 100,
    windowHeight / 100
  );
  pickerColor = select('#markerColor');
  imgTools.mousePressed(openNav);
  imgSave.mousePressed(saveFile);
  strokeMenu = select(".strokeSetup");
  rectMode(CENTER);
  noFill();
  angleMode(DEGREES);
}

function draw() {
  var size = random(5, 50);
  r = random(1, 255);
  g = random(1, 255);
  b = random(1, 255);
  funky = goFunkyColor();
  if(mouseIsPressed && menu_open == false){
    print(funky);
    if(funky == true){
      stroke(r, g, b);
    } else {
      whatColor = pickerColor.value();
      stroke(whatColor);
    }
    switch (whichShape){
      case 'triangle':
        drawTriangle(size);
        break;
      case 'circle':
        ellipse(pmouseX, pmouseY, size, size);
        break;
      case 'square':
        drawSquare(size);
        break;
      default:
        ellipse(pmouseX, pmouseY, size, size);
    }
  } else if(keyIsPressed){
    if(keyCode == BACKSPACE){
      background(0,0,0);
    }
  }
  angle += 10;
  if(angle > 360){
    angle = 0;
  }
}

function drawTriangle(sz){
  push();
  calcEquiVertex(sz);
  translate(pmouseX, pmouseY);
  rotate(angle);
  triangle(ax, ay, bx, by, cx, cy);
  pop();
}

function drawSquare(sz){
  push();
  translate(pmouseX, pmouseY);
  rotate(angle);
  rect(0, 0, sz, sz);
  pop();
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

function calcEquiVertex(sz){
  cx = 0;
  cy = 0 - sz;
  ax = cx * cos( 120 ) - ( cy * sin( 120 ) );
  ay = cx * sin( 120 ) + ( cy * cos( 120 ) );
  bx = cx * cos( 240 ) - ( cy * sin( 240 ) );
  by = cx * sin( 240 ) + ( cy * cos( 240 ) );
}

function goFunkyColor(value){
  if(value){
    return true;
  } else {
    return false;
  }
}

function toggleStrokeSetup(){
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

function saveFile(){
  saving = true;
  saveCanvas('myArtOnCanvas', 'png');
  saving = false;
}
