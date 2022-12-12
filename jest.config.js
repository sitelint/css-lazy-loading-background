const path = require('path');

module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/**/interfaces/*.{js,ts}',
    '!src/declarations.d.ts'
  ],
  coverageDirectory: '<rootDir>/.jest/coverage',
  maxConcurrency: require('os').cpus().length,
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'src')
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  modulePaths: [
    '<rootDir>'
  ],
  roots: [
    '<rootDir>'
  ],
  setupFiles: [
    '<rootDir>/.jest/jest-shim.js',
    '<rootDir>/.jest/jest-setup.js'
  ],
  setupFilesAfterEnv: [
    '@alex_neo/jest-expect-message'
  ],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/*.test.(ts|js)'
  ],
  transform: {
    '.(css|less)$': '<rootDir>/.jest/jest-style-mock.js',
    '^.+\\.(ts|js|json)?$': '<rootDir>/.jest/jest-preprocessor.js',
    '^.+\\.html?$': '<rootDir>/.jest/jest-html.js'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(colorparsley|capture-stack-trace)/)'
  ]
};
