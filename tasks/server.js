"use strict";

var exec = require('child_process').exec;

module.exports = function(grunt) {
    var child;
    grunt.registerTask("functional", "Run functional tests.", function(prop) {
        var args = this.args;

        child = exec('node src/web', {
            env: {
                "PORT": "5050"
            }
        });


        grunt.task.run('simplemocha');
        grunt.task.run('shutdown-functional-server');
    });
    grunt.registerTask("shutdown-functional-server", "Shutdown the functional test server.", function(prop) {
        var done = this.async();

        child.on('exit', function (code, signal) {
          done();
        });
        
        child.kill('SIGHUP');

    });    
};