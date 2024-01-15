const fs = require('node:fs');
const process = require('process');
const Heap = require('heap-js');

module.exports = { firstPart, secondPart }

// This program implements a version of the Djikstra's Algorithm
function firstPart(input) {
  let grid = fs.readFileSync(input).toString().split('\r\n').map(line => line.split(''));
  let rStart = grid.findIndex(line => line.includes('S'));
  let cStart = grid[rStart].indexOf('S');
  let rEnd = grid.findIndex(line => line.includes('E'));
  let cEnd = grid[rEnd].indexOf('E');

  grid[rStart][cStart] = 'a';
  grid[rEnd][cEnd] = 'z';

  let q = new Heap.Heap();
  q.init([[0, rStart, cStart]]); // steps, row, column, previous

  let seen = new Set();

  while (q.length > 0) {
    [steps, r, c] = q.pop();

    for ([i, j] of [[r + 1, c], [r, c + 1], [r - 1, c], [r, c - 1]]) {
      if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) 
        continue;
      if (seen.has([i, j].toString())) 
        continue;
      if (grid[i][j].charCodeAt(0) - grid[r][c].charCodeAt(0) > 1) 
        continue;
      if (i === rEnd && j == cEnd)
        return steps + 1;
      seen.add([i, j].toString());
      q.push([steps + 1, i, j]);
    }
  }
}

// Same as first part but starting from 'E'
function secondPart(input) {
  let grid = fs.readFileSync(input).toString().split('\r\n').map(line => line.split(''));
  let rStart = grid.findIndex(line => line.includes('S'));
  let cStart = grid[rStart].indexOf('S');
  let rEnd = grid.findIndex(line => line.includes('E'));
  let cEnd = grid[rEnd].indexOf('E');

  grid[rStart][cStart] = 'a';
  grid[rEnd][cEnd] = 'z';

  let q = new Heap.Heap();
  q.init([[0, rEnd, cEnd]]);

  let seen = new Set();

  while (q.length > 0) {
    [steps, r, c] = q.pop();

    for ([i, j] of [[r + 1, c], [r, c + 1], [r - 1, c], [r, c - 1]]) {
      if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) 
        continue;
      if (seen.has([i, j].toString())) 
        continue;
      if (grid[r][c].charCodeAt(0) - grid[i][j].charCodeAt(0) > 1) 
        continue;
      if (grid[i][j] === 'a')
        return steps + 1;
      seen.add([i, j].toString());
      q.push([steps + 1, i, j]);
    }
  }
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}