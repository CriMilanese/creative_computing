var x = 0;
var y = 0;
let cnv;
var stepSize = 5.0;
var font = 'Georgia';
var letters = "Cristiano";
var fontSizeMin = 3;
var counter = 0;

function setup() {
  // use full screen size
  cnv = createCanvas(displayWidth, displayHeight);
  cnv.mouseReleased(setBack);
  background(255);
  cursor(CROSS);
  x = mouseX;
  y = mouseY;
  textFont(font);
  textAlign(LEFT);
  fill(0);
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT && counter <= letters.length) {
    var d = dist(x, y, mouseX, mouseY);
    textSize(fontSizeMin + d / 2);
    var newLetter = letters.charAt(counter);
    stepSize = textWidth(newLetter);
    if (d > stepSize) {
      var angle = atan2(mouseY - y, mouseX - x);
      push();
      translate(x, y);
      rotate(angle);
      text(newLetter, 0, 0);
      pop();
      counter++;
      // if (counter >= letters.length) counter = 0;
      x = x + cos(angle) * stepSize;
      y = y + sin(angle) * stepSize;
    }
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}
r
function setBack() {
  counter = 0;
}
