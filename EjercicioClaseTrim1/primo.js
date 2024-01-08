"use strict";

let n = +prompt("Ingresa un número mayor que uno:")

let esPrimo = true;

for(let num = 2; num <= n; num++)
{
    esPrimo = true;

    for(let divisor = 2; divisor <= num/2 && esPrimo; divisor++)
    {
        if(num % divisor == 0)
        {
            esPrimo = false;
        }
    }

    if(esPrimo)
    {
        console.log(num)
    }
}

