import * as Categorias from './categorias.js';

Categorias.cargarCategoriasMenu();

const usuario = localStorage.getItem("sesionLocal");

cargarProductos();

async function cargarProductos() {
    const productosCarritoCantidad = Object.values(JSON.parse(localStorage.getItem(usuario))); //Cantidad
    const productosCarritoID = Object.keys(JSON.parse(localStorage.getItem(usuario))); 

    console.log(productosCarritoCantidad);
    console.log(productosCarritoID);

    const funkosCarrito = await obtenerFunkosCarrito(productosCarritoID);

    console.log(funkosCarrito);

    const fragmento = crearCartas(funkosCarrito, productosCarritoCantidad);

    document.getElementById("productos").innerHTML = fragmento;

    añadirEventoCantidad(funkosCarrito);

    calcularPrecios(funkosCarrito, productosCarritoCantidad);

    calcularCantidadArticulos(productosCarritoCantidad);
}

async function obtenerFunkosCarrito(productosCarritoID) {
    const resul = await fetch("http://localhost:3000/funkos");
    const funkos = await resul.json();
    return funkos.filter((f) => productosCarritoID.includes(f.id));
}

function crearCartas(funkosCarrito, productosCarritoCantidad) {
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
        });

        return fragmento;
}

function añadirEventoCantidad(funkosCarrito) {
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
        });
    });
}

function calcularPrecios(funkosCarrito, productosCarritoCantidad) {
    
    const preciosFunkos = funkosCarrito.map(funko => +funko.precio);

    const subtotal = calcularSubtotal(preciosFunkos, productosCarritoCantidad);
    const gastosEnvio = calcularGastosEnvio(subtotal);
    const cantidadIVA = calcularIVA(subtotal, gastosEnvio);
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
    const totalCantidad = Object.values(productosCarritoCantidad).reduce((totalCantidades, cantidad) => {
        return totalCantidades + cantidad;
    });

   document.getElementById("cantidadArticulos").innerText = totalCantidad;
}


document.getElementById("botonCodigoDescuento").addEventListener("click", async (e) => {
    e.preventDefault();

    document.getElementById("contDescuento").style.display = "none";

    const productosCarritoCantidad = Object.values(JSON.parse(localStorage.getItem(usuario))); //Cantidad
    const productosCarritoID = Object.keys(JSON.parse(localStorage.getItem(usuario))); 

    const funkosCarrito = await obtenerFunkosCarrito(productosCarritoID);

    calcularPrecios(funkosCarrito, productosCarritoCantidad);
    calcularCantidadArticulos(productosCarritoCantidad);
});

// function cargarProductos() {

//     const productosCarritoCantidad = JSON.parse(localStorage.getItem(usuario)); //Con cantidades de cada uno
//     const productosCarritoID = Object.keys(JSON.parse(localStorage.getItem(usuario))); //Sin cantidad

//     fetch("http://localhost:3000/funkos")
//     .then(resul => resul.json())
//     .then(funkos => funkos.filter( (f) => productosCarritoID.includes(f.id)))
//     .then(funkosCarrito => {
//         let fragmento = "";
//         funkosCarrito.forEach(funko => {
//             const carta = `
//             <div class="carta" data-id="${funko.id}">
//                 <div class="funko">
//                     <div class="foto">
//                         <img src="${funko.imagenFunko}" alt="Imagen funko">
//                     </div>
//                     <div class="datos">
//                         <p class="nombreFunko">${funko.nombre}</p>
//                         <p class="categorias">
//                             <span id="categoria">${funko.categorias[0]}</span> -
//                             <span id="subcategoria">${funko.categorias[1]}</span>
//                         </p>
//                     </div>
//                 </div>
//                 <div class="precio">
//                     <div id="controlCantidad${funko.id}" class="controlesCantidad">
//                         <span class="controlMenos" id="-">-</span>
//                         <span class="cantidad">${productosCarritoCantidad[funko.id]}</span>
//                         <span class="controlMas" id="+">+</span>
//                     </div>
//                     <p class="precioFunko">${funko.precio.toFixed(2)}€</p>
//                 </div>
//             </div>
//             `;

//             fragmento += carta;
//         })
        
//         document.getElementById("productos").innerHTML = fragmento;
//         return funkosCarrito;
//     })
//     .then(funkosCarrito => {

//         funkosCarrito.forEach(funko => {
//             document.getElementById(`controlCantidad${funko.id}`).addEventListener("click", (e) => {
//                 if(e.target.tagName !== "SPAN") return;
            
//                 if(e.target.id === "+")
//                 {
//                     agregarCantidadProducto(funko, productosCarritoCantidad);
//                 }
//                 else
//                 {
//                     quitarCantidadProducto(funko, productosCarritoCantidad);
//                 }
//             });
//         })
//     })
//     .then(_ => calcularCantidadArticulos(productosCarritoCantidad))
//     .then(_ => calcularPrecios());

//     console.log("Productos cargados");
// }

