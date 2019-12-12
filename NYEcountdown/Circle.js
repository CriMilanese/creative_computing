function Circle(x, y) {
  this.x = x;
  this.y = y;
  this.r = 2;
  this.c = color(random(255), random(255), random(255));
  this.tooBig = false;
  this.fire = false;
  this.done = false;
  this.fireworks = [];
  this.lifespan = 255;

  this.buildFireworks = function() {
    for (var i = 0; i < 30; i++) {
      let rangeX = random(this.x - this.r, this.x + this.r);
      let rangeY = random(this.y - this.r, this.y + this.r);
      this.fireworks.push(new Firework(rangeX, rangeY));
    }
  }

  this.grow = function() {
    this.r += 0.1;
  }

  this.stop = function(arr) {
    for (var i = 0; i < arr.length; i++) {
      let d = dist(arr[i].x, arr[i].y, this.x, this.y);
      if (d < (arr[i].r + this.r) && d > 0) {
        arr[i].tooBig = true;
        this.tooBig = true;
      }
    }
  }

  this.show = function() {
    if (!this.fire) {
      fill(this.c);
      ellipse(this.x, this.y, this.r * 2, this.r * 2);
    } else {
      let gravity = createVector(0, 0.03);
      if (this.lifespan > 0) {
        this.lifespan -= 2;
      } else {
        this.done = true;
      }
      for (var i = 0; i < this.fireworks.length; i++) {
        this.fireworks[i].applyForce(gravity);
        this.fireworks[i].update();
        this.fireworks[i].show(this.c);
        // gravity.add(createVector())
      }
    }
  }
}
