"use strict";

var exec = require('child_process').exec;

module.exports = function(grunt) {
    var child;
    grunt.registerTask("start", "Start the server against compiled sources.", function(prop) {
        var args = this.args,
            done = this.async();

        child = exec('node src/web', {
            env: {
                "PORT": "5000"
            }
        });
    });
};