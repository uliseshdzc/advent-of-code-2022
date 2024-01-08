const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

function firstPart(input) {
  return fs.readFileSync(input).toString()
    .split('\r\n')
    .filter(line => {
      [a, b, c, d] = line.split(/,|\-/).map(x => parseInt(x));
      return ((a <= c && b >= d) || (c <= a && d >= b));
    }).length;
}

function secondPart(input) {
  return fs.readFileSync(input).toString()
    .split('\r\n')
    .filter(line => {
      [a, b, c, d] = line.split(/,|\-/).map(x => parseInt(x));
      return (Math.max(a, c) <= Math.min(b, d));
    }).length;
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}