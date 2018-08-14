'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var colorList = [];
while (colorList.length <= 50) {
    var color = '#' + Math.round(Math.random() * 0xFFFFFF).toString(16);
    if (colorList.includes(color)) continue;
    colorList.push(color);
}

exports.default = colorList;