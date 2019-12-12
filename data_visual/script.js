let path = [];
let phase = 0;
let nextStation = 0;
let pass = [];
// let allArrived = false;
let leaving = [];
let bgImage;

// globals for data
let validKey = '504750576b73673135356d566b424f';
let myMonth = '12';
let myDay = '04';
let date = {month: myMonth, day: myDay};
let getData, data;
let url = 'http://openapi.seoul.go.kr:8088/' + validKey + '/json/CardSubwayStatsNew/44/53/2019' + date.month + date.day;
let toll = [];

// globals for vehicles
howDistant = 17;
numbOfTravelers = 200;

// functions begin
function setup() {
  // text('day', 10, 80);
  createCanvas(800, 400);
  bgImage = loadImage('background.png');

  getData = loadJSON(url, saveContent);
  for (var i = 0; i < numbOfTravelers; i++) {
    pass.push(new Passenger());
  }
}

function draw() {
  // background(125, 25, 0);
  image(bgImage, 0, 0);
  displayPath();
  switch (phase) {
    case 0:
      for (var i = 0; i < pass.length; i++) {
        pass[i].show();
      }
      break;
    case 1:
      if (path.length > 0) {
        for (var i = 0; i < pass.length; i++) {
          pass[i].target = path[nextStation];
          pass[i].update();
          pass[i].behave(pass, 'travel');
          pass[i].show();
          pass[i].arrived();
          if(leaving.length > 0 && i < leaving.length){
            leaving[i].update();
            leaving[i].behave(leaving, 'flee');
            leaving[i].show();
            leaving[i].arrived();
            if(leaving[i].goal){
              leaving.splice(i,1);
            }
          }
        }
      }
      break;
    default:
      break;
  }
}

//supplementary functions

// collect the data for the daily travelers, store positive and negative counts
// per station
function saveContent() {
  data = getData.CardSubwayStatsNew;
  for (var i = 0; i < data.row.length; i++) {
    var res = floor((data.row[i].RIDE_PASGR_NUM - data.row[i].ALIGHT_PASGR_NUM)/75);
    console.log(res);
    toll.push(res);
  }
}

// based on station count update the array of passengers by adding the surplus
// or sending off the difference
function updatePassengers(){
  if(toll[nextStation]<0){
    let j = 0;
    for (var i = 0; i > toll[nextStation]; i--) {
      let x = width * cos(random(TWO_PI));
      let y = height * sin(random(TWO_PI));
      let tempPass = pass.pop();
      tempPass.target = createVector(x, y);
      tempPass.c = color(255, 255, 255);
      leaving.push(tempPass);
    }
  } else if(toll[nextStation]>0){
    for (var i = 0; i < toll[nextStation]; i++) {
      let tmpPass = new Passenger();
      tmpPass.c = color(0, 30, 200);
      pass.push(tmpPass);
    }
  }
  console.log('new passenger count: ' + pass.length);
}

function mousePressed() {
  path.push(createVector(mouseX, mouseY));
}

function keyPressed() {
  switch (keyCode) {
    case RETURN:
      phase = 1;
      startCount();
      break;
    case BACKSPACE:
      phase = 0;
      nextStation = 0;
      clearArray(path);
      break;
    // case UP_ARROW:
    //   askForDate(1);
    // case DOWN_ARROW:
    //   askForDate(-1);
    default:
      break;
  }
}

function displayPath() {
  for (let i = 0; i < path.length; i++) {
    push();
    fill(255);
    ellipse(path[i].x, path[i].y, 4, 4);
    pop();
  }
}

function clearArray(arr) {
  for (let i = 0; i = arr.length; i++) {
    arr.pop();
  }
}

function startCount() {
  setInterval(function() {
    // updateData();
    let numbArrived = 0;
    for (var i = 0; i < pass.length; i++) {
      if(pass[i].goal){
        numbArrived++;
      }
    }
    if (phase == 1 && numbArrived == pass.length) {
      updatePassengers();
      nextStation++;
      if (nextStation == path.length) {
        nextStation = 0;
        resetPassengerPos();
      }
    }
  }, 1500);
}

function resetAnim(){
  clearArray(pass);
  clearArray(leaving);
  nextStation = 0;
  console.log('passengers: '+ pass.length);
  // setup();
}

function resetPassengerPos(){
  for (let i = 0; i < pass.length; i++) {
    pass[i].pos = createVector(1, random(height));
  }
}
