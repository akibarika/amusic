module.exports = function (grunt) {
    // The order of JS files that get loaded
    var jsBuildFiles = ['scripts/app/*.js',
        'scripts/lib/*.js',
        'scripts/models/*.js',
        'scripts/controllers/*.js'];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            // Leave development CSS expanded for debugging
            dev: {
                options: {
                    style: 'expanded',
                    sourcemap: 'auto',
                    require: 'sass-globbing'
                },
                files: {
                    'assets/echoing.css.liquid': 'sass/styles.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')()
                ]
            },
            dist: {
                src: 'assets/echoing.css.liquid',
                dist: 'assets/echoing.css.liquid'
            }
        },
        // Uglifies JS for production
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>*/\n'
            },
            build: {
                src: jsBuildFiles,
                dest: 'assets/<%= pkg.name %>.js'
            }
        },
        // Combines JS files for development purposes
        concat: {
            options: {
                banner: '/*! <%= pkg.name %>*/\n',
                beautfiy: true,
                process: function (src, filepath) {
                    return '//------ ' + filepath + '\n' + src;
                }
            },
            build: {
                src: jsBuildFiles,
                dest: 'assets/<%= pkg.name %>.js'
            }
        },
        watch: {
            scripts: {
                files: ['scripts/**/*.js'],
                tasks: ['concat'],
                options: {
                    spawn: false
                },
            },
            css: {
                files: ['sass/**/*.scss'],
                tasks: ['sass:dev', 'postcss']
            }
        }
    });

    // Tasks
    grunt.registerTask('build', ['uglify', 'sass:prod']);

    // Plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass-globbing');
    grunt.loadNpmTasks('grunt-postcss');
};