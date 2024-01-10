const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

function findMarker(input, n) {
  const signal = fs.readFileSync(input).toString();

  let i = n;
  for (i; i < signal.length; i++) 
  {
    const str = signal.substring(i - n, i);
    if (str.length == new Set(str).size) break;
  }

  return i;
}

function firstPart(input) {
  return findMarker(input, 4);
}

function secondPart(input) {
  return findMarker(input, 14);
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}