// export async function calcularPrecios() {
//     const subtotal = await calcularSubtotal();
//     console.log("Subtotal " + subtotal);
//     const gastosEnvio = calcularGastosEnvio(subtotal);
//     console.log("Gastos envio " + gastosEnvio);
//     const IVA = 21;
//     const cantIVA = calcularIVA(subtotal, gastosEnvio, IVA);
//     calcularTotal(subtotal, gastosEnvio, cantIVA);
// }

// function calcularTotal(subtotal, gastosEnvio, cantIVA) {
//     const total = subtotal + gastosEnvio + cantIVA;
//     document.getElementById("precioTotal").innerText = total.toFixed(2);

//     return total;
// }

// async function calcularSubtotal() {

//     const spanPreciosFunkos = document.getElementsByClassName("precioFunko");
//     const precios = Array.from(spanPreciosFunkos).map(f => +f.innerText.slice(0,f.innerText.length-1));
//     const spanCantidadFunkos = document.getElementsByClassName("cantidad");
//     const cantidades = Array.from(spanCantidadFunkos).map(f => +f.innerText);

//     let subtotal = 0;

//     for (let i = 0; i < precios.length; i++) {
//         subtotal += precios[i] * cantidades[i];
//     }

//     const codigo = document.getElementById("codigo").value;

//     const subtotalConDescuento = codigo ? await calcularDescuento(subtotal, codigo) : subtotal;

//     document.getElementById("precioSubtotal").innerText = subtotal.toFixed(2);

//     return subtotalConDescuento;
// }

// function calcularGastosEnvio(subtotal) {
//     const gastosEnvio = subtotal < 40 ? 3.99 : 0;

//     if(gastosEnvio === 0)
//         document.getElementById("contEnvio").classList.add("sinGastos");
//     else
//         document.getElementById("contEnvio").classList.remove("sinGastos");

//     document.getElementById("precioEnvio").innerText = gastosEnvio.toFixed(2);

//     return gastosEnvio;
// }

// function calcularDescuento(total, codigo)
// {
//     return fetch(`http://localhost:3000/codigosDescuento?codigo=${codigo}`)
//     .then(resul => resul.json())
//     .then(codigoDescuento => {
//         console.log(codigoDescuento);
        
//         if(codigoDescuento.length === 0) return total;

//         const fechaInicio = new Date(codigoDescuento[0].fechaInicio)
//         const hoy = new Date();
//         const fechaFin = new Date(codigoDescuento[0].fechaFin)


//         console.log(fechaInicio);
//         console.log(hoy);
//         console.log(fechaFin);

//         if(fechaInicio <= hoy && fechaFin >= hoy)
//         {
//             console.log("Codigo valido");
//             document.getElementById("contDescuento").style.display = "flex";
//             const precioConDescuento = total * (1 - (+codigoDescuento[0].descuentoPorcentaje/100));
//             const cantDescuento = total * (+codigoDescuento[0].descuentoPorcentaje/100);
//             document.getElementById("descuento").innerText = cantDescuento.toFixed(2);

//             return precioConDescuento;
//         }
//         else
//         {
//             console.log("Codigo no valido");
//             return total;
//         }
//     });
// }

// function calcularIVA(subtotal, gastosEnvio, IVA)
// {
//     const cantIVA = (subtotal + gastosEnvio) * (IVA / 100);

//     document.getElementById("cantIVA").innerText = cantIVA.toFixed(2);

//     return cantIVA; 
// }

// function calcularCantidadArticulos(productosCarritoCantidad) {
//     const totalArticulos = Object.values(productosCarritoCantidad).reduce((totalArticulos, cantidad) => totalArticulos + cantidad);
    
//     document.getElementById("cantidadArticulos").innerText = totalArticulos;
// }

// function agregarCantidadProducto(funko, productosCarritoCantidad) {
//     const cantidad = +document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText;
//     document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText = cantidad + 1;

//     productosCarritoCantidad[funko.id] += 1;

//     localStorage.setItem(usuario, JSON.stringify(productosCarritoCantidad));
//     calcularPrecios();
//     calcularCantidadArticulos(productosCarritoCantidad);
// }

// function quitarCantidadProducto(funko, productosCarritoCantidad) {
//     const cantidadActual = +document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText;
    
//     document.getElementById(`controlCantidad${funko.id}`).getElementsByClassName("cantidad")[0].innerText = cantidadActual - 1;
//     productosCarritoCantidad[funko.id] -= 1;

//     if(productosCarritoCantidad[funko.id] === 0)
//     {
//         productosCarritoCantidad[funko.id] = undefined;
//     }

//     localStorage.setItem(usuario, JSON.stringify(productosCarritoCantidad));

//     /* Si hemos asignado undefined en algún momento, volvemos a cargar los productos */
//     if(productosCarritoCantidad[funko.id] === undefined)
//     {
//         cargarProductos();
//     }

//     calcularPrecios();
//     calcularCantidadArticulos(productosCarritoCantidad)
// }