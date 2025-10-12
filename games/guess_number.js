function genarateSecrectNumber() {
  return Math.round(Math.random() * 100);
}

function checkGuess(guess, secrectNumber, chance) {

  if (guess === secrectNumber) {
    console.log("\n\"\your guess is correct  🎉\"\n");
    return 1;
  }

  if (guess < secrectNumber) {
    console.log("\n\"entered value is too low\"\n");
    return numberGuess(secrectNumber, chance - 1);
  }

  console.log("\n\"entered value is too high\"\n");
  return numberGuess(secrectNumber, chance - 1);
}

function numberGuess(secrectNumber, chance = 5) {
  const guess = parseInt(prompt("Guess The Number"));

  if (chance <= 1) {
    console.log("\n\"chances are over  number is ", secrectNumber, " \"\n");
    return 0;
  }
  checkGuess(guess, secrectNumber, chance);
}

function play() {
  const secrectNumber = genarateSecrectNumber();
  numberGuess(secrectNumber);
  return wantToPlayAgin() ? play() : 1;
}

function wantToPlayAgin() {
  return confirm("want to play again");
}

play();
