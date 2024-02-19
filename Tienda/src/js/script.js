

fetch("http://localhost:3000/funkos")
    .then(resultado => resultado.json())
    .then(funkos => { /* Construir menú desplegable "categorias" */
        const categorias = funkos.map( f => f.categorias[0]).filter((c,i,array) => i === array.indexOf(c));

        let listaDesplegable = "";

        categorias.forEach(c => {
            listaDesplegable += `
            <li>
                <a>${c}</a>
            </li>`
        });
        
        document.getElementById("listaCategorias").innerHTML = listaDesplegable;

        return funkos;
    })
    .then(funkos => { /* Mostrar cartas aleatorias primera fila */
        
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
    