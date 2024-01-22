'use strict'

const usuario = prompt("Introduce el nombre de usuario: ", "");

if(usuario === "Administrador")
{
    const contraseña = prompt("Introduce la contraseña: ","");

    if(contraseña === "ElMejor")
    {
        alert("Bienvenido");
    }
    else if(contraseña === null)
    {
        alert("Cancelado");
    }
    else
    {
        alert("Contraseña incorrecta");
    }
    
}
else if(usuario === null)
{
    alert("Cancelado");
}
else
{
    alert("No te conozco");
}