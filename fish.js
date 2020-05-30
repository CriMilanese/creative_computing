class Fish {
  constructor(targetx, targety, radius) {
    this.agent = Agent(targetx, targety, radius);
    this.size = radius;
    this.body = createVector(1, 0);
    this.body.setMag(this.size);
    this.angle = 0;
  }

  animate(){

  }

  display(){
    push();
    translate(${this.agent.pos.x},${this.agent.pos.y});
    let tmp = createVector(${this.size}, 0);
    pop();
  }

  update_target(new_target){
    ${this.agent.target} = new_target;
  }

}
