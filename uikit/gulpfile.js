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

gulp.task("default",function(){
    gulp.watch(["_uikit/**/*.scss"]).on("change",function(file){
        console.log( path.parse(file.path).dir );
        gulp.src(file.path)
            .pipe( sass().on('error', sass.logError) )
            .pipe(gulp.dest( path.parse(file.path).dir ));
    });
});

gulp.task("vender-init",function(){
    // jquery
    gulp.src("node_modules/jquery/dist/jquery.min.js").pipe(gulp.dest("_vender/jquery"));

    // swiper
    gulp.src("node_modules/swiper/css/swiper.min.css").pipe(gulp.dest("_vender/swiper"));
    gulp.src("node_modules/swiper/js/swiper.min.js").pipe(gulp.dest("_vender/swiper"));

    // lodash
    gulp.src("node_modules/lodash/lodash.js").pipe(gulp.dest("_vender/lodash"));

    // codemirror
    gulp.src("node_modules/codemirror/lib/**").pipe(gulp.dest("_vender/codemirror/lib"));
    gulp.src("node_modules/codemirror/mode/**").pipe(gulp.dest("_vender/codemirror/mode"));
    gulp.src("node_modules/codemirror/addon/**").pipe(gulp.dest("_vender/codemirror/addon"));
    gulp.src("node_modules/codemirror/theme/ayu-dark.css").pipe(gulp.dest("_vender/codemirror/theme"));

});
