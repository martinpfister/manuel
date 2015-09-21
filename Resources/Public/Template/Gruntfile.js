

module.exports = function(grunt) {

    var path = require('path');
    var packagePath = path.resolve('../../../');
    var packagePathSplit = packagePath.split(path.sep);
    var packageKey = packagePathSplit[packagePathSplit.length-1];

    var compressableImageFormats = 'jpg,gif,svg,jpeg,png';

    // Icon file paths
    var iconSourceFile = '../../Private/LogoSources/icon-default.svg';
    var iconSourceFileAbsolute = path.resolve(iconSourceFile +'[0]');
    var faviconTargetFileAbsolute = path.resolve(packagePath +'/Resources/Public/Template/images/favicon.ico');
    var packageIconTargetFileAbsolute = path.resolve(packagePath + '/ext_icon.gif');


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        // SASS compiler job w/o compass
        sass: {
            main: {
                options: {
                    sourcemap: true,
                    unixNewlines: true
                },
                files: {
                    'css/app.css': 'sass/app.scss'
                }
            }
        },


        // SASS compiler job w/ compass
        compass: {
            main: {
                options: {
                    raw:'unixNewlines =:true\n',
                    force: true,
                    relativeAssets: false,
                    httpPath: '/typo3conf/ext/'+ packageKey +'/Resources/Public/Template/',
                    imagesDir:'images',
                    fontsDir:'fonts',
                    sassDir:'sass',
                    cssDir:'css'
                }
            }
        },


        // Compress images job
        imagemin: {
            imageAssets: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    dest: 'images/',
                    src: ['**/*.{'+ compressableImageFormats +'}', '!**/*.min.*'],
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
                command: 'convert -colorspace RGB -background transparent -define icon:auto-resize "' + iconSourceFileAbsolute + '" "'+ faviconTargetFileAbsolute +'"'
            },
            generatePackageIcon: {
                command: 'convert -colorspace RGB -alpha remove -antialias -background white "' + iconSourceFileAbsolute + '" "'+ packageIconTargetFileAbsolute +'"'
            }
        },


        // File change watcher
        watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['buildCSS'],
                options: {livereload:true}
            },
            images: {
                files: ['images/**/*.{'+ compressableImageFormats +'}', '!**/*.min.*'],
                tasks: ['compressImageAssets'],
                options: {
                    event: ['changed', 'added']
                }
            },
            iconSource: {
                files: [iconSourceFile],
                tasks: ['createIcons'],
                options: { event: ['changed'] }
            }
        }

    });

    // Load node modules
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-exec');

    // Define tasks
    grunt.registerTask('buildCSSWithCompass', ['compass']);
    grunt.registerTask('buildCSSWithoutCompass', ['sass']);
    grunt.registerTask('buildCSS', ['buildCSSWithCompass']);
    grunt.registerTask('compressImageAssets', ['imagemin:imageAssets']);
    grunt.registerTask('createIcons', ['exec:generateFavicon', 'exec:generatePackageIcon']);

    // Define default task
    grunt.registerTask('default', ['buildCSS', 'compressImageAssets', 'createIcons', 'watch']);

}