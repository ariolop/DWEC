"use strict";

let calc = {};

calc.calculate = (str) => {

    let partes = str.split(" ");

    if(partes[1] === "-")
    {
        return (+partes[0]) - (+partes[2])
    }
    else if(partes[1] === "+")
    {
        return (+partes[0]) + (+partes[2])
    }
    else
    {
        return "La operacion no se puede realizar"
    }
};

// calc.addMethod = (operador, func) => {
    
// };

console.log( calc.calculate("5 - 2") )