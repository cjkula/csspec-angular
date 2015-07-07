'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      csspec: {
        dev: {
          files: {
            'css-tests/suite-csspec.sass' : 'css-tests/suite.csspec'
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
              'css-tests/suite-csspec.css' : 'css-tests/suite-csspec.sass'
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

    // can't seem to load this with #loadNpmTasks
    // as above, which prompts the error:
    // "Local Npm module <csspec-grunt> not found. Is it installed?"
    // Perhaps the module cofiguration is off a bit?
    grunt.loadTasks('./node_modules/csspec-grunt');

    grunt.registerTask('default', ['watch']);
};