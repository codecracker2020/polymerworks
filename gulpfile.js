'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

var plugins = require('gulp-load-plugins')();

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
gulp.task('sass', function () {
    return gulp.src('demo/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('demo'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('compile:index', getTask('compile.index'));
//gulp.task('compile:sass');
gulp.task('serve', ['sass', 'compile:index'], function () {
    connect.server({
        root: '',
        port: 8887,
        livereload: true
    });
});