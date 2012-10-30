if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
        'underscore'
    ], function(_) {
        var daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        var rev = function(list) { 
            var newList = list.slice();
            newList.reverse();
            return newList;
        };

        var dayInTheBeginningOfMonth = function(month) {
            return _.reduce(_.range(month), function(memo, num) {
                return memo + daysInMonths[num];
            }, 0);
        };

        var monthDayNumberRange = function(month) {
            var start = dayInTheBeginningOfMonth(month);
            var end = start + daysInMonths[month];
            return _.range(start, end);
        };

        return {
            numDays: function(month) {
                return daysInMonths[month];
            },
            monthForDay: function(day) {
                return _.find(_.range(11, -1, -1), function(num) {
                    return (day - dayInTheBeginningOfMonth(num)) >= 0;
                });
            },
            listDaysInMonth: monthDayNumberRange, 
            dayInTheBeginningOfMonth: dayInTheBeginningOfMonth
        };
});