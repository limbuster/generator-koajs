module.exports = {
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
  collectCoverageFrom: [
    '**/generators/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**',
  ],
  testEnvironment: 'node',
};
