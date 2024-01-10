const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

function isVisible(r, c, grid) {
  return grid[r].slice(0, c).every(tree => tree < grid[r][c]) ||
    grid[r].slice(c + 1).every(tree => tree < grid[r][c]) ||
    grid.flatMap(row => row[c]).slice(0, r).every(tree => tree < grid[r][c]) ||
    grid.flatMap(row => row[c]).slice(r + 1).every(tree => tree < grid[r][c]);
}

function getScore(r, c, grid) {
  let leftTrees = grid[r].slice(0, c).map(tree => tree < grid[r][c]).lastIndexOf(false);
  let rightTrees = grid[r].slice(c + 1).map(tree => tree < grid[r][c]).indexOf(false);
  let upperTrees = grid.flatMap(row => row[c]).slice(0, r).map(tree => tree < grid[r][c]).lastIndexOf(false);
  let lowerTrees = grid.flatMap(row => row[c]).slice(r + 1).map(tree => tree < grid[r][c]).indexOf(false);

  leftTrees  = leftTrees  == -1 ? c : c - leftTrees;
  rightTrees = rightTrees == -1 ? grid[0].length - c - 1 : ++rightTrees;
  upperTrees = upperTrees == -1 ? r : r - upperTrees;
  lowerTrees = lowerTrees == -1 ? grid[0].length - r - 1 : ++lowerTrees;

  return leftTrees * rightTrees * upperTrees * lowerTrees;
}

function firstPart(input) {
  const grid = fs.readFileSync(input).toString().split('\r\n')
    .map(line => line.split('').map(char => Number(char)));

  return 2 * grid[0].length + 2 * grid.length - 4 +
    grid.slice(1, -1).flatMap((row, r) => 
      row.slice(1, -1).filter((tree, c) => isVisible(r + 1, c + 1, grid))
    ).length;
}

function secondPart(input) {
  const grid = fs.readFileSync(input).toString().split('\r\n')
    .map(line => line.split('').map(char => Number(char)));

  return grid.flatMap((row, r) => row.map((tree, c) => getScore(r, c, grid))).reduce((a, b) => Math.max(a,b));
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}