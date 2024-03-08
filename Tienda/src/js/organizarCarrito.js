import {Toast} from './bootstrap/bootstrap.esm.js';

export function agregarProducto(idFunko) {
    if(!localStorage.getItem("sesionLocal")) return;

    const usuario = localStorage.getItem("sesionLocal");

    if(localStorage.getItem(usuario))
    {
        let carritoActual = JSON.parse(localStorage.getItem(usuario));

        //Doble corchete para que use el valor de la variable "idFunko"
        carritoActual[[idFunko]] = carritoActual[[idFunko]] ? carritoActual[[idFunko]] + 1 : 1;   

        localStorage.setItem(usuario, JSON.stringify(carritoActual));
    }
    else
    {
        localStorage.setItem(usuario, JSON.stringify({
            [idFunko]: 1,
        }));
    }
}

/* Evento agregar al carrito */
export function añadirEventoAgregarCarrito() {
    document.getElementById("cartas").addEventListener("click", e => {
        
        if(!e.target.closest("[data-id]")) return;
    
        e.preventDefault();
        agregarProducto(e.target.dataset.id);
    
        const toast = new Toast(document.getElementById("liveToast"));
        toast.show();
    });
}