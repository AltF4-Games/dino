class Obstacle {
  constructor() {
    this.obstacleType = Math.random();
    this.w = 50;
    this.h = random(50, 70);
    this.x = width;
    this.speed = 10 + score / 20;
  }

  update() {
    this.x -= this.speed;
  }

  render() {
    //noFill();
    //rect(this.x, height - this.h, this.w, this.h);
    if (this.obstacleType < 0.5) {
      image(cactiSprite_1, this.x, height - this.h, this.w, this.h);
    } else {
      image(cactiSprite_2, this.x, height - this.h, this.w, this.h);
    }
  }

  offscreen() {
    return this.x < -this.w;
  }

  collides(dino) {
    return (
      this.x < dino.x + dino.size_x &&
      this.x + this.w > dino.x &&
      height - this.h < dino.y + dino.size_y
    );
  }
}
