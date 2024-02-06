"use strict";

function setCookie(name, value) {
    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

document.getElementById("aceptar").addEventListener("click", (event) => {
    event.preventDefault();
    setCookie("idioma", document.getElementById("idioma").value);
    setCookie("tema", document.getElementById("tema").value);
    location.href = "/EjercicioClaseTrim2/Cookies/";
});