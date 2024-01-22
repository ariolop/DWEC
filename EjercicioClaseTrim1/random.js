function random(min, max) {
    
    let alea = (Math.random() * (max-min)) + min;

    return alea;
}

function randomInteger(min, max) {
    
    let alea = Math.floor((Math.random() * ((max-min)+1)) + min);

    return alea;
}

console.log(randomInteger(-5,0));
console.log(randomInteger(-5,0));
console.log(randomInteger(-5,0));
console.log(randomInteger(-5,0));
console.log(randomInteger(-5,0));
console.log(randomInteger(-5,0));
console.log(randomInteger(-5,0));
console.log(randomInteger(-5,0));
console.log(randomInteger(-5,0));