const fs = require('node:fs');
const process = require('process');

module.exports = { firstPart, secondPart }

class Folder {
  constructor(parent) {
    this.parent = parent;
    this.children = {};
  }
}

class File {
  constructor(parent, size) {
    this.parent = parent;
    this.size = size;
  }
}

function getNodeGraph(input) {
  let rootFolder = new Folder(null);
  let currentFolder = rootFolder;

  // Get all files and folders connected as a node graph
  for (let line of fs.readFileSync(input).toString().split('\r\n')) {
    if (line === '$ cd /' || line === '$ ls') continue;

    if (line.includes('$ cd')) {
      let folderName = line.split(' ')[2];
      if (folderName === '..') currentFolder = currentFolder.parent;
      else currentFolder = currentFolder.children[folderName];
    } else {
      if (line.includes('dir ')) {
        currentFolder.children[line.split(' ')[1]] = new Folder(currentFolder);
      } else {
        [size, fileName] = line.split(' ');
        currentFolder.children[fileName] = new File(currentFolder, Number(size));
      }
    }
  }

  return rootFolder;
}

function dfs(node, visited = new Set(), foldersSizes = []) {
  visited.add(node);

  if (node instanceof File) 
    return node.size;

  let size = 0;

  for (let child in node.children)
    if (!visited.has(node.children[child]))
      size += dfs(node.children[child], visited, foldersSizes);

  foldersSizes.push(size);

  // Return folders sizes only if in root node
  if (node.parent === null) return foldersSizes;

  // Return node size otherwise
  return size;
}

function firstPart(input) {
  return dfs(getNodeGraph(input)).filter(folder => folder <= 100000).reduce((a, b) => a + b);
}

function secondPart(input) {
  const totalSpace = 70000000;
  const goal = 30000000;
  const foldersSizes = dfs(getNodeGraph(input));
  const usedSpace = foldersSizes.reduce((a, b) => Math.max(a, b));

  return foldersSizes
          .filter(folder => totalSpace - usedSpace + folder >= goal)
          .reduce((a, b) => Math.min(a, b));
}

if (require.main === module) {
  if (process.argv[3] == "1")
    console.log(firstPart(process.argv[2]));
  else if (process.argv[3] == "2")
    console.log(secondPart(process.argv[2]));
}