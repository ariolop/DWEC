import * as Categorias from './categorias.js';

Categorias.cargarCategoriasMenu();

const usuario = localStorage.getItem("sesionLocal");

cargarProductos();

async function cargarProductos() {
    const productosCarritoCantidad = Object.values(JSON.parse(localStorage.getItem(usuario))); //Cantidad
    const productosCarritoID = Object.keys(JSON.parse(localStorage.getItem(usuario))); //ID

    const funkosCarrito = await obtenerFunkosCarrito(productosCarritoID);
    const fragmento = crearCartas(funkosCarrito, productosCarritoCantidad);

    document.getElementById("productos").innerHTML = fragmento;
    calcularCantidadArticulos(productosCarritoCantidad);

    añadirEventoCantidad(funkosCarrito, productosCarritoCantidad);
    await calcularPrecios(funkosCarrito, productosCarritoCantidad);
}

async function obtenerFunkosCarrito(productosCarritoID) {
    const resul = await fetch("http://localhost:3000/funkos");
    const funkos = await resul.json();
    return funkos.filter((f) => productosCarritoID.includes(f.id));
}

function crearCartas(funkosCarrito, productosCarritoCantidad) {
        let fragmento = "";

        funkosCarrito.forEach((funko, index) => {
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
                <div class="precio">
                    <div id="controlCantidad${funko.id}" class="controlesCantidad">
                        <span class="controlMenos" id="-">-</span>
                        <span class="cantidad">${productosCarritoCantidad[index]}</span>
                        <span class="controlMas" id="+">+</span>
                    </div>
                    <p class="precioFunko">${funko.precio.toFixed(2)}€</p>
                </div>
            </div>
            `;
            fragmento += carta;
        });

        return fragmento;
}

function añadirEventoCantidad(funkosCarrito) {
    funkosCarrito.forEach(funko => {
        document.getElementById(`controlCantidad${funko.id}`).addEventListener("click", (e) => {
            if(e.target.tagName !== "SPAN") return;
    
            if(e.target.id === "+")
            {
                agregarCantidadProducto(funko);
            }
            else if(e.target.id === "-")
            {
                quitarCantidadProducto(funko);
            }
        });
    });
}

async function calcularPrecios(funkosCarrito, productosCarritoCantidad) {
    
    const preciosFunkos = funkosCarrito.map(funko => +funko.precio);

    const subtotal = await calcularSubtotal(preciosFunkos, productosCarritoCantidad);
    const gastosEnvio = calcularGastosEnvio(subtotal);
    const IVA = 21;
    const cantidadIVA = calcularIVA(subtotal, gastosEnvio, IVA);
    const total = subtotal + gastosEnvio + cantidadIVA;
    document.getElementById("precioTotal").innerText = total.toFixed(2);
}

async function calcularSubtotal(preciosFunkos, productosCarritoCantidad) {

    const subtotal = preciosFunkos.reduce((subtotal, precio, numeroProducto) => {
        return subtotal + (precio * productosCarritoCantidad[numeroProducto]);
    }, 0);

    document.getElementById("precioSubtotal").innerText = subtotal.toFixed(2);

    const codigo = document.getElementById("codigo").value;
    const subtotalConDescuento = codigo ? await calcularDescuento(subtotal, codigo) : subtotal;

    document.getElementById("precioSubtotal").innerText = subtotal.toFixed(2);

    return subtotalConDescuento;
}

function calcularDescuento(subtotal, codigo)
{
    return fetch(`http://localhost:3000/codigosDescuento?codigo=${codigo}`)
    .then(resul => resul.json())
    .then(codigoDescuento => {
        console.log(codigoDescuento);
        
        if(codigoDescuento.length === 0) return subtotal;

        const fechaInicio = new Date(codigoDescuento[0].fechaInicio)
        const hoy = new Date();
        const fechaFin = new Date(codigoDescuento[0].fechaFin)

        if(fechaInicio <= hoy && fechaFin >= hoy)
        {
            console.log("Codigo valido");
            document.getElementById("contDescuento").style.display = "flex";
            const precioConDescuento = subtotal * (1 - (+codigoDescuento[0].descuentoPorcentaje/100));
            const cantDescuento = subtotal * (+codigoDescuento[0].descuentoPorcentaje/100);
            document.getElementById("descuento").innerText = cantDescuento.toFixed(2);

            return precioConDescuento;
        }
        else
        {
            console.log("Codigo no valido");
            return subtotal;
        }
    });
}

function calcularGastosEnvio(subtotal) {
    if(subtotal === 0 )
    {
        document.getElementById("contEnvio").classList.remove("sinGastos");
        document.getElementById("precioEnvio").innerText = 0.00;
        return 0.00;
    }

    const gastosEnvio = subtotal < 40 ? 3.99 : 0;

    if(gastosEnvio === 0)
        document.getElementById("contEnvio").classList.add("sinGastos");
    else
        document.getElementById("contEnvio").classList.remove("sinGastos");

    document.getElementById("precioEnvio").innerText = gastosEnvio.toFixed(2);

    return gastosEnvio;
}

function calcularIVA(subtotal, gastosEnvio, IVA)
{
    const cantIVA = (subtotal + gastosEnvio) * (IVA / 100);

    document.getElementById("cantIVA").innerText = cantIVA.toFixed(2);

    return cantIVA; 
}

function calcularCantidadArticulos(productosCarritoCantidad) {
    let totalCantidad = 0;
    
    if(productosCarritoCantidad.length > 0)
    {
        totalCantidad = Object.values(productosCarritoCantidad).reduce((totalCantidades, cantidad) => {
            return totalCantidades + cantidad;
        });
    }
    else
    {
        totalCantidad = 0;
    }

   document.getElementById("cantidadArticulos").innerText = totalCantidad;
}


document.getElementById("botonCodigoDescuento").addEventListener("click", async (e) => {
    e.preventDefault();

    document.getElementById("contDescuento").style.display = "none";

    const productosCarritoCantidad = Object.values(JSON.parse(localStorage.getItem(usuario))); //Cantidad
    const productosCarritoID = Object.keys(JSON.parse(localStorage.getItem(usuario))); //ID

    const funkosCarrito = await obtenerFunkosCarrito(productosCarritoID);

    calcularPrecios(funkosCarrito, productosCarritoCantidad);
    calcularCantidadArticulos(productosCarritoCantidad);
});


async function agregarCantidadProducto(funko) {
    const cantidad = +document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText;
    document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText = cantidad + 1;

    const productosCarrito = JSON.parse(localStorage.getItem(usuario));
    productosCarrito[funko.id] += 1;
    localStorage.setItem(usuario, JSON.stringify(productosCarrito));

    const productosCarritoCantidad = Object.values(JSON.parse(localStorage.getItem(usuario))); //Cantidad
    const productosCarritoID = Object.keys(JSON.parse(localStorage.getItem(usuario))); //ID
    const funkosCarrito = await obtenerFunkosCarrito(productosCarritoID);

    console.log(productosCarritoCantidad + " " + productosCarritoID);
    console.log(funkosCarrito);

    calcularPrecios(funkosCarrito, productosCarritoCantidad);
    calcularCantidadArticulos(productosCarritoCantidad);
}

async function quitarCantidadProducto(funko) {
    const cantidadActual = +document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText;
    document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText = cantidadActual - 1;

    const productosCarrito = JSON.parse(localStorage.getItem(usuario));
    productosCarrito[funko.id] -= 1;

    if(productosCarrito[funko.id] == 0)
    {
        productosCarrito[funko.id] = undefined;
    }

    localStorage.setItem(usuario, JSON.stringify(productosCarrito));

    /* Si hemos asignado undefined en algún momento, volvemos a cargar los productos */
    if(!productosCarrito[funko.id])
    {
        cargarProductos();
    }
    else
    {
        const productosCarritoCantidad = Object.values(JSON.parse(localStorage.getItem(usuario))); //Cantidad
        const productosCarritoID = Object.keys(JSON.parse(localStorage.getItem(usuario))); //ID
        const funkosCarrito = await obtenerFunkosCarrito(productosCarritoID);

        await calcularPrecios(funkosCarrito, productosCarritoCantidad);
        calcularCantidadArticulos(productosCarritoCantidad);

        console.log(productosCarritoCantidad + " " + productosCarritoID);
        console.log(funkosCarrito);
    }
}