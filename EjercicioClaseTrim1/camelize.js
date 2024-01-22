"use strict";

function camelize(str) 
{
    let separado = str.split("-");

    for (let i = 1; i < separado.length; i++) 
    {        
        // let letras = separado[i].split('');
        // letras[0] = letras[0].toUpperCase();
        // separado[i] = letras.join('');

        separado[i] = separado[i].charAt(0).toUpperCase() + separado[i].slice(1);
    }

    return separado.join('');
}

console.log(camelize("background-color"));
console.log(camelize("list-style-image"));
console.log(camelize("-webkit-transition"));

