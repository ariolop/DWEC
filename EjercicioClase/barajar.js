"use strict";

const shuffle = (arr) => {

    arr.forEach((elem, indice, arr) => {
        const numAlea = Math.floor(Math.random()*arr.length);

        let backup = elem;
        arr[indice] = arr[numAlea];
        arr[numAlea] = backup;
    });

    // for(let i = 0; i < arr.length; i++)
    // {
    //     const numAlea = Math.floor(Math.random()*arr.length);

    //     let backup = arr[i];
    //     arr[i] = arr[numAlea];
    //     arr[numAlea] = backup;
    // }
}

const arr = [1,2,3,4,5,6,7,8,9]

console.log("Baraja inicial")
console.log(arr);

shuffle(arr);

console.log("Barajar")
console.log(arr);

// shuffle(arr);

// console.log(arr);

// shuffle(arr);

// console.log(arr);
