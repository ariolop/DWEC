"use strict";

const copySorted = (arr) => {
    
    //let aux = arr.slice(0);

    //let aux = arr.map(item => item)
    
    let aux = [].aux.concat(arr);

    aux.sort();

    return aux;
}

const arr = ["HTML", "JavaScript", "CSS"];

const sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (sin cambios)