const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

let limit;
var grid;
var blocks;

// Check if sand comes to rest
function dropSand(r, c) {
  if (r + 1 >= grid.length || c - 1 < 0 || c + 1 >= grid[0].length) {
    return false;
  }

  if (!grid[r + 1][c]) {
    return dropSand(r + 1, c);
  }

  if (!grid[r + 1][c - 1]) {
    return dropSand(r + 1, c - 1)
  }

  if (!grid[r + 1][c + 1]) {
    return dropSand(r + 1, c + 1)
  }

  grid[r][c] = true;
  return true;
}

function parseGridAndLimits(input) {
  // Get paths
  let paths = fs.readFileSync(input).toString().split('\r\n').map(line => 
    line.split(' -> ').map(point => point.split(',').map(e => Number(e)))
  );

  // Get boundaries and create grid with them
  let bottom  = Math.max(...paths.flatMap(path => path.map(point => point[1])));
  let left    = Math.min(...paths.flatMap(path => path.map(point => point[0])));
  let right   = Math.max(...paths.flatMap(path => path.map(point => point[0])));
  grid = Array.from(Array(bottom + 1), () => new Array(right - left + 1).fill(false));

  // Occupy grid with boundaries
  paths.forEach(path => {
    for (let i = 1; i < path.length; i++) {
      [xStart, xEnd] = [path[i][0], path[i - 1][0]].sort((a, b) => a - b);
      [yStart, yEnd] = [path[i][1], path[i - 1][1]].sort((a, b) => a - b);

      for (let x = xStart; x <= xEnd; x++) 
        for (let y = yStart; y <= yEnd; y++)
            grid[y][x - left] = true;
    }
  });

  return left;
}

function firstPart(input) {
  let left = parseGridAndLimits(input);

  // Count blocks until they start falling
  let count = 0;
  while (dropSand(0, 500 - left))
    count++;

  return count;
}

function dropSandInSet(x, y) {
  if (y >= limit) {
    blocks.add([x, y ].toString());
    return false;
  }

  if (!blocks.has([x, y + 1].toString())) {
    return dropSandInSet(x, y + 1);
  }

  if (blocks.has([x, y + 1].toString()) && 
      blocks.has([x - 1, y + 1].toString()) && 
      blocks.has([x + 1, y + 1].toString())) {
    blocks.add([x, y].toString());
    return true;
  }

  if (!blocks.has([x - 1, y + 1].toString())) {
    return dropSandInSet(x - 1, y + 1);
  }

  if (!blocks.has([x + 1, y + 1].toString())) {
    return dropSandInSet(x + 1, y + 1);
  }
}

function secondPart(input) {
  // Get paths
  let paths = fs.readFileSync(input).toString().split('\r\n').map(line => 
    line.split(' -> ').map(point => point.split(',').map(e => Number(e)))
  );

  // Get set of blocks
  blocks = new Set();
  limit = 0;
  paths.forEach(path => {
    for (let i = 1; i < path.length; i++) {
      [xStart, xEnd] = [path[i][0], path[i - 1][0]].sort((a, b) => a - b);
      [yStart, yEnd] = [path[i][1], path[i - 1][1]].sort((a, b) => a - b);

      limit = Math.max(limit, yEnd);

      for (let x = xStart; x <= xEnd; x++) 
        for (let y = yStart; y <= yEnd; y++) 
          blocks.add([x, y].toString());
    }
  });

  limit += 2;
  let count = 0;

  while (true)
    while (dropSandInSet(500, 0)) {
      count++;
      if (blocks.has([500, 0].toString())) 
        return count;
    }
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}