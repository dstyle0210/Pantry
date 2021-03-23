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

function sassDevCompile() {
    return src("./src/_entry/**/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(csscomb("./zen.json"))
        .pipe(cleanCSS())
        .pipe(replace(/}/g,'}\n'))
        .pipe(replace('/*!','\n/*!'))
        .pipe(replace('*/','*/\n'))
        .pipe(replace('{.','{\n\s.')) // 미디어쿼리 일경우, 줄바꿈 처리
        .pipe(replace('"UTF-8";','"UTF-8";\n'))
        .pipe(replace(/\}\n\}/g,'} }'))
        .pipe(replace(/\}\nto{/g,'} to {'))
        .pipe(replace(/\n(\.[0-9]+)\)/g,'$1)'))
        .pipe(dest('./src/css'))
}
function sassDist() {
    var map = [
        "./src/css/base.css",
        "./src/css/atom.css",
    ];
    return src(map) // , { since: lastRun(sassCompile) }
        .pipe(concat("style.css"))
        .pipe(replace('/*!','/*'))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(dest('./dist/css/'))
        .pipe(rev())
        .pipe(override())
        .pipe(dest('./dist/css/build/'))
        .pipe(rev.manifest())
        .pipe(dest('./dist/css/'))
};
function sassWatch() {
    return watch('./src/**/*.scss', sassDevCompile);
};
// 변경된 파일에 대한 최종 해쉬값 적용
function checkRev(){
    var manifestText = fs.readFileSync("./dist/css/rev-manifest.json","utf8");
    manifestText = manifestText.replace(/(\.css)/g,"");
    var manifestData = JSON.parse( manifestText );

    var hash = "/* "+( manifestData.style )+" */";
    return src('./dist/css/style.css')
        // .pipe(replace("}","}\n"))
        .pipe(insert.prepend( hash ))
        .pipe(replace("@charset","\n@charset"))
        // .pipe(replace('"UTF-8";','"UTF-8";\n'))
        .pipe(dest('./dist/css/'));
}

exports.dev = series(sassDevCompile);
exports.dist = series(sassDevCompile , sassDist , checkRev);
/*exports.sass = series(sassCompile,flagHash);
exports.sass_watch = series(sassCompile,sassWatch);*/


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
