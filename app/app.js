angular.module('calendarDemoApp',[])
  .directive('monthDrop',function(){
    var currentMonth = new Date().getMonth();
    return {
      link: function(scope,element,attrs){
        scope.months = ['January', 'February', 'March',
                  'April', 'May', 'June',
                  'July', 'August', 'September',
                  'October', 'Novemeber', 'December'];
        scope.currentMon = scope.months[currentMonth];
      },
      templateUrl: 'month-dropdown.html'
    };
  })
  .directive('yearDrop',function(){
    var currentYear = new Date().getFullYear();
    return {
      link: function(scope,element,attrs){
        scope.years = [];
        for (var i = +attrs.offset; i < +attrs.range + 1; i++){
            scope.years.push(currentYear + i);
        }
        scope.currentYr = currentYear;
      },
      templateUrl: 'year-dropdown.html'
    };
  })
  .directive('calendarRow',function(){
    var currentDate = new Date();
    //var calendarRange = CalendarRange;
    return {
      link: function(scope,element,attrs){
        //scope.date = currentDate.getDate();
        console.log("current date = " + scope.date);
        var prep = {}, range = {};
        prep = CalendarRange.prepareDate(currentDate);
        range = CalendarRange.getMonthlyRange(prep.date);
        console.log("first = " + range.first);
        scope.day0 = range.first.getDate();
        if (range.first.getMonth() != currentDate.getMonth() ) {
          scope.shade = 'shade';
          console.log("shading....");
        }
      },
      templateUrl: 'calendar.html'
    };
  });

