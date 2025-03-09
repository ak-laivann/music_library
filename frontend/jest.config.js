module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^antd/es/(.*)$": "antd/lib/$1",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
