'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var vulcanize = require('gulp-vulcanize');
var plugins = require('gulp-load-plugins')();
const del = require('del');
const livereloadRegex = /\n<script>.+?(?=livereload\.js).+?<\/script>\n/;
const connect = require('gulp-connect');
function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}
gulp.task('watch', () => {
    livereload.listen();
    gulp.watch(paths.app.images, ['images']);
    gulp.watch(paths.app.html, ['html']);
    gulp.watch(paths.app.clientScripts, ['lint:client']);
});
//Scss Compile Code
gulp.task('sass', function () {
    return gulp.src('demo/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('demo'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
//Vulcanize Method
gulp.task('vulcanize', function () {
    return gulp.src('demo/index.html')
        .pipe(vulcanize({
            abspath: '',
            excludes: [],
            stripExcludes: false
        }))
        .pipe(gulp.dest('dist'));
});
//Clean dist folder
gulp.task('dist:clean', (callback) => {
    del.sync(['dist']);
    callback();
});

gulp.task('compile:index', getTask('compile.index'));
//gulp.task('compile:sass');
gulp.task('serve', ['sass', 'dist:clean', 'vulcanize', 'compile:index'], function () {
    connect.server({
        root: 'dist',
        port: 8887,
        livereload: true
    });
});