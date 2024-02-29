"use strict";

document.getElementById("contents").addEventListener("click", (e) => {
    if(!e.target.closest("a")) return;

    let salir = confirm("¿Quieres salir?");

    if(!salir)
        e.preventDefault();
});