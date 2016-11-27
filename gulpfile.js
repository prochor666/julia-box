'use strict';

/*
Julia box app builder
*/

// Gulp && plugins
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');

// Sources
var appSrc = [
    'src/js/julia-base.js',
    'src/js/julia-ui.js',
    'src/js/julia-callback.js',
    'src/js/julia-controls.js',
    'src/js/julia-support.js',
    'src/js/julia-media.js',
    'src/js/julia-events.js',
    'src/js/julia-fullscreen.js',
    'src/js/julia-persist.js',
    'src/js/julia-jquery-plugin.js',
];


// App styles
gulp.task('sass', function()
{
    return gulp.src('src/scss/julia-box.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS())
        .pipe(concat('julia-box.min.css'))
        .pipe(gulp.dest('dist/css'));
});


// App scripts
gulp.task('jsbuild', function()
{
    return gulp.src(appSrc)
        .pipe(concat('julia-box.js'))
        .pipe(minify({
            ext:{
                src:'.js',
                min:'.min.js'
            },
            compress: {
                properties: false
            },
            exclude: ['tmp'],
            ignoreFiles: ['.combo.js', '.min.js']
        }))
        .pipe(gulp.dest('dist/js'));
});


// Watch it, Gulp!
gulp.task('watch', function ()
{
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['jsbuild']);
});
