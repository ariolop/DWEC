'use scrict'

let age = +prompt("¿Cuál es tu age?");

if(age > 13 && age < 91)
{
    alert("La age está entre 14 y 90");
}
else
{
    alert("La age no está entre 14 y 90");
}

age = +prompt("Introduce otra age: ");

if(!(age > 13 && age < 91))
{
    alert("La age no está entre 14 y 90");
}
else
{
    alert("La age está entre 14 y 90");
}

age = +prompt("Introduce otra age: ");

if(age < 14 || age > 90)
{
    alert("La age no está entre 14 y 90");
}
else
{
    alert("La age está entre 14 y 90");
}