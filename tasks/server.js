"use strict";

var fork = require('child_process').fork;

module.exports = function(grunt) {
    var child;
    grunt.registerTask("functional", "Run functional tests.", function(prop) {
        var args = this.args;
        console.log(__dirname + '/..');
        child = fork('src/web', 
            {
                env: {
                    "PORT": "5050"
                }
            });
        
        process.on('exit', function() {
            child.kill('SIGTERM');
        });
        
        grunt.task.run('simplemocha');
        grunt.task.run('shutdown-functional-server');
    });
    grunt.registerTask("shutdown-functional-server", "Shutdown the functional test server.", function(prop) {
        this.requires('simplemocha');
        var dn = this.async();

        child.on('exit', function (code, signal) {
          dn();
        });
        
        child.kill('SIGTERM');

    });    
};