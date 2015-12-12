module.exports = function(grunt) {

    require( 'load-grunt-tasks' )( grunt );

    var config = {
        app: 'app',
        dist: 'dist',
        path: require('path'),
        //packagePath: this.path.resolve('../../../'),
        //packagePathSplit: this.packagePath.split(this.path.sep),
        //packageKey: this.packagePathSplit[this.packagePathSplit.length-1],
        compressableImageFormats: 'jpg,gif,svg,jpeg,png',
        logoSourceFile: '../../Private/LogoSources/logo-default.ai',
        //logoSourceFileAbsolute: this.path.resolve(this.logoSourceFile +'[0]'),
        iconSourceFile: '../../Private/LogoSources/icon-default.ai',
        //iconSourceFileAbsolute: this.path.resolve(this.iconSourceFile +'[0]'),
        //faviconTargetFileAbsolute: this.path.resolve(this.packagePath +'/Resources/Public/Template/images/favicon.ico'),
       // packageIconTargetFileAbsolute: this.path.resolve(this.packagePath + '/ext_icon.gif'),
        //backendLogoTargetFileAbsolute: this.path.resolve(this.packagePath +'/Resources/Public/Backend/Skin/img/logo_login.png')
    };

    grunt.initConfig({


        pkg: grunt.file.readJSON('package.json'),
        config: config,

        // Compress images job
        imagemin: {
            imageAssets: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    dest: 'images/',
                    src: ['**/*.{'+ config.compressableImageFormats +'}', '!**/*.min.*'],
                    rename: function(destinationPath, filename){
                        var dotPosition = filename.lastIndexOf('.');
                        var fileExtension = '';
                        if (dotPosition > -1) {
                            fileExtension = filename.substr(dotPosition+1);
                            filename = filename.substr(0, dotPosition);
                        }
                        return destinationPath + '/' + filename +'.min.'+ fileExtension;
                    }
                }]
            }
        },

        // Command line tasks
        // Mainly used for image / icon generation.
        exec: {
            generateFavicon: {
                command: 'convert -colorspace RGB -background transparent -define icon:auto-resize "' + config.iconSourceFileAbsolute + '" "'+ config.faviconTargetFileAbsolute +'"'
            },
            generatePackageIcon: {
                command: 'convert -colorspace RGB -alpha remove -antialias -background white "' + config.iconSourceFileAbsolute + '" "'+ config.packageIconTargetFileAbsolute +'"'
            },
            generateBackendLogo: {
                command: 'convert -colorspace RGB -background transparent -antialias -density 400 -resize 500 "' + config.logoSourceFileAbsolute + '" "'+ config.backendLogoTargetFileAbsolute +'"'
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                sourceMap: true,
                sourceMapEmbed: true,
                sourceMapContents: true,
                includePaths: ['bower_components/foundation-sites/scss',
                               '/bower_components/foundation-sites/scss',
                                '/bower_components/foundation-sites',
                               '/bower_components']
            },
            dist: {
                files: {
                    'css/app.css': 'sass/app.scss'
                }
            }
        },

        // File change watcher
        watch: {
            grunt: {
                files: ['Gruntfile.js'],
                tasks: ['sass']
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass']
            },
            images: {
                files: ['images/**/*.{'+ config.compressableImageFormats +'}', '!**/*.min.*'],
                tasks: ['compressImageAssets'],
                options: {
                    event: ['changed', 'added']
                }
            },
            iconSource: {
                files: [config.iconSourceFile],
                tasks: ['createIcons'],
                options: { event: ['changed'] }
            },
            logoSource: {
                files: [config.logoSourceFile],
                tasks: ['createBackendLogo'],
                options: { event: ['changed'] }
            }
        }

    });

    // Load node modules
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-exec');

    // Define tasks
    grunt.registerTask('compile-sass', ['sass']);
    grunt.registerTask('compressImageAssets', ['imagemin:imageAssets']);
    grunt.registerTask('createIcons', ['exec:generateFavicon', 'exec:generatePackageIcon']);
    grunt.registerTask('createBackendLogo', ['exec:generateBackendLogo']);

    // Define default task
    grunt.registerTask('default', ['compile-sass', 'watch']);
}