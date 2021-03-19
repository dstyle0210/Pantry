/**
 * Gulp Setting for Dstyle Pantry
 */
'use strict';
const fs = require('fs');
const { task, series, parallel , src, dest, lastRun, watch } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const cleanCSS = require('gulp-clean-css');
const rev = require('gulp-rev');
const concat = require('gulp-concat');
const override=require('gulp-rev-css-url');
const insert = require('gulp-insert');
const replace = require('gulp-replace');
const csscomb = require('gulp-csscomb');
const order = require('gulp-order');


function sassCompile() {
    return src('./scss/**/*.scss', { since: lastRun(sassCompile) })
        .pipe(sass().on('error', sass.logError))
        .pipe(csscomb("./zen.json"))
        .pipe(order())
        .pipe(concat("style.css"))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(dest('./css/'))
        .pipe(rev())
        .pipe(override())
        .pipe(dest('./css/build/'))
        .pipe(rev.manifest())
        .pipe(dest('./css/'))
};
function sassWatch() {
    return watch('./scss/**/*.scss', sassCompile);
};
// 변경된 파일에 대한 최종 해쉬값 적용
function flagHash(){
    var manifest = fs.readFileSync("./css/rev-manifest.json","utf8");
    var hash = "/*"+( (manifest.trim()).replace(/[\s\n]/ig,"") )+"*/";
    return src('./css/style.css')
        .pipe(insert.prepend( hash ))
        .pipe(replace("@charset","\n@charset"))
        .pipe(replace("}","}\n"))
        .pipe(dest('./css/'));
}

exports.sass = series(sassCompile,flagHash);
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
