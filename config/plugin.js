'use strict';

/** @type Egg.EggPlugin */
exports.mysql= {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  enable: true,
  package: 'egg-mysql',
}

exports.cors = {
  enable: true,
  package: 'egg-cors'
}

exports.jwt = {
  enable: true,
  package: 'egg-jwt'
}

