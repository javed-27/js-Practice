function isValidChoice(userChoice) {
  return userChoice === 'R' || userChoice === 'P' || userChoice === 'S';
}

function computing(botChoice, userChoice) {
  console.log("\n\"you choice", chooseSymbol(userChoice),
    "X", chooseSymbol(botChoice), " bot choice\"");

  let isUserWon = false;
  switch (userChoice) {
    case 'R': if (botChoice === 'S') isUserWon = true;
      break;
    case 'P': if (botChoice === 'R') isUserWon = true;
      break;
    case 'S': if (botChoice === 'P') isUserWon = true;
      break;
    default: console.log("invalid input");
      break;
  }
  let message = isUserWon ? "you win 🎉🎉🎉" : "you lose 👻👻👻";
  if (botChoice === userChoice) message = "draw happens "
  console.log(message);
  return isUserWon;
}

function chooseSymbol(symbol) {
  switch (symbol) {
    case "R": return "🪨";
    case "P": return "📄";
    case "S": return "✂️";
    default: return 1
  }
}

function game(points = 0, moves = 3) {
  if (moves <= 0) {
    console.log("\nyou score is ", points, "\n\n");
    return 1;
  }

  const possibleOutcomes = "RPS";
  const index = Math.round(Math.random() * 100) % 3;
  const botChoice = possibleOutcomes[index];
  let userChoice = prompt("\nenetr your choice \nrock 🪨 -> R\npaper 📄 -> P\nscissors ✂️ -> S\n");
  userChoice = userChoice.toUpperCase();
  if (!isValidChoice(userChoice)) {
    console.log("\nplease selct a valid choice ::");
    return game(points, moves);
  }
  if (botChoice === userChoice) moves++;

  points += computing(botChoice, userChoice) ? 1 : 0;
  game(points, moves - 1);
}

function play() {
  console.log("welcome to game rock paper and scissors\n");
  console.log("\nBest of 3 if draw happens the round not countes");
  game();
}

play();
