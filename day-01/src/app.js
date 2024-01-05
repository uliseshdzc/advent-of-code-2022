const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

function firstPart(input) {
  let max = 0
  const data = fs.readFileSync(input).toString();

  for (const block of data.split('\r\n\r\n')) {
    max = Math.max(max, block.split('\r\n').reduce((a, b) => a + parseInt(b), 0));
  }
  
  return max;
}

function secondPart(input) {
  const data = fs.readFileSync(input).toString();

  return data.split('\r\n\r\n')
    .map((block) => block.split('\r\n').reduce((a, b) => a + parseInt(b), 0))
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}