import * as Categorias from './categorias.js';

Categorias.cargarCategoriasMenu();

const usuario = localStorage.getItem("sesionLocal");
const productosCarritoID = Object.keys(JSON.parse(localStorage.getItem(usuario))); //ID
const productosCarritoCantidad = Object.values(JSON.parse(localStorage.getItem(usuario))); //Cantidad

cargarInformacionPrecios();

async function cargarInformacionPrecios() {
    const funkosCarrito = await obtenerFunkosCarrito(productosCarritoID);

    console.log(funkosCarrito);

    await calcularPrecios(funkosCarrito, productosCarritoCantidad);
}

async function obtenerFunkosCarrito(productosCarritoID) {
    const resul = await fetch("http://localhost:3000/funkos");
    const funkos = await resul.json();
    return funkos.filter((f) => productosCarritoID.includes(f.id));
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