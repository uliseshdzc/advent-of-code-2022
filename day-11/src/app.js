const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

function parseInput(input) {
  return fs.readFileSync(input).toString().split('\r\n\r\n').map((textBlock, index) => {
    let lines = textBlock.split('\r\n');
    return {
      items: lines[1].split(': ')[1].split(', ').map(x => Number(x)),
      operation: x => eval(lines[2].split('= ')[1].replaceAll('old', String(x))),
      divisor: Number(lines[3].match(/(\d+)/)[0]),
      test: x => x % Number(lines[3].match(/(\d+)/)[0]) == 0,
      throwIfTrue: Number(lines[4].match(/(\d+)/)[0]),
      throwIfFalse: Number(lines[5].match(/(\d+)/)[0]),
      inspections: 0
    };
  });
}

function firstPart(input) {
  let monkeys = parseInput(input);

  // Inspect every monkey for 20 rounds
  for (let i = 0; i < 20; i++) {
    monkeys.forEach(monkey => {
      while (monkey.items.length > 0) {
        let item = monkey.items.shift();
        let worriness = Math.floor(monkey.operation(item) / 3);
        let newMonkey = monkey.test(worriness) ? monkey.throwIfTrue : monkey.throwIfFalse;
        monkeys[newMonkey].items.push(worriness);
        monkey.inspections++;
      }
    });
  }

  // Multiply the highest two elements
  return monkeys
    .map(monkey => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b);
}

function secondPart(input) {
  let monkeys = parseInput(input);

  // Get common divisor
  let divisor = monkeys.reduce((res, monkey) => monkey.divisor * res, 1);

  // Inspect every monkey for 10000 rounds
  for (let i = 0; i < 10000 ; i++) {
    monkeys.forEach(monkey => {
      while (monkey.items.length > 0) {
        let item = monkey.items.shift();
        let worriness = Math.floor(monkey.operation(item) % divisor);
        let newMonkey = monkey.test(worriness) ? monkey.throwIfTrue : monkey.throwIfFalse;
        monkeys[newMonkey].items.push(worriness);
        monkey.inspections++;
      }
    });
  }

  // Multiply the highest two elements
  return monkeys
    .map(monkey => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((a, b) => a * b);
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}