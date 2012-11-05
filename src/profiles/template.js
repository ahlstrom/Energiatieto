var fs              = require('fs'),
    readline        = require('readline'),
    Lazy            = require('lazy'),
    file            = __dirname + '/Simuloitu2014Tilat.csv',
    stream          = fs.createReadStream(file),
    args            = process.argv.splice(2),
    monthops        = require('../app/js/algorithm/monthops'),
    findHours       = function(args) {
        if (args.length > 0) {
            // find month
            var range = monthops.listDaysInMonth(parseInt(args[0], 10));
            var startHour = range[0] * 24;
            var endHour = range[range.length - 1] * 24;

            if (args.length == 2) {
                // find day in month
                var start = startHour + (parseInt(args[1], 10) * 24); 
                return {
                    start: start,
                    end: start + 24
                }
            } else {
                return {
                    start: startHour,
                    end: endHour
                }
            }
        }

        return {
            start: 0,
            end: -1
        }
    },
    currentLine     = 0,
    startHour       = findHours(args).start,
    endHour         = findHours(args).end,
    profileFunction = function(num) {
        // insert algorithm here
        var multiplier = 2;
        return num * multiplier;
    };



new Lazy(stream)
        .lines
        .forEach(function(ln) {

    if ((endHour < 0 || currentLine < endHour) && 
        (currentLine >= startHour)) {

        var line = ln.toString().replace('\,', '\.'),
            num  = parseFloat(line, 10);
            res  = profileFunction(num);

        console.log(currentLine, ':', num, '=>', res);
    }

    currentLine++;
    
});