"use strict";


for(let i = 1; i < 101; i++)
{
    let mostrar = "";
    /*
    if(i % 3 == 0)
    {
        mostrar += "fizz";
    }

    if(i % 5 == 0)
    {
        mostrar += "buzz";
    }

    if(i % 3 != 0 && i % 5 != 0)
    {
        mostrar += i;
    }
    */
    
    if(i % 15 == 0)
    {
        mostrar = "fizzbuzz"
    }
    else if(i % 3 == 0)
    {
        mostrar = "fizz";
    }
    else if(i % 5 == 0)
    {
        mostrar = "buzz";
    }
    else
    {
        mostrar = i;
    }

    console.log(mostrar)
}