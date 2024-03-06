import * as Categorias from './categorias.js';
import {añadirEventoAgregarCarrito} from './organizarCarrito.js';
import * as Cartas from './cartas.js';

Categorias.cargarCategoriasMenu();
añadirEventoAgregarCarrito();

/* Mostrar las novedades de la página (es decir, los últimos que se han agregado) */
/* Ordeno normal y luego hago reverse(), porque si ordeno inversamente en el fetch, ordena como String */
fetch("http://localhost:3000/funkos?_sort=+id")
    .then(resultado => resultado.json())
    .then(funkos => funkos.reverse().slice(0,6))
    .then(funkos => {
        console.log(funkos);

        const fragmento = Cartas.crearCartas(funkos);

        document.getElementById("cartas").innerHTML = fragmento;
    });

/* Mostrar la fila de ofertas al lado del banner correspondiente */
fetch("http://localhost:3000/funkos?oferta=true")
    .then(resultado => resultado.json())
    .then(funkos => {
        console.log(funkos);

        const funkosAleatorios = generarFunkosAleatorios(funkos, 3);

        console.log(funkosAleatorios);

        const fragmento = Cartas.crearCartas(funkosAleatorios);

        document.getElementById("funkosOferta").innerHTML = fragmento;
    });


/* Mostrar la fila de funkos de Black Clover al lado del banner correspondiente */
fetch("http://localhost:3000/funkos?categorias[1]=Black Clover")
    .then(resultado => resultado.json())
    .then(funkos => {
        console.log(funkos);

        const funkosAleatorios = generarFunkosAleatorios(funkos, 3);

        console.log(funkosAleatorios);

        const fragmento = Cartas.crearCartas(funkosAleatorios);

        document.getElementById("funkosBlackClover").innerHTML = fragmento;
    });

/* Generar X números aleatorios desde un min a un max (sin incluir) */
function generarFunkosAleatorios(funkos, cantidadFunkos) {
    const funkosAleatorios = [];

    while (funkosAleatorios.length < cantidadFunkos) {
        
        const numAlea = Math.floor((Math.random() * funkos.length));

        if(!funkosAleatorios.includes(funkos[numAlea]))
        {
            funkosAleatorios.push(funkos[numAlea]);   
        }
    }

    return funkosAleatorios;
}