import { agregarProducto } from "./organizarCarrito.js";

const funkoId = location.search.split("=")[1];

fetch(`http://localhost:3000/funkos?id=${funkoId}`)
    .then(resul => resul.json())
    .then(funko => {
        console.log(funko);

        const informacionFunko = `
            <div class="categoria"> <!-- Categorias[1] -->
                <h4 id="categoria">${funko[0].categorias[1]}</h4>
            </div>
            <div class="nombre">
                <h2 id="nombre">${funko[0].nombre}</h2>
            </div>
            <div class="precio">
                <p><span id="precio">${funko[0].precio}</span>€</p>
            </div>
            <div class="agregarCarrito">
                <button id="agregarCarrito" data-id="${funko[0].id}">Agregar al carrito</button>
            </div>
        `;

        const galeriaFunko = `
        <div id="galeria" class="galeria carousel-indicators">
            <button type="button" class="active" aria-current="true" aria-label="Slide 1" data-bs-target="#carouselFunko" data-bs-slide-to="0">
                <img class="imagenFunkoGaleria" id="imagenFunko"  src="${funko[0].imagenFunko}" alt="Imagen del funko">
            </button>
            <button type="button" data-bs-target="#carouselFunko" data-bs-slide-to="1" aria-label="Slide 2">
                <img class="imagenCajaGaleria" id="imagenCaja" src="${funko[0].imagenCaja}" alt="Imagen de la caja">
            </button>
        </div>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="imagenPrincipal" id="imagenPrincipal" src="${funko[0].imagenFunko}" alt="Imagen del funko">
            </div>
            <div class="carousel-item">
                <img class="imagenPrincipal" id="imagenPrincipal" src="${funko[0].imagenCaja}" alt="Imagen de la caja">
            </div>
        </div>
        `;
    
        document.getElementById("carouselFunko").innerHTML = galeriaFunko;
        document.getElementById("informacion").innerHTML = informacionFunko;
    })
    .then(_ => {
        document.getElementById("agregarCarrito").addEventListener("click", (e) => {
            agregarProducto(e.target.dataset.id);
        });
    });



function añadirEventoAgregarCarrito() {
    document.getElementById("cartas").addEventListener("click", e => {
        if(!e.target.closest("[data-id]")) return;
    
    
        const toast = new Toast(document.getElementById("liveToast"));
        toast.show();
    });
}