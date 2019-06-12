/* eslint-disable */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var htmlbeautify = require('gulp-html-beautify');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var minifyJS = require('gulp-uglify');
var babel = require('gulp-babel');
var clean = require('gulp-clean')
var runSequence = require('run-sequence');
var rev = require('gulp-rev')
var revdel = require('rev-del')
var collector = require('gulp-rev-collector')

//Beautify HTML
gulp.task('htmlbeautify', function () {
  var options = {
    indentSize: 2
  };
  gulp.src('src/**/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('src'))
});

// Static Server + watching scss/html files
gulp.task('serve', function () {
  browserSync.init({
    server: ['./src', './src/pages']
  });

  gulp.watch(['src/stylus/**/*.styl'], function () {
    // workaround for some systems where sass breaks each time file gets updated.
    setTimeout(function () {
      gulp.start('sass');
    }, 500);
  });
  gulp.watch(['src/babel/**/*.js'], ['babel']).on('change', browserSync.reload);
  gulp.watch(['src/**/*.html'], ['htmlbeautify']).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
  return gulp.src(['src/stylus/index.styl'])
    .pipe(stylus())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

gulp.task('babel', function () {
  return gulp.src(['src/babel/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('src/js'))
    .pipe(browserSync.stream());
});

gulp.task('html-build', function () {
  gulp.src(['src/pages/**/*'])
    // .pipe(htmlbeautify({
    //   indentSize: 2
    // }))
    // .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/html'));
});

// gulp.task('html-vendors', function() {
//   gulp.src(['src/pages/**/*'])
//   // .pipe(htmlbeautify({
//   //   indentSize: 2
//   // }))
//   // .pipe(htmlmin({ collapseWhitespace: true }))
//   .pipe(gulp.dest('dist/html'));

// })

gulp.task('css-build', ['sass'], function () {
  return gulp.src(['src/css/**/*.css'])
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js-build', ['babel'], function () {
  return gulp.src(['src/js/**/*.js'])
    // .pipe(minifyJS())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('img-build', function () {
  return gulp.src(['src/img/**/*'])
    .pipe(gulp.dest('dist/img'));
});

gulp.task('font-build', function () {
  return gulp.src(['src/fonts/**/*'])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('access', function () {
  return gulp.src(['src/.htaccess'])
    .pipe(gulp.dest('dist'));
});

gulp.task('build:clean', () => {
  return gulp.src('dist', { read: false })
    .pipe(clean({ force: true }))
})

gulp.task('revision:rename', ['build:source'], () => {
  return gulp.src(['dist/**/*.css', 'dist/**/*.js', 'dist/**/*.{jpg,png,jpeg,gif,svg}'])
    .pipe(rev())
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest({ path: 'manifest.json' }))
    .pipe(revdel({ dest: 'dist' }))
    .pipe(gulp.dest('dist'))
})

gulp.task('revision:update', ['revision:rename'], () => {
  return gulp.src(['dist/manifest.json', 'dist/html/index.html'])
      .pipe(collector())
      .pipe(gulp.dest('dist'))
})

gulp.task('build', () => {
  return runSequence('build:clean', 'revision:update')
})

gulp.task('build:source', ['html-build', 'css-build', 'js-build', 'img-build', 'font-build', 'access']);

gulp.task('default', ['babel', 'sass', 'serve']);