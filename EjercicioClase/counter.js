"use strict";

function makeCounter() {
    // en vez de:
    // let count = 0
  
    function counter() {
        return counter.count++;
    }

    counter.set = function(value) {
        return counter = value;
    }

    counter.decrease = function() {
        return counter.count--;
    }
  
    counter.count = 0;
  
    return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
alert( counter.decrease() ); // 0