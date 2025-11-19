const turnRight = axes => {
  const directions = ["E", "S", "W", "N"]
  axes.direction = directions[directions.indexOf(axes.direction)+1%4];
}

const turnLeft = axes => {
  const directions = ["E", "S", "W", "N"]
  axes.direction = directions[(directions.indexOf(axes.direction)+3)%4];
}

const move = (direction, axes) => {
  switch (direction) {
    case "N": return axes.y += 1;
    case "E": return axes.x += 1;
    case "S": return axes.y -= 1;
    case "W": return axes.x -= 1;
  };
  }

const moveRover = (axes, instructions) => {
  instructions.split('').forEach(element => {
    switch (element) {
     case "R": turnRight(axes); break
     case "L": turnLeft(axes); break
     case "M": move(axes.direction, axes) ;
    };
    });
  return [axes.x,axes.y,axes.direction].join(" ");
};

export const executeInstructions = (position, instructions) => {
  const [x, y, direction] = position.split(" ");
  const axes = { x: parseInt(x), y: parseInt(y), direction };
  return moveRover(axes, instructions);
};
