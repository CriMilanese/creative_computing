function Passenger() {
  // let prob = random(1);
  // spawn a passenger on each side with equal probability
  // if(prob <= 0.25){
    this.pos = createVector(0, random(height));
  // } else if(prob <= 0.5 && prob >0.25){
  //   this.pos = createVector(random(width), 0);
  // } else if (prob > 0.5 && prob <=0.75) {
  //   this.pos = createVector(width, random(height));
  // } else {
  //   this.pos = createVector(random(width), height);
  // }
  this.target = this.pos;
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.radius = 8;
  this.maxSpeed = 5;
  this.maxForce = 0.5;
  this.c = color(255, 0, 0);
  this.goal = false;
}

// change its acceleration (and therefore speed) based on distance from target
Passenger.prototype.update = function() {
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.acc.mult(0);
}

// draw the passenger
Passenger.prototype.show = function() {
  fill(this.c);
  ellipse(this.pos.x, this.pos.y, this.radius, this.radius)
}

// calculate vector towards target
// limit the speed based on distance from target
Passenger.prototype.seek = function(t) {
  var desired = p5.Vector.sub(t, this.pos);
  var d = desired.mag();
  var speed = this.maxSpeed;
  if (d < 800) {
    speed = map(d, 100, 0, this.maxSpeed, 0);
  }
  desired.setMag(speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxForce);
  return steer;
}

// two kinds of behavior, seek the target and stay away from your neighbors
Passenger.prototype.behave = function(others, mode) {
  var pointTo = this.seek(this.target);
  if(mode != 'flee'){
    var keepAwayFrom = this.separate(others);
    this.force(keepAwayFrom);
  }
  this.force(pointTo);

}

// stay away from your neighbors
Passenger.prototype.separate = function(others) {
  let sum = createVector();
  let count = 0;
  for (let j = 0; j < others.length; j++) {
    let d = this.pos.dist(others[j].pos);
    if (d < howDistant && d > 0) {
      // force points to opposite direction
      let diff = p5.Vector.sub(this.pos, others[j].pos);
      diff.normalize();
      diff.div(d);
      sum.add(diff);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxSpeed);
    // here we go steering = desired - velocity
    let steer = p5.Vector.sub(sum, this.vel);
    steer.limit(this.maxForce);
    return steer;

  }
}

// apply a force to your current velocity
Passenger.prototype.force = function(f) {
  this.acc.add(f);
}

Passenger.prototype.arrived = function(){
  if(this.pos.dist(this.target) < 50){
    // console.log('I reached my goal');
    this.goal = true;
    this.c = (0, 0, 0);
  } else {
    this.goal = false;
  }
}
