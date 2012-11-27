module.exports = function(grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({
		concat: {
			dist: {
				src: ['src/intro.js.txt',
						'src/1.scope-vars.js', 
						'src/2.Animate.js', 
						'src/3.ModelTransform.js', 
						'src/4.ModelData.js', 
						'src/5.ModelStack.js', 
						'src/6.Model.js', 
						'src/7.Sprite.js', 
						'src/8.export.js', 
						'src/outro.js.txt'],
				dest: 'lib/ranimate.js'
			}
		},
		min: {
			dist: {
				src: ['lib/ranimate.js'],
				dest: 'lib/ranimate.min.js'
			}
		},
		lint: {
			files: ['grunt.js', 'lib/ranimate.js']
		},
		watch: {
			scripts: {
				files: '<config:concat.dist.src>',
				tasks: 'default'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: false,
				immed: true,
				latedef: true,
				newcap: false,
				noarg: true,
				sub: true,
				undef: true,
				boss: false,
				eqnull: true,
				node: true,
				es5: true,
				strict: true,
				smarttabs: true,
				expr: true
			},
			globals: {
				window: false,
				document: false,
				include: false,
				Class: false,
				ruqq: false,
				$: false
			}
		}
	});

	// Default task.
	grunt.registerTask('default', 'concat min lint');

};