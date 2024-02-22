import * as Categorias from './categorias.js';
import * as Paginacion from './paginacion.js';

/* Categorias */
Categorias.cargarFiltroCategorias();
Categorias.cargarCategoriasMenu();

/* Paginación */
const categoria = location.search ? location.search.split('?')[1].split('=')[1] : "";
Paginacion.cargarPaginaProductos(1,categoria);

/* Función que usan los eventos para actualizar los productos */
function actualizarProductos(pagina) {
    const categoria = document.querySelector("input[name=categoriaFiltrada]:checked").value;

    Paginacion.cargarPaginaProductos(pagina,categoria,"",document.getElementById("orden").value);
}

/* Eventos */
document.getElementById("filtroCategorias").addEventListener("input", () => {
    console.log("Filtro aplicados");

    actualizarProductos(1);
});

document.getElementById("orden").addEventListener("input", () => {
    console.log("Ordenacion aplicada");

    actualizarProductos(1);
});

document.getElementById("paginacion").addEventListener( ("click"), (e) => {

    if(!+e.target.id) return;

    console.log("Cambiar de página");

    actualizarProductos(+e.target.id)
});