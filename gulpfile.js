const gulp = require("gulp");
const babel = require("gulp-babel");
const sourceMaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const sass = require('gulp-sass');

gulp.task("babel", gulp.series(function () {
    return gulp.src(["src/**/*.js"])
        .pipe(babel())
        .pipe(gulp.dest("dist"));
}));

gulp.task("babel-source-maps", gulp.series(function () {
    return gulp.src(["src/**/*.js"])
        .pipe(sourceMaps.init())
        .pipe(babel())
        .pipe(sourceMaps.write("."))
        .pipe(gulp.dest("dist"));
}));

gulp.task("clone-react-app", gulp.series(function () {
    return gulp.src("web-app/build/**/*")
        .pipe(gulp.dest("dist/web-app"));
}));

gulp.task('sass', gulp.series(function () {
    return gulp.src('./web-app/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./web-app/public/css'))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./web-app/public/css'));
}));

// Watching SCSS files
gulp.task('sass:watch', gulp.series(function () {
    gulp.watch('./web-app/scss/**/*.scss', gulp.series('sass'));
}));

gulp.task("dev", gulp.series("babel-source-maps", "clone-react-app"));
gulp.task("prod", gulp.series("babel", "clone-react-app"));
gulp.task("default", gulp.series("dev"));
