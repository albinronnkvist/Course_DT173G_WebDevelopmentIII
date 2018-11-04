// Packages / Adding dependencies
const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const typescript = require("gulp-typescript");
const tsProject = typescript.createProject("tsconfig.json");



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
        .pipe(sourcemaps.init())
        .pipe(concat("main.min.js"))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        }))  
        .pipe(sourcemaps.write())            
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



// compile and TypeScript to JavaScript
gulp.task("convertts", function () {
    return gulp.src("src/ts/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject()) 
        .js
        .pipe(concat("ts.min.js"))
        .pipe(uglify().on('error', function(e){
            console.log(e);
        })) 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("pub/js"));
});



// Control changes in the filesystem
gulp.task("watcher", function() {
    gulp.watch("src/*.html", {debounceDelay: 2000}, ['copyhtml']);
    gulp.watch("src/img/*.{gif,jpg,png,svg}", {debounceDelay: 2000}, ['copyimages']);
    gulp.watch("src/js/*.js", {debounceDelay: 2000}, ['convertjs']);
    gulp.watch("src/sass/**/*.scss", {debounceDelay: 2000}, ['convertsass']);
    gulp.watch("src/fonts/*.{otf,ttf}", {debounceDelay: 2000}, ['copyfonts']);
    gulp.watch("src/ts/**/*.ts", {debounceDelay: 2000}, ['convertts']);
});



// Run multiple tasks
gulp.task("default", ["copyhtml", "copyimages", "convertjs", "convertsass", "copyfonts", "convertts", "watcher"]);