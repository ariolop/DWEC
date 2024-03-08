import * as Categorias from './categorias.js';

Categorias.cargarCategoriasMenu();

cargarInformacionPrecios();

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