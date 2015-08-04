var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var gulpif = require('gulp-if');
var replace = require('gulp-replace');
var concatCss = require('gulp-concat-css');

var dest = './dist';
var src = './src';
var bundler;

var configs = {
  production: gutil.env.type === 'production',
  server: {
    root: dest,
    host: 'localhost',
    port: 1970,
    livereload: {
      port: 35929
    }
  },
  sass: {
    src: [src + '/styles/main.scss', src + '/js/**/*.scss'],
    dest: dest + '/styles',
    settings: {
      precision: 10
    }
  },
  browserify: {
    settings: {
      transform: [
        'reactify'
      ]
    },
    src: src + '/js/App.js',
    dest: dest + '/js',
    outputName: 'App.js'
  },
  copy: {
    images: {
      src: src + '/images/**/*',
      dest: dest + '/images/'
    },
    fonts: {
      src: src + '/fonts/**/*',
      dest: dest + '/fonts/'
    },
    html: {
      src: src + '/*.html',
      dest: dest
    },
    xml: {
      src: src + '/*.xml',
      dest: dest
    }
  },
  watch: {
    src: 'src/**/*.*',
    tasks: ['build']
  }
};

gulp.task('default', ['build', 'watch', 'server']);

// TODO: add version parameter, minify css and js, compress images etc.
gulp.task('build', ['scripts', 'styles', 'copy'], function() {
  gulp.src(configs.watch.src)
      .pipe(connect.reload());
});

// TODO: Create diffrent task for each watcher
gulp.task('watch', ['build'], function() {
  gulp.watch(configs.watch.src, configs.watch.tasks);
    return scripts(true);
});

gulp.task('copy', function() {
    Object.keys(configs.copy).forEach(function(key) {
      var copy = configs.copy[key];
      var fileFormat = copy.src.split('.').pop();
      gulp.src(copy.src)
        .pipe(gulpif(fileFormat=='html', replace('@version', new Date().getTime())))
        .pipe(gulp.dest(copy.dest));
    });
});

gulp.task('styles', function() {
  gulp.src(configs.sass.src)
    .pipe(plumber())
    .pipe(sass(configs.sass.settings))
    .pipe(concatCss('main.css', {rebaseUrls: false}))
    .pipe(gulp.dest(configs.sass.dest))
    .pipe(connect.reload());
});

gulp.task('server', function() {
  connect.server(configs.server);
});

gulp.task('scripts', function() {
  return scripts(false);
});

function scripts(watching) {
  var cfg = configs.browserify;
  watchify.args.debug = watchify.args.fullPaths = !configs.production;
  bundler = browserify(cfg.src, watchify.args);

  if(watching)
    bundler = watchify(bundler);

  cfg.settings.transform.forEach(function(tansform) {
    bundler.transform(tansform);
  });

  var bundle = function() {
    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red('Error (Browserify):'), '\n', err.message);
        gutil.beep();
        this.emit('end');
      })
        //TODO add .pipe(gulpif(configs.production, replace('@environment', 'production')))
      .pipe(source(cfg.outputName))
      .pipe(gulp.dest(cfg.dest))
      .pipe(connect.reload());
  }

  bundler.on('log', gutil.log);
  bundler.on('update', bundle);

  return bundle();
};
