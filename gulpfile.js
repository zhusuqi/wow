'use strict'
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var clean = require('gulp-clean');
var browserSync=require('browser-sync').create();
gulp.task('wow', function() {
    console.log("hello wow sb");
});
gulp.task('copy',function(){
	gulp.src('src/**/*.html')
	.pipe(gulp.dest('dist/'));
});
gulp.task('less1',function(){
	gulp.src('src/**/*.less')
	.pipe(less())
	.pipe(gulp.dest('dist/css/'));
});
gulp.task('less2',function(){
	gulp.src('src/**/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css/'));
});
gulp.task('less',function(){
	gulp.src('src/**/*.less')
	.pipe(less())
	.pipe(cssmin())
	.pipe(gulp.dest('dist/css/'));
});
gulp.task('js',function(){
    gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});
gulp.task('image',function(){
    gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/'));
});
gulp.task('clean',function(){
	gulp.src('dist/')
	.pipe(clean());
});
gulp.task('dist',['copy','less','js','image']);
gulp.task('watch',function(){
    gulp.watch('src/**/*.html',['copy']);
    gulp.watch('src/**/*.less',['less']);
    gulp.watch('src/js/*.js',['js']);
    gulp.watch('src/images/*',['image']);
});
gulp.task('server',['copy','less','js','image'],function(){
    browserSync.init({
		server:{
			baseDir:'./dist'
		},
		port:8848
	});
});









