"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
global.maxSystem;
global.maxUser;

var getCpu = function getCpu() {

  return { "system": global.maxSystem,
    "user": global.maxUser };
};

var setCpu = function setCpu(user, system) {

  global.maxUser = user;
  global.maxSystem = system;
};

exports.setCpu = setCpu;
exports.getCpu = getCpu;