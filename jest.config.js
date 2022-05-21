module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "\\.(js|jsx)?$": "babel-jest",
  },
  testMatch: ["<rootDir>/src/**/*.test.{js, jsx}"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["/node_modules/", "/public/"],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__test__/fileMock.js",
  },
};
