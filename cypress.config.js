const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:5173',
  },
  component: {
    specPattern: 'cypress/integration/**/*.spec.js',
    baseUrl: 'http://localhost:5173',
  },
});
