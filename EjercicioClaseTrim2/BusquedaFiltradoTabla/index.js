"use strict";

const tabla = document.getElementById('gridDatos');
const buscar = document.createElement('input');
buscar.setAttribute('placeholder','Introduce tu búsqueda');
buscar.setAttribute('type','text');
tabla.parentElement.prepend(buscar);

function buscarEnFila(fila, busqueda) {

    let encontrado = false;
    console.log(fila);

    Array.from(fila.cells).forEach(columna => {
        if(columna.innerText.includes(busqueda))
        {
            encontrado = true;
        }
    });

    return encontrado;
}

buscar.addEventListener('input', e => {
    const filas = document.getElementById('gridDatos').tBodies[0].rows;
    const busqueda = e.target.value;

    Array.from(filas).forEach(fila => {

        console.log(buscarEnFila(fila, busqueda));

        if(buscarEnFila(fila, busqueda))
        {
            fila.style.display = "table-row";
        }
        else
        {
            fila.style.display = "none";
        }
    });
});