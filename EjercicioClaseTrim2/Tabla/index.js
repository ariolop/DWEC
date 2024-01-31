"use script";

const ordenarNombre = (f1, f2) => 
    f1.cells[0].textContent.localeCompare(f2.cells[0].textContent);

const ordenarApellido = (f1, f2) => 
    f1.cells[1].textContent.localeCompare(f2.cells[1].textContent);

const ordenarEdad = (f1, f2) => 
    f1.cells[2].textContent - f2.cells[2].textContent;


function ordenarTabla(compara) {

    const body = document.getElementById("table").tBodies[0];
            
    const filas = Array.from(body.rows);

    filas.sort(compara);

    body.append(...filas);
}



document.getElementById("name").addEventListener("click", () => ordenarTabla(ordenarNombre));
document.getElementById("surname").addEventListener("click", () => ordenarTabla(ordenarApellido));
document.getElementById("age").addEventListener("click", () => ordenarTabla(ordenarEdad));
