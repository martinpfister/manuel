

module.exports = function(grunt) {

    var path = require('path');
    var packagePath = path.resolve('../../../');
    var packagePathSplit = packagePath.split(path.sep);
    var packageKey = packagePathSplit[packagePathSplit.length-1];

    var compressableImageFormats = 'jpg,gif,svg,jpeg,png';

    // Icon/logo file paths

    var logoSourceFile = '../../Private/LogoSources/logo-default.svg';
    var logoSourceFileAbsolute = path.resolve(logoSourceFile +'[0]');
    var iconSourceFile = '../../Private/LogoSources/icon-default.svg';
    var iconSourceFileAbsolute = path.resolve(iconSourceFile +'[0]');

    var faviconTargetFileAbsolute = path.resolve(packagePath +'/Resources/Public/Template/images/favicon.ico');
    var packageIconTargetFileAbsolute = path.resolve(packagePath + '/ext_icon.gif');
    var backendLogoTargetFileAbsolute = path.resolve(packagePath +'/Resources/Public/Backend/Skin/img/logo_login.png');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),


        // SASS compiler job w/ compass
        compass: {
            options: {
                raw:'unixNewlines =:true\n',
                force: true,
                relativeAssets: false,
                httpPath: '/typo3conf/ext/'+ packageKey +'/Resources/Public/Template/',
                imagesDir:'images',
                fontsDir:'fonts',
                sassDir:'sass',
                sourcemap:true,
            },
            // Generate main css
            app: {
                options: {
                    cssDir:'css',
                    specify: ['sass/app.scss']
                }
            },
            // Generate RTE css
            rte: {
                options: {
                    cssDir:'../Backend/',
                    specify: ['sass/RTE.scss']
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
            },
            generateBackendLogo: {
                command: 'convert -colorspace RGB -alpha remove -antialias -background white "' + logoSourceFileAbsolute + '" "'+ backendLogoTargetFileAbsolute +'"'
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
                tasks: ['createLogoBasedImages'],
                options: { event: ['changed'] }
            },
            logoSource: {
                files: [logoSourceFile],
                tasks: ['createBackendLogo'],
                options: { event: ['changed'] }
            },
        }

    });

    // Load node modules
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-exec');

    // Define tasks
    grunt.registerTask('buildCSSWithCompass', ['compass']);
    grunt.registerTask('buildCSS', ['buildCSSWithCompass']);
    grunt.registerTask('compressImageAssets', ['imagemin:imageAssets']);
    grunt.registerTask('createIcons', ['exec:generateFavicon', 'exec:generatePackageIcon']);
    grunt.registerTask('createBackendLogo', ['exec:generateBackendLogo']);

    // Define default task
    grunt.registerTask('default', ['buildCSS', 'compressImageAssets', 'createIcons', 'createBackendLogo', 'watch']);

}