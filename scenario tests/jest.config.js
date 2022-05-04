// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  testMatch: ["**/*.steps.js", "**/*.test.js"],
  testTimeout: 12000,
};

module.exports = config;
