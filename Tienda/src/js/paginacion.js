export function cargarBusquedaProductos(pagina, busqueda) {

    fetch(`http://localhost:3000/funkos`)
    .then( resultado => resultado.json() )
    .then( funkos => {
        console.log(busqueda.toLowerCase().charAt(0).toUpperCase() + busqueda.slice(1).toLowerCase());

        funkos = funkos.filter( f => {            
            return f.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                f.categorias.includes(busqueda.toLowerCase().charAt(0).toUpperCase() + busqueda.slice(1).toLowerCase());
        });

        return funkos;
    })
    .then( funkosBusqueda => {
        console.log(funkosBusqueda);
        //modificarInformacionPaginacion(funkosBusqueda);

        let fragmento = "";
        funkosBusqueda.forEach(funko => {
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

export function cargarPaginaProductos(pagina,filtroCategoria,filtroSubcategoria,orden) {

    const cadenaPagina = `_page=${pagina}&_per_page=15`;
    const cadenaFiltroCategorias = filtroCategoria ? `&categorias[0]=${filtroCategoria}` : "";
    const cadenaFiltroSubcategorias = filtroSubcategoria ? `&categorias[1]=${filtroSubcategoria}` : "";
    const cadenaOrdenacion = orden ? `&_sort=${orden}` : ""; 

    console.log(`http://localhost:3000/funkos?${cadenaPagina}${cadenaOrdenacion}${cadenaFiltroCategorias}${cadenaFiltroSubcategorias}`);

    fetch(`http://localhost:3000/funkos?${cadenaPagina}${cadenaOrdenacion}${cadenaFiltroCategorias}${cadenaFiltroSubcategorias}`)
    .then( resultado => resultado.json() )
    .then( funkos => {
        crearPaginacion(funkos.pages, pagina);
        modificarInformacionPaginacion(funkos);

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

function crearPaginacion(cantidadPaginas, paginaActual)
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

    document.getElementById("paginacion").innerHTML = paginacion;
    document.getElementById(paginaActual).classList.add("actual");    
}

function modificarInformacionPaginacion(funkos) {
    const productoInicial = funkos.next ? (1 + (15*(funkos.next-2))) : (1 + (15*(funkos.pages-1))) ;
    const productoFinal = funkos.next ? (15*(funkos.next-1)) : funkos.items;
    const productosTotales = funkos.items;

    const infoPaginacion = `
    <p>Mostrando 
        <span>${productoInicial}</span>
    -
        <span>${productoFinal}</span> 
    de 
        <span>${productosTotales}</span>
    productos</p>
    `

    document.getElementById("cantidadProductos").innerHTML = infoPaginacion;
}