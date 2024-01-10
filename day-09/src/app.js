const fs = require('node:fs');
const process = require('process');
const Knot = require('./knot');

module.exports = { firstPart, secondPart };

function getNumTailPositions(input, numberOfKnots) {
  let tail_positions = new Set();
  let knots = Array.from({length: numberOfKnots}, e => new Knot());
  
  for (let line of fs.readFileSync(input).toString().split('\r\n')) {
    [direction, steps] = line.split(' ');

    for (let step = 0; step < Number(steps); step++) {
      knots[0].move(direction);
      for (let i = 1; i < numberOfKnots; i++)
        knots[i].followKnot(knots[i - 1]);
  
      tail_positions.add(knots[numberOfKnots - 1].toString());
    }
  }

  return tail_positions.size;
}

function firstPart(input) {
  return getNumTailPositions(input, 2);
}

function secondPart(input) {
  return getNumTailPositions(input, 10);
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}