fetch("http://localhost:3000/funkos")
    .then(resultado => resultado.json())
    .then(funkosDisney => {
        
        let fragmento = "";

        funkosDisney.forEach(funko => {
            const carta = `
            <div class="carta">
                <div id="imagenes" class="imagenes">
                    <img class="funko" src="${funko.imagenFunko}">
                    <img class="caja"  src="${funko.imagenCaja}">
                </div>
                <p id="nombre" class="nombre">${funko.nombre}</p>
                <p id="precio" class="precio">${funko.precio}€</p>
                <button id="agregarCarrito" data-id="${funko.id}">Agregar al carrito</button>
            </div>
            `;

            fragmento += carta; 
        });

        document.getElementById("container").innerHTML = fragmento;
    });




