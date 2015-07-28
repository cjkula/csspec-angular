'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      csspec: {
        dev: {
          files: {
            'css-tests/suite-csspec.sass' : 'css-tests/suite.csspec',
            // 'css-tests/virtual-csspec.sass' : 'css-tests/virtual.csspec',
          }
        }
      },

      sass: {
        dev: {
          options: {
            style: 'expanded',
            compass: false
          },
          files: {
              'app/style.css' : 'app/sass/style.scss',
              'css-tests/suite-csspec.css' : 'css-tests/suite-csspec.sass',
              // 'css-tests/virtual-csspec.css' : 'css-tests/virtual-csspec.sass'
          }
        }
      },

      watch: {
        sass: {
          files: [
            'app/sass/{,*/}*.{scss,sass}'
          ],
          tasks: ['sass:dev']
        },
        csspec: {
          files: [
            'css-tests/*.csspec'
          ],
          tasks: ['csspec:dev', 'sass:dev']
        }
      }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-csspec');

    grunt.registerTask('default', ['csspec:dev', 'sass:dev', 'watch']);
};