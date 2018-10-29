// Packages / Adding dependencies
const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');



// Copy & minify HTML-files
gulp.task("copyhtml", function() {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("pub/"));
});



// Copy & minify images
gulp.task("copyimages", function() {
    return gulp.src("src/img/*.{gif,jpg,png,svg}")
        .pipe(imagemin())
        .pipe(gulp.dest("pub/img"));
});



// Concat & minify JavaScript-files
gulp.task("convertjs", function() {
    return gulp.src("src/js/*.js")
        .pipe(concat("main.min.js"))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))              
        .pipe(gulp.dest("pub/js"));
});



// Convert SCSS to CSS + concat, minify & generate sourcemaps
gulp.task("convertsass", function() {
    return gulp.src("src/sass/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(cleanCSS()) 
        .pipe(sourcemaps.write())
        .pipe(concat("main-sass.css"))
        .pipe(gulp.dest("pub/css"));
});



// Copy font-files
gulp.task("copyfonts", function() {
    return gulp.src("src/fonts/*.{otf,ttf}")
        .pipe(gulp.dest("pub/fonts"));
});



// Control changes in the filesystem
gulp.task("watcher", function() {
    gulp.watch("src/*.html", {debounceDelay: 2000}, ['copyhtml']);
    gulp.watch("src/img/*.{gif,jpg,png,svg}", {debounceDelay: 2000}, ['copyimages']);
    gulp.watch("src/js/*.js", {debounceDelay: 2000}, ['convertjs']);
    gulp.watch("src/sass/**/*.scss", {debounceDelay: 2000}, ['convertsass']);
    gulp.watch("src/fonts/*.{otf,ttf}", {debounceDelay: 2000}, ['copyfonts']);
});



// Run multiple tasks
gulp.task("default", ["copyhtml", "copyimages", "convertjs", "convertsass", "copyfonts", "watcher"]);