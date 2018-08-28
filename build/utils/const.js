"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
global.maxSystem;
global.maxUser;

var getCpu = function getCpu() {

  console.log(global.maxUser);
  console.log(global.maxSystem);
  return { "system": global.maxSystem,
    "user": global.maxUser };
};

var setCpu = function setCpu(user, system) {

  console.log(global.maxUser);
  console.log(global.maxSystem);
  global.maxUser = user;
  global.maxSystem = system;
};

exports.setCpu = setCpu;
exports.getCpu = getCpu;