const 	gulp = require('gulp'), // -v 4 alpha
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		csso = require('gulp-csso'),
		concatCss = require('gulp-concat-css'),
		maps = require('gulp-sourcemaps'),
		rename = require('gulp-rename'),
		browserSync = require('browser-sync').create(),
		del = require('del');

const opts = {
	src: 'assets',
	dist: 'public'
}

// Build pipeline
	// scripts
		gulp.task('concatScripts',gulp.series( () => {
			return gulp.src([
				opts.src+'/js/jquery-2.0.0.min.js',
				opts.src+'/js/jquery.simpleWeather.min.js',
				opts.src+'/js/main.js'
				])
			.pipe(maps.init())
			.pipe(concat('all.js'))
			.pipe(maps.write('./'))
			.pipe(gulp.dest(`${opts.src}/js`))
		}));

		gulp.task('scripts',gulp.series( 'concatScripts', () => {
			return gulp.src(opts.src+'/js/all.js')
			.pipe(maps.init())
			.pipe(uglify())
			.pipe(rename('all.min.js'))
			.pipe(maps.write('./'))
			.pipe(gulp.dest(`${opts.src}/js`))
		}));

	// styles
		gulp.task('concatStyles',gulp.series( () => {
			return gulp.src([
				opts.src+'/bootstrap/css/bootstrap.min.css',
				opts.src+'/css/style.css',
				opts.src+'/css/weather.css'
				])
			.pipe(concatCss('all.css'))
			.pipe(gulp.dest(`${opts.src}/css`))
		}));	
		gulp.task('styles', gulp.series('concatStyles', () => {
			return gulp.src(opts.src+'/css/all.css')
 			.pipe(maps.init())
			.pipe(csso())
			.pipe(rename('all.min.css'))
 			.pipe(maps.write('./'))
			.pipe(gulp.dest(`${opts.src}/css`))
		}));

	// clean
		gulp.task('clean', gulp.series( () => {
			return del([
				`${opts.src}/js/all*`,
				`${opts.src}/css/all*`,
				]);
		}));

	// build
		gulp.task('build', gulp.series('clean', ['scripts', 'styles']));	

	// reload
		gulp.task('reload', gulp.series( (done) => {
			browserSync.reload();
			done();
		}));

	// default
		gulp.task('default', gulp.series( () => {
			// serve
				browserSync.init({
					proxy:'brunonavarrete.github.io.dev/'
				});
			// watch
				gulp.watch('*.html', gulp.series('reload') );
				gulp.watch('*.json', gulp.series('reload') );
				gulp.watch(opts.src + '/js/main.js', gulp.series('clean','scripts','reload') );
				gulp.watch(opts.src + '/css/style.css', gulp.series('clean','styles','reload') );
		}));