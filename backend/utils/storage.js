const fs = require('fs').promises;
const path = require('path');

const STORAGE_DIR = path.join(__dirname, '../storage');

const readJSON = async (filename) => {
  try {
    const data = await fs.readFile(path.join(STORAGE_DIR, filename), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeJSON = async (filename, data) => {
  await fs.writeFile(path.join(STORAGE_DIR, filename), JSON.stringify(data, null, 2));
};

module.exports = { readJSON, writeJSON };
