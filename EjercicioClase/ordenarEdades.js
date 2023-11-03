"use strict";

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ pete, john, mary ];

const sortByAge = (arr) =>
{
    arr.sort((a, b) => a.age - b.age);
}

sortByAge(arr);

// ahora: [john, mary, pete]
console.log(arr);
alert(arr[0].name); // John
alert(arr[1].name); // Mary
alert(arr[2].name); // Pete