'use strict';

let date = new Date(2012, 0, 3);
alert(getWeekDay(date))


function getWeekDay(date) {
    switch (date.getDay()) {
        case 0:
            return "DO";
        case 1:
            return "LU";
        case 2:
            return "MA";
        case 3:
            return "MI";
        case 4:
            return "JU";
        case 5:
            return "VI";
        case 6:    
            return "SA";
        case 7:
            return "DO";
    }
}