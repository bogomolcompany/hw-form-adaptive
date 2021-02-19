const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const include = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const concat = require('gulp-concat');
const media = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const terser = require('gulp-terser');
const imageMin = require('gulp-imagemin');
const sync = require('browser-sync').create();
const babel = require('gulp-babel');

function html() {
	return src('src/**.html')
		.pipe(
			include({
				prefix: '@@',
			})
		)
		.pipe(
			htmlmin({
				collapseWhitespace: true,
			})
		)
		.pipe(dest('dist'));
}

function scss() {
	return src('src/scss/**.scss')
		.pipe(sass())
		.pipe(media())
		.pipe(autoprefixer({}))
		.pipe(csso())
		.pipe(concat('style.css'))
		.pipe(dest('dist/css'));
}

function js() {
	return (
		src('src/js/**.js')
			.pipe(include())
			// .pipe(terser())
			.pipe(
				babel({
					presets: ['@babel/env'],
				})
			)
			.pipe(dest('dist/js'))
	)
}

function image() {
	return src('src/img/*')
		.pipe(imageMin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			interlaced: true,
			optimizationLevel: 3
		}))
		.pipe(dest('dist/img'));
}

function clear() {
	return del('dist');
}

function serve() {
	sync.init({
		server: './dist',
	});

	watch('src/**.html', series(html)).on('change', sync.reload);
	watch('src/scss/**.scss', series(scss)).on('change', sync.reload);
	watch('src/js/**.js', series(js)).on('change', sync.reload);
	watch('src/img/*', series(image)).on('change', sync.reload);
}

exports.serve = series(clear, image, scss, html, js, serve);
exports.clear = clear;