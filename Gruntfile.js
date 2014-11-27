module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //https://www.npmjs.org/package/grunt-contrib-jshint
        jshint: {
            all: ['scripts/*.js'],
            //http://www.jshint.com/docs/options/
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                latedef: true
            }
        },

        //https://www.npmjs.org/package/grunt-contrib-concat
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['scripts/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        //https://www.npmjs.org/package/grunt-contrib-uglify
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("mm-dd-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('lint', ['jshint']);
};