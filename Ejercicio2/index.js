'use strict'

function changeImage()
{
    let imagen = document.getElementById("imagen");

    if(imagen.src.match("1"))
    {
        imagen.src = "imagenes/2.jpg";
    }
    else if(imagen.src.match("2.jpg"))
    {
        imagen.src = "imagenes/3.jpg";
    }
    else if(imagen.src.match("3.jpg"))
    {
        imagen.src = "imagenes/4.webp";
    }
    else
    {
        imagen.src = "imagenes/1.jpg";
    }
}