import * as Categorias from './categorias.js';
import * as Carrito from './carrito.js';

Categorias.cargarCategoriasMenu();

const usuario = localStorage.getItem("sesionLocal");
const productosCarritoCantidad = JSON.parse(localStorage.getItem(usuario)); //Con cantidades de cada uno
const productosCarrito = Object.keys(JSON.parse(localStorage.getItem(usuario))); //Sin cantidad

fetch("http://localhost:3000/funkos")
    .then(resul => resul.json())
    .then(funkos => funkos.filter( (f) => productosCarrito.includes(f.id)))
    .then(funkosCarrito => {
        
    });