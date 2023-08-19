const TOTAL_POPULATION = 100;
let generation = 0;
let dinos = [];
let obstacles = [];
let savedDinos = [];
let score = 0;
let displayScore = 0;
let highScore = 0;
let counter = 0;
let spawnRate = 50;

let cactiSprite_1;
let cactiSprite_2;
let dinoFrames = [];

function preload() {
  cactiSprite_1 = loadImage("assets/cacti_01.png");
  cactiSprite_2 = loadImage("assets/cacti_02.png");

  dinoFrames[0] = loadImage("assets/dino_01.png");
  dinoFrames[1] = loadImage("assets/dino_02.png");
  dinoFrames[2] = loadImage("assets/dino_03.png");
}

function setup() {
  for (let i = 0; i < TOTAL_POPULATION; i++) {
    dinos[i] = new Dino();
  }
  tf.setBackend("cpu");
  createCanvas(800, 300);
  setTimeout(updateScore, 60);
}

function draw() {
  background(255);
  showScore();

  if (counter % spawnRate === 0) {
    obstacles.push(new Obstacle());
  }
  counter++;

  if (dinos.length === 0) {
    if (displayScore > highScore) highScore = displayScore;
    counter = 0;
    displayScore=0;
    score = 0;
    obstacles = [];
    obstacles.push(new Obstacle());
    nextGeneration();
  }

  for (let dino of dinos) {
    dino.update();
    dino.render();
    if (obstacles.length > 0) dino.think(obstacles);
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    obstacles[i].update();
    obstacles[i].render();

    for (let j = dinos.length - 1; j >= 0; j--) {
      if (obstacles[i].collides(dinos[j])) {
        savedDinos.push(dinos.splice(j, 1)[0]);
      }
    }

    if (obstacles[i].offscreen()) {
      obstacles.splice(i, 1);
      score++;
    }
  }
}

function showScore() {
  push();
  fill(0);
  textSize(16);
  text("score: " + displayScore, 10, 20);
  text("high score: " + highScore, 10, 40);
  text("generation: " + generation, 10, 60);
  pop();
}

function updateScore()
{
  displayScore++;
  setTimeout(updateScore, 60);
}
