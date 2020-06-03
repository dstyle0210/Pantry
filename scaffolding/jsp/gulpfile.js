/**
 * Gulp Setting for Pantry
 * Node 6.11(older) : Base by Gulp3
 */

'use strict';

var fs = require('fs');
var request = require("request");
var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

gulp.task("dev",function(){
    gulp.src(["src/_vender/jquery/jquery.min.js","src/_vender/**/*.js"])
        .pipe(concat("projectName_vender.js"))
        .pipe(gulp.dest("src/js/"));
    /*
    return browserify("src/_entry/js/projectName_vender.js")
        .bundle()
        .pipe(source("projectName_vender.js"))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest("src/js/"));
    */
});

gulp.task("vender-init",function(){
    // jquery
    gulp.src("node_modules/jquery/dist/jquery.min.js").pipe(gulp.dest("src/_vender/jquery"));

    // swiper
    gulp.src("node_modules/swiper/css/swiper.min.css").pipe(gulp.dest("src/_vender/swiper"));
    gulp.src("node_modules/swiper/js/swiper.min.js").pipe(gulp.dest("src/_vender/swiper"));
});


// 벤더 합치기(concat)
function _venderConcat(){
    gulp.src(["src/_vender/jquery/jquery.min.js","src/_vender/**/*.js"])
        .pipe(concat("projectName_vender.js"))
        .pipe(gulp.dest("src/js/"));
    gulp.src(["src/_vender/**/*.css"])
        .pipe(concat("projectName_vender.css"))
        .pipe(gulp.dest("src/css/"));
};
gulp.task("vender",_venderConcat);
