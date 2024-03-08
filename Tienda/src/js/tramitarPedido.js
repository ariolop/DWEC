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