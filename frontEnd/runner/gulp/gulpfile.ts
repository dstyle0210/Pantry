/**
 * Gulp Setting for Dstyle Pantry
 */
'use strict';

const { task, series, parallel , src, dest, lastRun, watch } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');


function sassCompile() {
    return src('./scss/**/*.scss', { since: lastRun(sassCompile) })
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./css'));
};
function sassWatch() {
    return watch('./scss/**/*.scss', sassCompile);
};

exports.sass = series(sassCompile);
exports.sass_watch = series(sassCompile,sassWatch);


/*

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
};
exports.test1 = gulp.series(transpile,clean,bundle);
exports.test2 = gulp.parallel(transpile,clean,bundle);*/
