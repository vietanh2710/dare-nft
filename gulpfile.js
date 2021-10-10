/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable quotes */

//list dependences
const { src, dest, watch, series } = require("gulp");
var sass = require("gulp-sass")(require("sass")),
  prefix = require("gulp-autoprefixer"),
  minify = require("gulp-clean-css"),
  terser = require("gulp-terser"),
  imagemin = require("gulp-imagemin"),
  imagewebp = require("gulp-webp"),
  browserSync = require("browser-sync").create();

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

function browsersyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });

  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

//watchtask
function watchTask() {
  watch("src/scss/**/*.scss", series(compilescss, browsersyncReload));
  watch("src/js/*.js", series(jsmin, browsersyncReload));
  watch("src/images/*", series(optimizeimg, browsersyncReload));
  watch("dist/images/*.{jpg,png,jpeg}", series(webpImage, browsersyncReload));
  watch("src/font/iciel/**/*.{ttf,otf}", series(font, browsersyncReload));
  watch("*.html", browsersyncReload);
}

// Default Gulp task
exports.default = series(
  compilescss,
  jsmin,
  optimizeimg,
  webpImage,
  font,
  browsersyncServe,
  watchTask
);
