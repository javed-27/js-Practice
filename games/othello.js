function initialSetUp(userSymbols) {
  const gameValues = [];
  for (let index = 0; index < 9; index++) { // for dummy around the box
    const columns = [];
    for (let index2 = 0; index2 < 9; index2++) {
      columns.push("  ");
    }
    gameValues.push(columns);
  }

  gameValues[4][4] = gameValues[5][5] = userSymbols[0];
  gameValues[4][5] = gameValues[5][4] = userSymbols[1];
  displyFormat(gameValues);
  return gameValues;
}

function contentCopy(input) {
  let output = [];
  for (let rows = 0; rows < input.length; rows++) {
    output.push([]);
    for (let columns = 0; columns < input[rows].length; columns++)
      output[rows][columns] = input[rows][columns];
  }
  return output;
}

function displyFormat(gameValues) {
  const formate = [];
  const coordinates = "   1  2  3  4  5  6  7  8";
  const padding = "\n   ----------------------- \n";
  const gameValuesCopy = contentCopy(gameValues);

  for (let index = 1; index < gameValuesCopy.length; index++) {
    gameValuesCopy[index].push(" " + index);
    formate.push(gameValuesCopy[index].join("|"));
  }
  console.clear();
  console.log(coordinates + padding + formate.join("\n") + padding + coordinates);
  // console.log(gameValues);

}

function changeValues(gameValues, start, end, path, currentUser) {
  for (let index = start; index < end; index++) {
    gameValues[index][path] = currentUser;
  }
  return 1;
}

function changeValuesColums(gameValues, start, end, path, currentUser) {
  console.log(start, end, path);
  for (let index = start; index <= end; index++) {
    gameValues[path][index] = currentUser;
  }
  return 1;
}

function changeValuesDiagonal(gameValues, start, end, path, currentUser) {
  console.log(start, end, path);
  for (let index = 0; index + start <= end; index++) {
    gameValues[start + index][path + index] = currentUser;
  }
  return 1;
}

function changeValuesDiagonalLeft(gameValues, start, end, path, currentUser) {
  console.log(start, end, path);
  for (let index = 0; index + start <= end; index++) {
    gameValues[start + index][path - index] = currentUser;
  }
  return 1;
}

function updateDownRightDiagonal(column, row, gameValues, currentUser, competitor) {
  const big = row > column ? row : column;
  if (big + 1 === 9 || gameValues[column + 1][row + 1] !== competitor) {
    return 1;
  }
  const firstFound = [column + 1, row + 1];
  for (let index = 1; big + index < 9; index++) {
    console.log(index, row + index, column + index);
    if (gameValues[row + index][column + index] === "  ") return 1;
    if (gameValues[row + index][column + index] === currentUser) {

      const lastFound = [column + index, row + index];
      console.log(firstFound, lastFound);

      return changeValuesDiagonal(gameValues, firstFound[0], lastFound[0], firstFound[1], currentUser);
    }
  }
  return 1;
}

function updateUpLeftDiagonal(column, row, gameValues, currentUser, competitor) {
  const small = row > column ? row : column;
  if (small - 1 === 0 || gameValues[column - 1][row - 1] !== competitor) {
    return 1;
  }
  const firstFound = [column - 1, row - 1];
  for (let index = 1; small - index > 0; index++) {
    console.log(index, row + index, column + index);
    if (gameValues[row - index][column - index] === "  ") return 1;
    if (gameValues[row - index][column - index] === currentUser) {

      const lastFound = [column - index, row - index];
      console.log("FL", firstFound, lastFound);

      return changeValuesDiagonal(gameValues, lastFound[0], firstFound[0], lastFound[1], currentUser);
    }
  }
  return 1;
}

function updateUpRightDiagonal(column, row, gameValues, currentUser, competitor) {
  if (row + 1 === 9 || column - 1 === 0 || gameValues[column - 1][row + 1] !== competitor) {
    return 1;
  }

  const firstFound = [column - 1, row + 1];
  for (let index = 1; row + index < 9; index++) {
    console.log(index, column - index, row + index);
    if (gameValues[column - index][row + index] === "  ") return 1;
    if (gameValues[column - index][row + index] === currentUser) {

      const lastFound = [row + index, column - index];
      console.log(firstFound, lastFound);

      return changeValuesDiagonalLeft(gameValues, firstFound[1], firstFound[0] + 1, lastFound[0], currentUser);
    }
  }
  return 1;
}

