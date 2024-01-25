"use script";

import {informacionEspanol, informacionIngles} from "./componentes.js";
import {existeCookie, getCookie} from "./funciones.js";

//Los nombres de las cookies son "idioma" y "tema"
if(!existeCookie(getCookie("idioma")))
{
    location.href = "/EjercicioClaseTrim2/Cookies/configuracion.html";
}


let idioma = getCookie("idioma");

if(idioma === "espanol")
{
    document.getElementById("container").innerHTML = informacionEspanol;

}
else if (idioma === "ingles")
{
    document.getElementById("container").innerHTML = informacionIngles;
}

// document.getElementById("")

