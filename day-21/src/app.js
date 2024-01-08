const { assert } = require('node:console');
const fs = require('node:fs');
const process = require('process');
var nerdamer = require('nerdamer');
require('nerdamer/Solve'); 

module.exports = { firstPart, secondPart }

let monkeys = {}

function parseInput(input) {
  fs.readFileSync(input).toString().split('\r\n').forEach(line => {
    [key, value] = line.split(': ');
    monkeys[key] = parseInt(value);

    if (isNaN(monkeys[key])) {
      [firstMonkey, operator, secondMonkey] = value.split(' ');
      monkeys[key] = {firstMonkey: firstMonkey, secondMonkey: secondMonkey, operator: operator};
    }
  });
}

function getValue(key) {
  if (typeof monkeys[key] === 'number') 
    return monkeys[key];

  return eval(getValue(monkeys[key].firstMonkey) + 
    monkeys[key].operator +
    getValue(monkeys[key].secondMonkey));
}

function getStringValue(key) {
  if (key === 'humn')
    return 'x';

  if (typeof monkeys[key] === 'number') 
    return monkeys[key].toString();

  return '(' +getStringValue(monkeys[key].firstMonkey) + 
    monkeys[key].operator +
    getStringValue(monkeys[key].secondMonkey) + ')';
}

function firstPart(input) {
  parseInput(input);
  return getValue('root');
}

function secondPart(input) {
  parseInput(input);
  monkeys['root'].operator = '=';
  delete monkeys['humn'];

  return Number(nerdamer.solve(getStringValue('root'),'x').symbol.elements[0]);
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}