function updateDownLeftDiagonal(column, row, gameValues, currentUser, competitor) {
  if (row - 1 === 0 || column + 1 === 9 || gameValues[column + 1][row - 1] !== competitor) {
    return 1;
  }

  const firstFound = [column + 1, row - 1];
  for (let index = 1; column + index < 9; index++) {
    console.log(index, row - index, column + index,);
    if (gameValues[column + index][row - index] === "  ") return 1;
    if (gameValues[column + index][row - index] === currentUser) {

      const lastFound = [column + index, row - index];
      console.log(firstFound, lastFound);

      return changeValuesDiagonalLeft(gameValues, firstFound[0], lastFound[0], firstFound[1], currentUser);
    }
  }
  return 1;
}

function updateColumnRight(column, row, gameValues, currentUser, competitor) {
  if (row === 0 || gameValues[column][row + 1] !== competitor) {
    return 1;
  }

  const firstFound = [row + 1, column];
  for (let index = row + 1; index < 8; index++) {
    if (gameValues[column][index] === "  ") return 1;
    if (gameValues[column][index] === currentUser) {
      const lastFound = [index, column];
      return changeValuesColums(gameValues, firstFound[0], lastFound[0], column, currentUser);
    }
  }
  return 1;
}

function updateColumnLeft(column, row, gameValues, currentUser, competitor) {
  if (row === 0 || gameValues[column][row - 1] !== competitor) {
    return 1;
  }
  console.log("left")
  const firstFound = [row, column];
  for (let index = row - 1; index > 1; index--) {
    console.log(column, index)
    if (gameValues[column][index] === "  ") return 1;
    if (gameValues[column][index] === currentUser) {
      console.log("left")
      const lastFound = [index, column];
      return changeValuesColums(gameValues, lastFound[0], firstFound[0], column, currentUser);
    }
  }
  return 1;
}


function updateRowUp(column, row, gameValues, currentUser, competitor) {
  if (column === 0 || gameValues[column - 1][row] !== competitor) {
    return 1;
  }
  console.log(" beside the compitetri");

  const firstFound = [column, row];
  for (let index = column - 1; index > 1; index--) {
    if (gameValues[index][row] === "  ") return 1;
    if (gameValues[index][row] === currentUser) {
      const lastFound = [index, row];
      return changeValues(gameValues, lastFound[0], firstFound[0], row, currentUser);
    }
  }

  return 1;
}

function updateRowDown(column, row, gameValues, currentUser, competitor) {
  if (column + 1 === 9 || gameValues[column + 1][row] !== competitor) {
    return 1;
  }
  const firstFound = [column + 1, row];
  for (let index = column + 1; index < 9; index++) {
    if (gameValues[index][row] === "  ") return 1;
    if (gameValues[index][row] === currentUser) {
      const lastFound = [index, row];
      return changeValues(gameValues, firstFound[0], lastFound[0], row, currentUser);
    }
  }
  return 1;
}

function isValidPositions(row, columns) {
  const areInRange = row > 0 && row < 9 && columns > 0 && columns < 9;
  const areNumbers = typeof (row) === "number" && typeof (columns) === "number";
  return areInRange && areNumbers;
}

function isPositionEmpty(rows, column, gameValues) {
  const isEmpty = gameValues[rows][column] === "  ";
  return isEmpty;
}



function updateGameValues(gameValues, currentUser, competitor) {

  let positions = prompt("\nenter you position coordinates");
  const row = parseInt(positions.slice(0, positions.indexOf(",")));
  const column = parseInt(positions.slice(positions.indexOf(",") + 1, positions.length));

  if (positions.length !== 3 || !isValidPositions(column, row)) {
    console.log("enter valid positions i.e. 1 to 8 ⚠️");
    return updateGameValues(gameValues, currentUser, competitor);
  }

  if (!isPositionEmpty(column, row, gameValues)) {
    console.log("selected position is not empty ⚠️ :: ");
    return updateGameValues(gameValues, currentUser, competitor);
  }

  updateRowUp(column, row, gameValues, currentUser, competitor);
  updateRowDown(column, row, gameValues, currentUser, competitor);
  updateColumnRight(column, row, gameValues, currentUser, competitor);
  updateColumnLeft(column, row, gameValues, currentUser, competitor);
  updateDownRightDiagonal(column, row, gameValues, currentUser, competitor);
  updateDownLeftDiagonal(column, row, gameValues, currentUser, competitor);
  updateUpRightDiagonal(column, row, gameValues, currentUser, competitor);
  updateUpLeftDiagonal(column, row, gameValues, currentUser, competitor)
  gameValues[column][row] = currentUser;
  displyFormat(gameValues);
}

function game(userSymbols = [" 0", " 1"]) {
  const toggleUser = userSymbols;
  const gameValues = initialSetUp(toggleUser);
  for (let index = 0; index < 62; index++) {
    console.log("\nuser  :: ", toggleUser[index % 2], " chance");
    updateGameValues(gameValues, toggleUser[index % 2], toggleUser[(index % 2 + 1) % 2]);
  }
}

// game();
game(["⚪", "🔴"]);
