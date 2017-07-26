const 	gulp = require('gulp'), // -v 4 alpha
		uglify = require('gulp-uglify'),
		csso = require('gulp-csso'),
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
		gulp.task('scripts',gulp.series( () => {
			return gulp.src(`${opts.src}/js/main.js`)
			.pipe(maps.init())
			.pipe(uglify())
			.pipe(rename('main.min.js'))
			.pipe(maps.write('./'))
			.pipe(gulp.dest(`${opts.dist}/js`))
		}));

	// styles	
		gulp.task('styles', gulp.series( () => {
			return gulp.src(opts.src+'/css/style.css')
 			.pipe(maps.init())
			.pipe(csso())
			.pipe(rename('styles.min.css'))
 			.pipe(maps.write('./'))
			.pipe(gulp.dest(`${opts.dist}/css`))
		}));

	// clean
		gulp.task('clean', gulp.series( () => {
			return del([
				`${opts.dist}/js/main*`,
				`${opts.dist}/css/styles*`,
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
				// gulp.watch(opts.src + '/js/main.js', gulp.series('reload') );
				gulp.watch(opts.src + '/css/style.css', gulp.series('reload') );
		}));