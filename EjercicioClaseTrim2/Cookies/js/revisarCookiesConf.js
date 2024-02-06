"use strict";

import {formularioEspanol, formularioIngles} from "./componentes.js";
import {existeCookie, getCookie} from "./funciones.js";

//Los nombres de las cookies son "idioma" y "tema"
if(!existeCookie(getCookie("idioma")))
{
    location.href = "/EjercicioClaseTrim2/Cookies/configuracion.html";
}

let idioma = getCookie("idioma");
let tema = getCookie("tema");

if(idioma === "espanol")
{
    document.getElementById("container").innerHTML = formularioEspanol;

}
else if (idioma === "ingles")
{
    document.getElementById("container").innerHTML = formularioIngles;
}

if(tema === "oscuro")
{
    document.getElementById("tema").value = "oscuro";
}

// document.getElementById("")

