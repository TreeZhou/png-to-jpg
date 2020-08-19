#!/usr/bin/env node

var images = require('images');
var getFilesAndDirectorys = require('./getFilesAndDirectorys');
var readFileHead = require('./readFileHead');
var program = require('commander');
program.version(require('../package.json').version);

// 定义根命令
program
  .arguments('<absolutePath>')
  .action((requireArg, optionArg, commanderObj) => {
    if (typeof requireArg === 'undefined') {
      console.error('no requireArg given!');
      process.exit(1);
    }
    const { imgPaths, directorys } = getFilesAndDirectorys(requireArg);
    console.log(imgPaths);
    imgPaths.forEach(item => {
      if (item.indexOf('.png') <= -1) return;
      const jpgName = item.replace('.png', '.jpg');
      images(item).saveAsync(jpgName, 'jpg', function () {});
    });
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
