import * as Categorias from './categorias.js';
import * as Productos from './cargarProductos.js';
import * as Carrito from './organizarCarrito.js';

Carrito.añadirEventoAgregarCarrito();

/* Categorias */
Categorias.cargarFiltroCategorias();
Categorias.cargarCategoriasMenu();

/* Comprobamos si venimos del enlace oferta */
document.getElementById("oferta").checked = localStorage.getItem("oferta") ? true : false;
localStorage.removeItem("oferta");

/* Carga de productos */
const categoria = localStorage.getItem("categoriaSeleccionada");

let busqueda = location.search  
                ? location.search.split('?')[1].split('=')[1]
                : "";

if(busqueda) // Hemos abierto productos.html desde la búsqueda
{
    busqueda = busqueda.replaceAll("+"," ").trim();
}
else //Hemos abierto productos.html desde las categorías
{   
    if(categoria)
        Categorias.cargarFiltroSubcategorias(categoria);
}

actualizarProductos();


/* Función que usan los eventos para actualizar los productos */
function actualizarProductos() {
    const categoria = localStorage.getItem("categoriaSeleccionada");
    const subcategoria = localStorage.getItem("subcategoriaSeleccionada");
    const oferta = document.getElementById("oferta").checked;

    if(busqueda) // Hemos abierto productos.html desde la búsqueda
        Productos.cargarBusquedaProductos(busqueda, document.getElementById("orden").value, oferta);
    else
        Productos.cargarCategoriaProductos(categoria, subcategoria, document.getElementById("orden").value, oferta);
}

/* Eventos */
document.getElementById("filtroCategorias").addEventListener("input", () => {
    console.log("Filtro aplicados");

    const categoria = document.querySelector("input[name=categoriaFiltrada]:checked").value;

    localStorage.setItem("categoriaSeleccionada", categoria);
    localStorage.setItem("subcategoriaSeleccionada", "");

    if(categoria)
        Categorias.cargarFiltroSubcategorias(categoria);
    else
        document.getElementById("filtroSubcategorias").innerHTML = "<p>Selecciona una categoria</p>";

    if(busqueda)
        location.search = ``;

    actualizarProductos();
});

document.getElementById("filtroSubcategorias").addEventListener("input", () => {
    console.log("Filtro subcategoria aplicados");

    const subcategoria = document.querySelector("input[name=subcategoriaFiltrada]:checked").value;

    localStorage.setItem("subcategoriaSeleccionada", subcategoria);

    actualizarProductos();
});

document.getElementById("orden").addEventListener("input", () => {
    console.log("Ordenacion aplicada");

    actualizarProductos();
});

document.getElementById("filtroOfertas").addEventListener("input", () => {
    console.log("Filtro ofertas aplicada");

    actualizarProductos();
});