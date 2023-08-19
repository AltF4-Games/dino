class Dino {
  constructor(brain) {
    this.x = 50;
    this.y = height - 50;
    this.gravity = 0.6;
    this.lift = -13;
    this.velocity = 0;
    this.jumping = false;
    this.size_x = 50;
    this.size_y = 50;

    this.score = 0;
    this.fitness = 0;
    if (brain) {
      this.brain = brain.copy();
    } else {
      this.brain = new NeuralNetwork(5, 8, 2);
    }
  }

  dispose() {
    this.brain.dispose();
  }

  jump() {
    if (!this.jumping) {
      this.velocity += this.lift;
      this.jumping = true;
    }
  }

  mutate() {
    this.brain.mutate(0.1);
  }

  update() {
    this.score++;
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y >= height - this.size_y) {
      this.y = height - this.size_y;
      this.velocity = 0;
      this.jumping = false;
    }
  }

  think(obstacles) {
    let closest = null;
    let closestD = Infinity;
    for (let i = 0; i < obstacles.length; i++) {
      let d = obstacles[i].x + obstacles[i].w - this.x;
      if (d < closestD && d > 0) {
        closest = obstacles[i];
        closestD = d;
      }
    }

    if (closest == null && obstacles[0] != null) closest = obstacles[0];

    let inputs = [];
    inputs[0] = this.y / height;
    inputs[1] = closest.x / width;
    inputs[2] = this.velocity / 10;
    inputs[3] = closest.h / height;
    inputs[4] = closest.speed / 100;
    let output = this.brain.predict(inputs);
    if (output[0] > output[1]) {
      this.jump();
    }
  }

  render() {
    //rect(this.x, this.y, this.size_x, this.size_y);
    let sprite;
    if (this.jumping) sprite = dinoFrames[0];
    else sprite = dinoFrames[floor(frameCount % dinoFrames.length)];

    image(sprite, this.x, this.y, this.size_x, this.size_y);
  }
}
