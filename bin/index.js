#!/usr/bin/env node

var images = require('images');
var getFilesAndDirectorys = require('./getFilesAndDirectorys');
var readFileHead = require('./readFileHead');
var program = require('commander');
program.version(require('../package.json').version);

// 定义根命令
program
  .arguments('<absolutePath>')
  .action((absolutePath, optionArg, commanderObj) => {
    if (typeof absolutePath === 'undefined') {
      console.error('no absolutePath given!');
      process.exit(1);
    }
    let imgPaths = [];
    if (absolutePath.indexOf('.png') > -1) {
      imgPaths.push(absolutePath);
    } else {
      imgPaths = getFilesAndDirectorys(absolutePath).imgPaths;
    }
    imgPaths.forEach(item => {
      if (item.indexOf('.png') <= -1) return;
      const jpgName = item.replace('.png', '.jpg');
      images(item).saveAsync(jpgName, 'jpg', function () {});
    });
    console.log(imgPaths);
  });

// 定义子命令
program
  .command('head <absolutePath>')
  .alias('h')
  .description('查询文件头')
  .action(absolutePath => {
    readFileHead(absolutePath);
  });

program.parse(process.argv);
