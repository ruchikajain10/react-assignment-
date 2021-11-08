const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readDir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

async function loadStatsFilesById(id) {
  const folder = path.resolve(__dirname, `../stats/workout${id}`);
  const fileNames = await readDir(folder);

  const fileReads = fileNames.map((fileName) => readFile(path.join(folder, fileName), 'utf-8'));

  const statsFiles = await Promise.all(fileReads);

  // simulate bad network
  if (id === 5) {
    await delay(5000);
  }

  return statsFiles;
};

module.exports = loadStatsFilesById
