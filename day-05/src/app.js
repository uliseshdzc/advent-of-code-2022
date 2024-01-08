const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

function parseInfo(input) {
  [cratesText, instructionsText] = fs.readFileSync(input).toString().split('\r\n\r\n');
  numCrates = (cratesText.split('\r\n')[0].length + 1) / 4;
  crates = Array.from({length: numCrates}, e => []);
  instructions = [];

  for (const line of cratesText.split('\r\n').slice(0, -1).reverse()) 
    for (let i = 0; i < numCrates; i++) 
      if (line[i * 4 + 1] != ' ') 
        crates[i].push(line[i * 4 + 1]);
    
  for (const line of instructionsText.split('\r\n')) {
    [, quantity, , source, , target] = line.split(' ');
    instructions.push({quantity: Number(quantity), source: source - 1, target: target - 1});
  }

  return [crates, instructions];
}

function firstPart(input) {
  [crates, instructions] = parseInfo(input);

  for (const instruction of instructions) 
    for (let i = 0; i < instruction.quantity; i++)
      crates[instruction.target].push(crates[instruction.source].pop());

  return crates.map(crate => crate.pop()).join("");
}

function secondPart(input) {
  [crates, instructions] = parseInfo(input);

  for (const instruction of instructions) 
    crates[instruction.target] = crates[instruction.target]
                                  .concat(crates[instruction.source]
                                    .splice(
                                    crates[instruction.source].length - instruction.quantity, 
                                    instruction.quantity))

  return crates.map(crate => crate.pop()).join("");
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}