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
                <div class="precio">
                    <div id="controlCantidad${funko.id}" class="controlesCantidad">
                        <span class="controlMenos" id="-">-</span>
                        <span class="cantidad">${productosCarritoCantidad[funko.id]}</span>
                        <span class="controlMas" id="+">+</span>
                    </div>
                    <p class="precioFunko">${funko.precio.toFixed(2)}€</p>
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
    .then(_ => calcularPrecios())

    console.log("Productos cargados");
}

async function calcularPrecios() {
    const subtotal = await calcularSubtotal();
    console.log("Subtotal " + subtotal);
    const gastosEnvio = calcularGastosEnvio(subtotal);
    console.log("Gastos envio " + gastosEnvio);
    const IVA = 21;
    const cantIVA = calcularIVA(subtotal, gastosEnvio, IVA);
    calcularTotal(subtotal, gastosEnvio, cantIVA);
}

function calcularTotal(subtotal, gastosEnvio, cantIVA) {
    const total = subtotal + gastosEnvio + cantIVA;
    document.getElementById("precioTotal").innerText = total.toFixed(2);

    return total;
}

async function calcularSubtotal() {

    const spanPreciosFunkos = document.getElementsByClassName("precioFunko");
    const precios = Array.from(spanPreciosFunkos).map(f => +f.innerText.slice(0,f.innerText.length-1));
    const spanCantidadFunkos = document.getElementsByClassName("cantidad");
    const cantidades = Array.from(spanCantidadFunkos).map(f => +f.innerText);

    let subtotal = 0;

    for (let i = 0; i < precios.length; i++) {
        subtotal += precios[i] * cantidades[i];
    }

    const codigo = document.getElementById("codigo").value;

    const subtotalConDescuento = codigo ? await calcularDescuento(subtotal, codigo) : subtotal;

    document.getElementById("precioSubtotal").innerText = subtotal.toFixed(2);

    return subtotalConDescuento;
}

function calcularGastosEnvio(subtotal) {
    const gastosEnvio = subtotal < 40 ? 3.99 : 0;

    if(gastosEnvio === 0)
        document.getElementById("contEnvio").classList.add("sinGastos");
    else
        document.getElementById("contEnvio").classList.remove("sinGastos");

    document.getElementById("precioEnvio").innerText = gastosEnvio.toFixed(2);

    return gastosEnvio;
}

function calcularDescuento(total, codigo)
{
    return fetch(`http://localhost:3000/codigosDescuento?codigo=${codigo}`)
    .then(resul => resul.json())
    .then(codigoDescuento => {
        console.log(codigoDescuento);
        
        if(codigoDescuento.length === 0) return total;

        const fechaInicio = new Date(codigoDescuento[0].fechaInicio)
        const hoy = new Date();
        const fechaFin = new Date(codigoDescuento[0].fechaFin)


        console.log(fechaInicio);
        console.log(hoy);
        console.log(fechaFin);

        if(fechaInicio <= hoy && fechaFin >= hoy)
        {
            console.log("Codigo valido");
            document.getElementById("contDescuento").style.display = "flex";
            const precioConDescuento = total * (1 - (+codigoDescuento[0].descuentoPorcentaje/100));
            const cantDescuento = total * (+codigoDescuento[0].descuentoPorcentaje/100);
            document.getElementById("descuento").innerText = cantDescuento.toFixed(2);

            return precioConDescuento;
        }
        else
        {
            console.log("Codigo no valido");
            return total;
        }
    });
}

function calcularIVA(subtotal, gastosEnvio, IVA)
{
    const cantIVA = (subtotal + gastosEnvio) * (IVA / 100);

    document.getElementById("cantIVA").innerText = cantIVA.toFixed(2);

    return cantIVA; 
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
    calcularPrecios();
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

    calcularPrecios();
}

document.getElementById("botonCodigoDescuento").addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("contDescuento").style.display = "none";
    calcularPrecios();
});