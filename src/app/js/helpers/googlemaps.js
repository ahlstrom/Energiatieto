define(["jquery"], function($) {
    var deferred = $.Deferred();
    // attach to window, since Google uses a JSONP-style callback
    window.googleMapsIsLoaded = function() {
        deferred.resolve();
    };

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key="+window.googleMapsApiKey+"&sensor=false&callback=googleMapsIsLoaded&language=fi";

    document.body.appendChild(script);

    return {
        create: function(callback) {
            deferred.done(callback);
        }
    };
});