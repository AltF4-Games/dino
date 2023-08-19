function nextGeneration() {
  calculateFitness();

  for (let i = 0; i < TOTAL_POPULATION; i++) {
    dinos[i] = pickBest();
  }
  for (let i = 0; i < TOTAL_POPULATION; i++) {
    savedDinos[i].dispose();
  }
  savedDinos = [];
  generation++;
  console.log("next gen");
}

function pickBest() {
  let index = 0;
  let r = random(1);

  while (r > 0) {
    r = r - savedDinos[index].fitness;
    index++;
  }
  index--;

  let dino = savedDinos[index];
  let child = new Dino(dino.brain);
  child.mutate();
  return child;
}

function calculateFitness() {
  let sum = 0;
  for (let dino of savedDinos) {
    sum += dino.score;
  }

  for (let dino of savedDinos) {
    dino.fitness = dino.score / sum;
  }
}
