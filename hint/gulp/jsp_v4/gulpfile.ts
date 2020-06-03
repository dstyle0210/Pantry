/**
 * Gulp Setting for Dstyle Pantry
 */
'use strict';

const gulp = require("gulp");
const browserify = require("browserify");
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
    return (
        browserify("src/_entry/js/projectName_pages_main.js")
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("src/js"))
    );

};
exports.test1 = gulp.series(transpile,clean,bundle);
exports.test2 = gulp.parallel(transpile,clean,bundle);
