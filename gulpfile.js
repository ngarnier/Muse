
var gulp = require ('gulp')
    , babel = require ('gulp-babel')
    , source = require ('gulp-sourcemaps');

gulp.task('default', function () {
  gulp.src('muse.js')
      .pipe(source.init())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(source.write())
      .pipe(gulp.dest('./dist/'))
});
