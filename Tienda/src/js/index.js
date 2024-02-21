import * as Categorias from './categorias.js';


Categorias.cargarCategoriasMenu();

/* Mostrar cartas aleatorias primera fila */
fetch("http://localhost:3000/funkos")
    .then(resultado => resultado.json())
    .then(funkos => { 
        
        let fragmento = "";

        const cantidadNumerosAleatorios = [];

        for (let i = 0; i < 5; i++) {
            cantidadNumerosAleatorios.push(Math.floor((Math.random() * funkos.length)));   
        }


        cantidadNumerosAleatorios.forEach(numAlea => {
            const carta = `
            <div class="carta">
                <div id="imagenes" class="imagenes">
                    <img class="funko" src="${funkos[numAlea].imagenFunko}">
                    <img class="caja"  src="${funkos[numAlea].imagenCaja}">
                </div>
                <p id="nombre" class="nombre">${funkos[numAlea].nombre}</p>
                <p id="precio" class="precio">${funkos[numAlea].precio}€</p>
            </div>
            `;

            fragmento += carta; 
        });

        document.getElementById("cartas").innerHTML = fragmento;
    });
    