"use strict";

/*global module:false*/
module.exports = function(grunt) {

  var log = function() {
    console.log(this);
  };

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
      server: ['test/**/*.js', 'src/*.js', 'src/lib/**/*.js', 'src/api/**/*.js', 'src/views/**/*.js'],
      client: ['src/app/js/**/*.js']
    },
    qunit: {
      files: ['test/client/**/*.html']
    },
    concat: {
      dist: {
        src: ['public/lib/**/*.js', 'public/js/**/*.js'],
        dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
      }
    },
    min: {
      dist: {
        src: ['<config:concat.dist.dest>'],
        dest: 'public/dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },
    watch: {
      files: ['lib/**/*.js', 'test/**/*.js', 'src/**/*.js', 'public/js/**/*.js'],
      tasks: 'lint functional'
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
      },
      client: {
        src: 'test/client/**/*.spec.js'
      }
    },
    requirejs: {
      mainConfigFile: 'src/app/requirejs.config.js',
      // this paths config must be here, otherwise almond won't work
      paths: {

      },
      almond: true,
      insertRequire: ['main'],
      dir: 'public/dist',
      appDir: 'src/app',
      inlineText: true,
      modules: [{
        name: 'main'
      }],
      deps: [ 'backbone.marionette.handlebars' ],
      hbs: {
        templateExtension: 'hbs'
      },
      pragmas: {
        doExclude: true
      },
      pragmasOnSave: {
        //removes Handlebars.Parser code (used to compile template strings) set
        //it to `false` if you need to parse template strings even after build
        excludeHbsParser : true,
        // kills the entire plugin set once it's built.
        excludeHbs: true,
        // removes i18n precompiler, handlebars and json2
        excludeAfterBuild: true
      }
    },
    shell: {
      git_add_dist: {
        command: 'git add public/dist',
        stdout: true
      },
      git_commit_new_rel: {
        command: 'git commit -m \'Deploy v<%= pkg.version %>\'',
        stdout: true
      },
      git_push_to_heroku: {
        command: 'git push heroku master',
        stdout: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint functional requirejs');

  grunt.registerTask('deploy', 'requirejs shell');

  grunt.registerTask('mocha', 'simplemocha');

  grunt.registerTask('run', 'lint qunit functional concat min start');

  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.loadNpmTasks('grunt-requirejs');

  grunt.loadNpmTasks('grunt-shell');

  grunt.loadTasks('tasks');

};
