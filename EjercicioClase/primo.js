"use strict";

let n = 100
for(let num = 2; num < n; num++)
{
    let esPrimo = true;

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
