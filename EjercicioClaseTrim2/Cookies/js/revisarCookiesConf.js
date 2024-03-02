"use strict";

import {formularioEspanol, formularioIngles} from "./componentes.js";
import {existeCookie, getCookie} from "./funciones.js";

//Los nombres de las cookies son "idioma" y "tema"
if(!existeCookie(getCookie("idioma")))
{
    location.href = "configuracion.html";
}

let idioma = getCookie("idioma");
let tema = getCookie("tema");

if (idioma === "ingles")
{
    document.getElementById("container").innerHTML = formularioIngles;
}
else
{
    document.getElementById("container").innerHTML = formularioEspanol;
}

/* Valor por defecto en el formulario */
if(tema === "oscuro")
{
    document.getElementById("tema").value = "oscuro";
}

// document.getElementById("")

