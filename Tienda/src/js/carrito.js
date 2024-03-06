import * as Categorias from './categorias.js';


Categorias.cargarCategoriasMenu();

const usuario = localStorage.getItem("sesionLocal");

cargarProductos();

function cargarProductos() {

    const productosCarritoCantidad = JSON.parse(localStorage.getItem(usuario)); //Con cantidades de cada uno
    const productosCarrito = Object.keys(JSON.parse(localStorage.getItem(usuario))); //Sin cantidad

    fetch("http://localhost:3000/funkos")
    .then(resul => resul.json())
    .then(funkos => funkos.filter( (f) => productosCarrito.includes(f.id)))
    .then(funkosCarrito => {
        let fragmento = "";
        funkosCarrito.forEach(funko => {
            const carta = `
            <div class="carta" data-id="${funko.id}">
                <div class="funko">
                    <div class="foto">
                        <img src="${funko.imagenFunko}" alt="Imagen funko">
                    </div>
                    <div class="datos">
                        <p class="nombreFunko">${funko.nombre}</p>
                        <p class="categorias">
                            <span id="categoria">${funko.categorias[0]}</span> -
                            <span id="subcategoria">${funko.categorias[1]}</span>
                        </p>
                    </div>
                </div>
                <div class="contenedorCantidad">
                    <p>Cantidad</p>
                    <div id="controlCantidad${funko.id}" class="controlesCantidad">
                        <span class="controlMenos" id="-">-</span>
                        <span class="cantidad">${productosCarritoCantidad[funko.id]}</span>
                        <span class="controlMas" id="+">+</span>
                    </div>
                </div>
                <div class="precio">
                    <span class="precioFunko">${funko.precio.toFixed(2)}€</span>
                </div>
            </div>
            `;

            fragmento += carta;
        })
        
        document.getElementById("productos").innerHTML = fragmento;
        return funkosCarrito;
    })
    .then(funkosCarrito => {

        funkosCarrito.forEach(funko => {
            document.getElementById(`controlCantidad${funko.id}`).addEventListener("click", (e) => {
                if(e.target.tagName !== "SPAN") return;
            
                if(e.target.id === "+")
                {
                    agregarCantidadProducto(funko, productosCarritoCantidad);
                }
                else
                {
                    quitarCantidadProducto(funko, productosCarritoCantidad);
                }
                
                const subtotal = calcularSubtotal();
                calcularGastosEnvio(subtotal);
            });
        })
    })
    .then(_ => calcularCantidadArticulos(productosCarritoCantidad))
    .then(_ => calcularSubtotal())
    .then(subtotal => calcularGastosEnvio(subtotal));

    console.log("Productos cargados");
}

function calcularSubtotal() {

    const spanPreciosFunkos = document.getElementsByClassName("precioFunko");
    const precios = Array.from(spanPreciosFunkos).map(f => +f.innerText.slice(0,f.innerText.length-1));
    const spanCantidadFunkos = document.getElementsByClassName("cantidad");
    const cantidades = Array.from(spanCantidadFunkos).map(f => +f.innerText);

    let precioTotal = 0;

    for (let i = 0; i < precios.length; i++) {
        precioTotal += precios[i] * cantidades[i];
    }

    document.getElementById("precioTotal").innerText = precioTotal.toFixed(2);
    return precioTotal;
}

function calcularGastosEnvio(subtotal) {
    const gastosEnvio = subtotal < 40 ? 3.99 : 0;

    if(gastosEnvio === 0)
        document.getElementById("contEnvio").classList.add("sinGastos");
    else
        document.getElementById("contEnvio").classList.remove("sinGastos");

    document.getElementById("precioEnvio").innerText = gastosEnvio.toFixed(2);
}

function calcularCantidadArticulos(productosCarritoCantidad) {
    const totalArticulos = Object.values(productosCarritoCantidad).reduce((totalArticulos, cantidad) => totalArticulos + cantidad);
    
    document.getElementById("cantidadArticulos").innerText = totalArticulos;
}

function agregarCantidadProducto(funko, productosCarritoCantidad) {
    const cantidad = +document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText;
    document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText = cantidad + 1;

    productosCarritoCantidad[funko.id] += 1;

    localStorage.setItem(usuario, JSON.stringify(productosCarritoCantidad));
}

function quitarCantidadProducto(funko, productosCarritoCantidad) {
    const cantidadActual = +document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText;
    
    document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText = cantidadActual - 1;
    productosCarritoCantidad[funko.id] -= 1;

    if(productosCarritoCantidad[funko.id] === 0)
    {
        productosCarritoCantidad[funko.id] = undefined;
    }

    localStorage.setItem(usuario, JSON.stringify(productosCarritoCantidad));

    /* Si hemos asignado undefined en algún momento, volvemos a cargar los productos */
    if(productosCarritoCantidad[funko.id] === undefined)
    {
        cargarProductos();
    }
}