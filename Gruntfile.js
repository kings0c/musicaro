module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'css/style.css' : 'sass/app.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'cssmin']
			},
            scripts: {
                files: ['js/popup.js', 'js/main.js'],
                tasks: ['uglify', 'jshint']
           }
		},
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              'css/style.min.css': ['css/style.css']
            }
          }
        },
        uglify: {
            my_target: {
              files: {
                'js/main.min.js': ['js/vendor/jquery-2.1.4.min.js', 'js/main.js'],
                'js/popup.min.js': ['js/vendor/jquery-2.1.4.min.js', 'js/vendor/materialize.min.js', 'js/popup.js']
              }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'js/main.js', 'js/popup.js']
        }
	});
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['watch']);
};