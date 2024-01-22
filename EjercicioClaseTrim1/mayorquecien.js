"use strict"

let num;
do
{
    num = +prompt("Ingresa un número mayor que cien:")
}while(num <= 100 || isNaN(num))

alert("El numero es: " + num);