const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

// A, X: Rock
// B, Y: Paper
// C, Z: Scissors

function play(round) {
  if (['AZ', 'BX', 'CY'].includes(round)) return 0;
  if (['AX', 'BY', 'CZ'].includes(round)) return 3;
  if (['AY', 'BZ', 'CX'].includes(round)) return 6;
}

function getMoveValue(round) {
  if (round.includes('Y')) return round.charCodeAt(0) - 64;
  if (round.includes('X')) return {'B': 'A', 'C': 'B', 'A': 'C'}[round[0]].charCodeAt(0) - 64;
  if (round.includes('Z')) return {'A': 'B', 'B': 'C', 'C': 'A'}[round[0]].charCodeAt(0) - 64;
}

function firstPart(input) {
  score = 0;

  fs.readFileSync(input).toString()
    .split('\r\n')
    .map(round => round.replace(' ', ''))
    .forEach(round => score += round.charCodeAt(1) - 87 + play(round));

  return score;
}

function secondPart(input) {
  score = 0;

  fs.readFileSync(input).toString()
    .split('\r\n')
    .forEach(round => score += getMoveValue(round) + (round.charCodeAt(2) - 88) * 3);

  return score;
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}