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
                forin: true,
                freeze: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                nonbsp: true,
                nonew: true
            }
        },

        //https://www.npmjs.org/package/grunt-contrib-concat
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'scripts/config.js',
                    'scripts/text.js',
                    'scripts/game.js',
                    'scripts/player.js',
                    'scripts/map_functions.js',
                    'scripts/audio.js',
                    'scripts/combat.js',
                    'scripts/init.js'
                ],
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
        },

        //https://www.npmjs.org/package/grunt-contrib-copy
        copy: {
            main: {
                files: [
                    { src: 'assets/**', dest: 'dist/' },
                    { src: 'styles.css', dest: 'dist/' },
                    { src: 'index.html', dest: 'dist/' }
                ],
                options: {
                    process: function (content, srcpath) {
                        if (srcpath === "index.html") {
                            content = content.replace(/<script src=\"scripts\/.*\"><\/script>/, "<script src=\"DragonWarrior.min.js\"></script>");
                            return content.replace(/<script src=\"scripts\/.*\"><\/script>/g, "");
                        }
                        return content;
                    },
                    noProcess: ['assets/**', 'styles.css']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concat', 'uglify', 'copy']);
    grunt.registerTask('lint', ['jshint']);
};