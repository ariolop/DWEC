export function cargarPaginaProductos(pagina,filtroCategoria=undefined,filtroSubcategoria=undefined,orden="") {

    const cadenaPagina = `_page=${pagina}&_per_page=15`;
    const cadenaFiltroCategorias = filtroCategoria ? `&categorias[0]=${filtroCategoria}` : "";
    const cadenaFiltroSubcategorias = filtroSubcategoria ? `&categorias[1]=${filtroSubcategoria}` : "";
    const cadenaOrdenacion = orden !== "" ? `&_sort=${orden}` : ""; 

    console.log(`http://localhost:3000/funkos?${cadenaPagina}${cadenaOrdenacion}${cadenaFiltroCategorias}${cadenaFiltroSubcategorias}`);

    fetch(`http://localhost:3000/funkos?${cadenaPagina}${cadenaOrdenacion}${cadenaFiltroCategorias}${cadenaFiltroSubcategorias}`)
    .then( resultado => resultado.json() )
    .then( funkos => {

        console.log(funkos);

        crearPaginacion(funkos.pages, pagina);
        
        document.getElementById("productoInicial").innerHTML = funkos.next ? (1 + (15*(funkos.next-2))) : (1 + (15*(funkos.pages-1))) ;
        document.getElementById("productosPorPagina").innerHTML = funkos.next ? (15*(funkos.next-1)) : funkos.items;
        document.getElementById("productosTotales").innerHTML = funkos.items;

        let fragmento = "";
        funkos.data.forEach(funko => {
            const carta = `
            <div class="carta">
                <div id="imagenes" class="imagenes">
                    <img class="funko" src="${funko.imagenFunko}">
                    <img class="caja"  src="${funko.imagenCaja}">
                </div>
                <p id="nombre" class="nombre">${funko.nombre}</p>
                <p id="precio" class="precio">${funko.precio}€</p>
            </div>
            `;

            fragmento += carta; 
        });

        document.getElementById("cartas").innerHTML = fragmento;
    });
}

export function crearPaginacion(cantidadPaginas, paginaActual)
{
    let paginacion = ``;

    for (let i = 1; i <= cantidadPaginas; i++) {
        if(i === paginaActual || i === paginaActual-1 || i === paginaActual+1 || i === 1 || i === cantidadPaginas)
        {
            paginacion += `<div>
                                <a id="${i}" href="#">${i}</a>
                            </div>`;
        }
    }

    console.log(cantidadPaginas);
    console.log(paginaActual);

    document.getElementById("paginacion").innerHTML = paginacion;

    document.getElementById(paginaActual).classList.add("actual");

    
}