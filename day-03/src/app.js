const { assert } = require('node:console');
const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

function priority(item) {
  return item.charCodeAt(0) - ((item.charCodeAt(0) >= 97) ? 96 : 38)
}

function firstPart(input) {
  return fs.readFileSync(input).toString()
  .split('\r\n')
  .map(line => 
  {
    assert(line.length % 2 == 0);

    index = line.length / 2;
    secondHalf = line.substring(index);
    return priority(line.substring(0, index).split('')
      .filter(x => secondHalf.includes(x))[0]);
  })
  .reduce((a, b) => a + b);
}

function secondPart(input) {
  score = 0;
  const lines = fs.readFileSync(input).toString().split('\r\n');
  
  assert(lines.length % 3 == 0);

  for (i = 0; i < lines.length; i += 3) {
    score += priority(lines[i]
      .split('')
      .filter(x => lines[i + 1].includes(x) && lines[i + 2].includes(x))[0])
  }

  return score;
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}