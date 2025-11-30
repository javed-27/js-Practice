const coordinates = [];
let screen = [];
const createScreen = ({ maxX, maxY, min }) => {
  const screen = [];
  for (let i = 0; i <= maxX; i++) {
    screen.push("🟩".repeat(maxY + 1).match(/🟩/g));
  }
  return screen;
};

const drwOnScreen = (arr, screen) => {
  screen[arr[0]][arr[1]] = "🚍";
};

const clearScreen = (arr, screen) => {
  screen[arr[0]][arr[1]] = "🟩";
};

const compass = {
  N: { L: "W", R: "E", moves: { xm: 0, ym: 1 } },
  E: { L: "N", R: "S", moves: { xm: 1, ym: 0 } },
  S: { L: "E", R: "W", moves: { xm: 0, ym: -1 } },
  W: { L: "S", R: "N", moves: { xm: -1, ym: 0 } },
};

const roverPosition = ({ x, y, heading }) => `${x} ${y} ${heading}`;

export const turnRight = (positions) =>
  positions.heading = compass[positions.heading].R;

export const turnLeft = (positions) =>
  positions.heading = compass[positions.heading].L;

const canMove = ({ maxX, maxY, min }, { x, y, heading }) => {
  const validMove = {
    "N": () => (y < maxY),
    "E": () => (x < maxX),
    "S": () => (y > min),
    "W": () => (x > min),
  };
  return validMove[heading]();
};

export function moveForward(positions) {
  const { xm, ym } = compass[positions.heading].moves;
  positions.x += xm;
  positions.y += ym;
  return positions;
}

const moveRover = (range, positions, instructions) => {
  const arr = [];
  const movements = {
    R: turnRight,
    L: turnLeft,
    M: moveForward,
  };
  for (const instruction of instructions) {
    if (!canMove(range, positions) && instruction === "M") {
      coordinates.push(arr);
      return `${roverPosition(positions)} RIP`;
    }
    arr.push([positions.x, positions.y]);
    movements[instruction](positions);
  }
  coordinates.push(arr);
  return roverPosition(positions);
};

const parsePositions = (position) => {
  const [x, y, heading] = position.split(" ");
  return {
    x: parseInt(x),
    y: parseInt(y),
    heading,
  };
};

const parsePlateau = (plateau) => {
  const [maxX, maxY, min = 0] = parseInt(plateau[0])
    ? plateau.split(" ")
    : [Infinity, Infinity, -Infinity];
  return {
    maxX: +maxX,
    maxY: +maxY,
    min,
  };
};

const parse = (input) => {
  const splitedInput = input.split("\n");
  const [plateau, noOfRovers] = splitedInput;
  const initialPositions = splitedInput.splice(2, noOfRovers).map((x) =>
    parsePositions(x)
  );
  const instructions = splitedInput.splice(splitedInput.length - noOfRovers);
  const parsedPlateau = parsePlateau(plateau);
  const rovers = instructions.map((instruction, i) => ({
    "initialPositions": initialPositions[i],
    plateau,
    instruction,
  }));
  return [initialPositions, instructions, parsedPlateau, rovers];
};

export const executeInstructions = (input) => {
  const [initialPositions, instruction, plateau, rovers] = parse(input);
  screen = createScreen(plateau);
  const result = instruction.map((instruction, i) =>
    moveRover(plateau, initialPositions[i], instruction, screen)
  );
  return result.join("\n");
};
let i = 0;
let counter = 0;
executeInstructions(
  "20 15\n8\n0 0 N\n20 5 E\n10 0 S\n0 7 W\n5 5 N\n10 7 E\n15 10 S\n3 12 W\n\nMMMMRMMMMRMMMMRMMMMRMMMM\nLMMMMMMMMMMMMRMMMMMMMMMM\nMMMMMMMMMMMMMMMLMMMMMMMM\nRMMMMMMMMMMMRMMMMMMMMMMM\nMMMMMMMMRMMMMMMMMRMMMMMM\nRMMMMMLMMMMMRMMMMMLMMMMM\nLMMMMRMMMMRMMMMRMMMMRMMM\nMMMMRMMMMRMMMMMMMMRMMMMM",
);
const id = setInterval(() => {
  for (let j = 0; j < coordinates.length; j++) {
    if (coordinates[j].length > i) {
      counter++;
      drwOnScreen(coordinates[j][i], screen);
    }
  }

  if (coordinates.flat().length === counter) clearInterval(id);
  console.clear();
  console.log(screen.map((x) => x.join("")).join("\n"));

  for (let j = 0; j < coordinates.length; j++) {
    if (coordinates[j].length > i + 1) {
      clearScreen(coordinates[j][i], screen);
      console.log(
        "rover ",
        j + 1,
        " x ::",
        coordinates[j][i][0],
        " y ::",
        coordinates[j][i][1],
      );
    }
  }
  i++;
}, 5000);
