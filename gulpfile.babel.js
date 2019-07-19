import gulp from "gulp";
import sass from "gulp-sass";
import minify from "gulp-csso";
import del from "del";
import autoprefixer from "gulp-autoprefixer";

sass.compiler = require("node-sass");

const routes = {
  css: {
    watch: "src/scss/*",
    src: "src/scss/styles.scss",
    dest: "dest/css"
  }
};

const watch = () => {
  gulp.watch(routes.css.watch, styles);
};

const styles = () =>
  gulp
    .src(routes.css.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        flexbox: true,
        grid: "autoplace"
      })
    )
    .pipe(minify())
    .pipe(gulp.dest(routes.css.dest));

const clean = () => del(["dest/", ".publish"]);

const prepare = gulp.series([clean]);

const assets = gulp.series([styles]);

const live = gulp.parallel([watch]);

export const dev = gulp.series([prepare, assets, live]);

export const build = gulp.series([prepare, assets]);
