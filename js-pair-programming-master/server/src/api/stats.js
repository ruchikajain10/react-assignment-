const loadStatsFilesById = require('./data/utils/load-stats-files');

async function getStats() {
  return {
    bpm: {
      average: 113,
    },
    reps: {
      sum: 225
    },
  };
}

module.exports = getStats;
