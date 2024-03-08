import * as Categorias from './categorias.js';

Categorias.cargarCategoriasMenu();

cargarInformacionPrecios();

añadirEventoValorVacio();
añadirEventoGuionNumeroTarjeta();

function cargarInformacionPrecios() {
    const informacionPago = JSON.parse(localStorage.getItem("pedido"));

    document.getElementById("precioSubtotal").innerText = informacionPago.subtotal.toFixed(2);
    document.getElementById("precioEnvio").innerText = informacionPago.gastosEnvio.toFixed(2);

    if(informacionPago.gastosEnvio === 0)
        document.getElementById("contEnvio").classList.add("sinGastos");
    else
        document.getElementById("contEnvio").classList.remove("sinGastos");

    document.getElementById("cantIVA").innerText = informacionPago.cantidadIVA.toFixed(2);
    document.getElementById("precioTotal").innerText = informacionPago.total.toFixed(2);


    document.getElementById("codigo").innerText = informacionPago.codigoDescuento;
    document.getElementById("descuento").innerText = informacionPago.cantidadDescuento.toFixed(2);

    if(informacionPago.cantidadDescuento > 0)
    {
        document.getElementById("contDescuento").style.display = "flex";
    }
}

document.getElementById("metodosDePago").addEventListener("change", e => {
    if(e.target.tagName !== "INPUT") return;
    if(e.target.type !== "radio") return;

    if(e.target.id === "metodoPagoTarjeta")
    {
        document.getElementById("numeroTarjeta").removeAttribute("disabled");
        document.getElementById("fechaExpiracion").removeAttribute("disabled");
        document.getElementById("cvv").removeAttribute("disabled");
        document.getElementById("titularTarjeta").removeAttribute("disabled");
    }
    else
    {
        document.getElementById("numeroTarjeta").setAttribute("disabled","");
        document.getElementById("fechaExpiracion").setAttribute("disabled","");
        document.getElementById("cvv").setAttribute("disabled","");
        document.getElementById("titularTarjeta").setAttribute("disabled","");
    }
});

function añadirEventoValorVacio() {
    const input = document.getElementsByClassName("verificado");
    console.log(input);

    Array.from(input).forEach(element => {
        element.addEventListener("change", e => {
            if(e.target.value.trim().length === 0)e.target.value = "";
        });
    });
}

function añadirEventoGuionNumeroTarjeta() {
    document.getElementById("numeroTarjeta").addEventListener("input", e => {
        
        const temp = e.target.value.substring(e.target.value.length - 4, e.target.value.length);
        console.log(temp);

        if(temp.length === 4 && +temp > 0 && e.target.value.length < 16)
        {
            e.target.value += "-";
        }
    });
}

document.getElementById("formularioDatos").addEventListener("submit", async e => {
    e.preventDefault();

    const informacion = await obtenerInformacion();

    const usuario = localStorage.getItem("sesionLocal");
    const carrito = JSON.parse(localStorage.getItem(usuario))

    actualizarProductosVendidos(carrito);
    //realizarPedido(informacion);
});

async function obtenerInformacion() {
    const usuario = localStorage.getItem("sesionLocal");
    const ultimoID = await obtenerUltimoID();

    return {
        "id": ultimoID + 1,
        "idUsuario": null,
        "carrito": JSON.parse(localStorage.getItem(usuario)),
        "direccionEnvio": {
            "direccionCalle" : document.getElementById("direccion").value + " " + document.getElementById("datosAdicionales").value,
            "direccionCodigoPostal": document.getElementById("codigoPostal").value,
            "direccionProvincia": document.getElementById("provincia").value,
            "direccionPais": document.getElementById("pais").value
        },
        "metodoPago": document.querySelector("input[name='metodoPago']:checked").value
    };
}

function realizarPedido(informacion) {
    fetch("http://localhost:3000/pedidos", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(informacion)
    })
    .then(data => data.json())
    .then(resul => console.log(resul));
}

function obtenerUltimoID() {
    return fetch("http://localhost:3000/pedidos")
    .then(resul => resul.json())
    .then(pedidos => {
        return +pedidos[pedidos.length - 1].id;
    })
}

function actualizarProductosVendidos(carrito) {
    
    Object.keys(carrito).forEach(producto => {

        fetch(`http://localhost:3000/funkos/${producto}`)
        .then(resul => resul.json())
        .then(datosProducto => {
            datosProducto.cantidadVendidos += 1;
            return JSON.stringify(datosProducto);
        })
        .then(datosProducto => {
            fetch(`http://localhost:3000/funkos/${producto}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: datosProducto
            })
        });
    })
    
}