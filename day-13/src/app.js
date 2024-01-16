const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number')
    return a - b;

  if (typeof a === 'number' && typeof b !== 'number')
    return compare([a], b);

  if (typeof a !== 'number' && typeof b === 'number')
    return compare(a, [b]);

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    let value = compare(a[i], b[i]);
    if (value)
      return value;
  }
  
  return a.length - b.length;
}

function firstPart(input) {
  let packets = fs.readFileSync(input).toString().split('\r\n\r\n');
  let result = 0;

  for (let i = 0; i < packets.length; i++) {
    [left, right] = packets[i].split('\r\n');
    if (compare(eval(left), eval(right)) < 0)
      result += i + 1;
  }

  return result;
}

function secondPart(input) {
  let i2 = 1;
  let i6 = 2;

  fs.readFileSync(input).toString().replace(/[\r\n]{2,}/g, '\r\n').split('\r\n').forEach(line => {
    let a = eval(line);
    if (compare(a, [[2]]) < 0) {
      i2++;
      i6++;
    }
    else if (compare(a, [[6]]) < 0) {
      i6++;
    }
  });

  return i2 * i6;
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}