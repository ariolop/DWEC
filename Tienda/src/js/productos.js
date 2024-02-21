import * as Categorias from './categorias.js';
import * as Paginacion from './paginacion.js';
//import * as Ordenacion from './ordenacion.js';

/* Categorias */
Categorias.cargarFiltroCategorias();
Categorias.cargarCategoriasMenu();

/* Paginación */
Paginacion.cargarPaginaProductos(1);

document.getElementById("filtroCategorias").addEventListener("input", () => {
    console.log("Filtro aplicados");

    const categoria = document.querySelector("input[name=categoriaFiltrada]:checked").value;

    console.log(categoria);

    Paginacion.cargarPaginaProductos(1,categoria,undefined,document.getElementById("orden").value);
});

document.getElementById("orden").addEventListener("input", () => {
    console.log("Ordenacion aplicada");

    const categoriaSeleccionada = document.querySelector("input[name=categoriaFiltrada]:checked");
    const categoria = categoriaSeleccionada ? categoriaSeleccionada.value : undefined;

    Paginacion.cargarPaginaProductos(1,categoria,undefined,document.getElementById("orden").value);
});

document.getElementById("paginacion").addEventListener( ("click"), () => {

});