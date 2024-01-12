const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart };

function firstPart(input) {
  let cycle = 0;
  let x = 1;

  return fs.readFileSync(input).toString().split('\r\n').reduce((sum, line) => {
    if ((++cycle - 20) % 40 == 0) sum += x * cycle;

    if (line.includes('addx')) {
      if ((++cycle - 20) % 40 == 0) sum += x * cycle;
      x += Number(line.split(' ')[1]);
    }

    return sum;
  }, 0);
}

function getPixel(cycle, x) {
  cycle = cycle % 40;
  let pixel = (x - 1 <= cycle) && (cycle <= x + 1) ? '#' : '.';

  if (cycle == 39) pixel += '\r\n';

  return pixel;
}

function secondPart(input) {
  let cycle = 0;
  let x = 1;

  return fs.readFileSync(input).toString().split('\r\n').reduce((result, line) => {
    result += getPixel(cycle++, x);

    if (line.includes('addx')) {
      result += getPixel(cycle++, x);
      x += Number(line.split(' ')[1]);
    }

    return result;
  }, '');
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}