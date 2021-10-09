/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable quotes */

//list dependences
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");

//compile, prefix, and min scss
function compilescss() {
  return src("src/scss/*.scss")
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(minify())
    .pipe(dest("dist/css"));
}

//optimize and move images
function optimizeimg() {
  return src("src/images/*.{jpg,png,jpeg}")
    .pipe(
      imagemin([
        imagemin.mozjpeg({ quality: 80, progressive: true }),
        imagemin.optipng({ optimizationLevel: 2 }),
      ])
    )
    .pipe(dest("dist/images"));
}

//optimize and move images
function webpImage() {
  return src("dist/images/*.{jpg,png,jpeg}")
    .pipe(imagewebp())
    .pipe(dest("dist/images"));
}

// minify js
function jsmin() {
  return src("src/js/*.js").pipe(terser()).pipe(dest("dist/js"));
}

//font
function font() {
  return src("src/font/iciel/**/*.{ttf,otf}").pipe(dest("dist/assets/fonts"));
}

//watchtask
function watchTask() {
  watch("src/scss/**/*.scss", compilescss);
  watch("src/js/*.js", jsmin);
  watch("src/images/*", optimizeimg);
  watch("dist/images/*.{jpg,png,jpeg}", webpImage);
  watch("src/font/iciel/**/*.{ttf,otf}", font);
}

// Default Gulp task
exports.default = series(
  compilescss,
  jsmin,
  optimizeimg,
  webpImage,
  font,
  watchTask
);
