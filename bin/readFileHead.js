var fs = require("fs");

module.exports = function readFileHead(path) {
  fs.readFile(path, function () {
    arguments;
    console.log(arguments);
  });
};
