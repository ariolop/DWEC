"use strict";

function sumInput() {
 
    const arr = [];
    let posibleNumero;

    do{
        
        posibleNumero = prompt("Ingresa un número para sumar: ");

        if(posibleNumero !== null && posibleNumero !== "" && isFinite(posibleNumero))
        {
            arr.push(+posibleNumero);
        }

    }while(posibleNumero !== null && posibleNumero !== "" && isFinite(posibleNumero));

    let suma = 0;

    for (let i = 0; i < arr.length; i++) {

        suma += arr[i];
        
    }

    return suma;
}

console.log(sumInput());