const fs = require('fs');
const css = fs.readFileSync('shubh-styles.css', 'utf8');

const hexRegex = /#[0-9a-fA-F]{3,6}/g;
const rgbRegex = /rgba?\([^)]+\)/g;
const gradientRegex = /linear-gradient\([^)]+\)/g;

const hexes = new Set(css.match(hexRegex));
const rgbs = new Set(css.match(rgbRegex));
const gradients = new Set(css.match(gradientRegex));

console.log("Hexes:", Array.from(hexes));
console.log("RGBs:", Array.from(rgbs));
console.log("Gradients:", Array.from(gradients));
