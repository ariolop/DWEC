'use strict'

let usuario = prompt("Introduce el nombre de usuario: ", "");

if(usuario == "Admin")
{
    let contraseña = prompt("Introduce la contraseña: ","");

    if(contraseña == "ElMejor")
    {
        alert("Bienvenido");
    }
    else if(contraseña == "")
    {
        alert("Cancelado");
    }
    else
    {
        alert("Contraseña incorrecta");
    }
    
}
else if(usuario == "")
{
    alert("Cancelado");
}
else
{
    alert("No te conozco");
}