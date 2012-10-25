"use strict";

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    lint: {
      grunt: ['grunt.js'],
      server: ['lib/**/*.js', 'test/**/*.js', 'src/**/*.js'],
      client: ['public/js/**/*.js']
    },
    qunit: {
      files: ['test/client/**/*.html']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint functional qunit'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {},
      server: {
        options: {
          node: true,
          predef: [
            // MOCHA
            "describe",
            "it",
            // PHANTOMJS
            "document"
          ]
        }
      },
      client: {
        options: {
          browser: true,
          predef: [
            "window", "d3"
          ]
        }
      }
    },
    casperjs: {
      files: ['test/functional/**/*.js']
    },
    uglify: {},
    simplemocha: {
      node: {
        src: 'test/server/**/*.spec.js',
        options: {
          globals: ['should'],
          timeout: 3000,
          ignoreLeaks: false,
          ui: 'bdd',
          reporter: 'tap'
        }
      },
      functional: {
        src: 'test/functional/**/*.spec.js',
        options: {
          globals: ['should'],
          timeout: 3000,
          ignoreLeaks: false,
          ui: 'bdd',
          reporter: 'tap'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint qunit mocha concat min');

  grunt.registerTask('mocha', 'simplemocha');

  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.loadTasks('tasks');

};
