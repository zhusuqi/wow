'use strict';
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var browserSync = require("browser-sync");
var a = {
	src:"src/",
    test:"bulid/",
    prd:"dist/",
};
gulp.task('copy',function(){
    gulp.src(a.src+"**/*.html")
    .pipe(gulp.dest(a.test))
    .pipe($.htmlmin({
    	collapseWhitespace:true,//去除空格换行
		removeComments:true,//去除注释
		removeEmptyAttributes:true//删除空的属性
    }))
    .pipe(gulp.dest(a.prd))
    .pipe(browserSync.stream());
});
gulp.task('less',function(){
    gulp.src(a.src+"less/01.less")
    .pipe($.less())
 	.pipe($.autoprefixer({
		  browsers: ['last 2 versions'],//兼容主流浏览器的最新2个版本
          cascade: false//是否没话属性值，默认值是true
	}))
	.pipe(gulp.dest(a.test+'css'))
	.pipe($.cssmin())
    .pipe(gulp.dest(a.prd+"css"))
    .pipe(browserSync.stream());
});
gulp.task('js',function(){
    gulp.src(a.src+'js/*.js')
    .pipe($.concat('all.js'))
    .pipe(gulp.dest(a.test+'js'))
    .pipe($.uglify())
    .pipe(gulp.dest(a.prd+'js'))
    .pipe(browserSync.stream());
});
gulp.task('image',function(){
    gulp.src(a.src+'images/*')
    .pipe($.imagemin())
    .pipe(gulp.dest(a.test+'images'))
    .pipe(gulp.dest(a.prd+'images'))
    .pipe(browserSync.stream());
});
gulp.task('clean',function(){
	gulp.src([a.prd,a.test])
	.pipe($.clean())
    .pipe(browserSync.stream());
});
gulp.task('watch',['copy','less','js','image'],function(){
    gulp.watch(a.src+'**/*.html',['copy']);
    gulp.watch(a.src+'less/*.less',['less']);
    gulp.watch(a.src+'js/*.js',['js']);
    gulp.watch(a.src+'images/*',['image']);
});
gulp.task('default',['watch'],function(){
    browserSync.init({
        server:{
            baseDir:a.prd
        },
    });
});