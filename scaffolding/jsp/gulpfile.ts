/**
 * Gulp Setting for Dstyle Pantry
 */
'use strict';

const { series , parallel } = require("gulp");
function transpile(cb){ // 변환(scss to css , ts to js)
    console.log("transpile");
    cb();
};
function clean(cb){
    console.log("clean");
    cb();
};
function bundle(cb){
    console.log("bundle");
    cb();
};
exports.test1 = series(transpile,clean,bundle);
exports.test2 = parallel(transpile,clean,bundle);