export function crearCartas(funkos) {
    let fragmento = "";
    
    funkos.forEach(funko => {
        const carta = `
        <div class="carta">
            <a href="producto.html?id=${funko.id}">
                <div id="imagenes" class="imagenes">
                <img class="funko" src="${funko.imagenFunko}" alt="Imagen del funko">
                <img class="caja"  src="${funko.imagenCaja}" alt="Imagen de la caja">
                </div>
                <p id="nombre" class="nombre">${funko.nombre}</p>
                <div class="contenedorPrecio">
                    ${funko.oferta === "true" ? `
                    <p id="precioSinDescuento" class="precioSinDescuento">${funko.precio.toFixed(2)}€</p>
                    <p id="precioConDescuento" class="precioConDescuento">${(funko.precio * (1 - (funko.descuentoPorcentaje / 100))).toFixed(2)}€</p>
                    ` 
                    : `<p id="precio" class="precio">${funko.precio.toFixed(2)}€</p>`}
                </div>
                <button class="añadirCarrito" data-id="${funko.id}">Agregar al carrito</button>
            </a>
        </div>
        `;

        fragmento += carta; 
    });

    return fragmento;
}