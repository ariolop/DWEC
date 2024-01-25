"use script";

import {formularioEspanol, formularioIngles} from "./componentes.js";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function existeCookie(cookie) {
    return cookie ? true : false;
}

//Los nombres de las cookies son "idioma" y "tema"
if(!existeCookie(getCookie("idioma")))
{
    location.href = "/EjercicioClaseTrim2/Cookies/configuracion.html";
}


let idioma = getCookie("idioma");
let tema = getCookie("tema");

console.log(idioma);
console.log(tema);

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

