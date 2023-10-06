'use scrict'

let edad = +prompt("¿Cuál es tu edad?");

if(edad > 13 && edad < 91)
{
    alert("La edad está entre 14 y 90");
}

edad = +prompt("Introduce otra edad: ");

if(edad < 14 && edad > 90)
{
    alert("La edad está entre 14 y 90");
}