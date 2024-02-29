"use strict";

const ordenaNumeros = (a,b) => {
    return a.cells[0].innerText - b.cells[0].innerText;
};

const ordenaAlfabetico = (a,b) => {
    return a.cells[1].innerText.localeCompare(b.cells[1].innerText);
};

document.getElementById("grid").addEventListener("click", (e) => {
    if(e.target.tagName !== "TH") return;
    if(!e.target.dataset.type) return;

    let filas = document.getElementById("grid").tBodies[0].rows;

    if(e.target.dataset.type === "number")
        filas = Array.from(filas).sort(ordenaNumeros);
    else if(e.target.dataset.type === "string")
        filas = Array.from(filas).sort(ordenaAlfabetico);

    document.getElementById("grid").tBodies[0].append(...filas);
});