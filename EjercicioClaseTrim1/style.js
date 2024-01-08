const style = ["Jazz","Blues"];

console.log(style);

style.push("Rock-n-Roll");

console.log(style);

const mitad = Math.floor(style.length/2);

style[mitad] = "Classics";

console.log(style);

console.log(style.shift());

console.log(style);

style.unshift("Rap", "Reggae");

console.log(style);