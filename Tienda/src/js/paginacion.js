export function cargarPaginaProductos(pagina,filtroCategoria=undefined,filtroSubcategoria=undefined,orden="") {

    const cadenaFiltroCategorias = filtroCategoria ? `&categorias[0]=${filtroCategoria}` : "";
    const cadenaFiltroSubcategorias = filtroSubcategoria ? `&categorias[1]=${filtroSubcategoria}` : "";
    const cadenaOrdenacion = orden !== "" ? `&_sort=${orden}` : "";  

    console.log(`http://localhost:3000/funkos?_page=${pagina}&_per_page=15${cadenaOrdenacion}${cadenaFiltroCategorias}${cadenaFiltroSubcategorias}`);

    fetch(`http://localhost:3000/funkos?_page=${pagina}&_per_page=15${cadenaOrdenacion}${cadenaFiltroCategorias}${cadenaFiltroSubcategorias}`)
    .then( resultado => resultado.json() )
    .then( funkos => {
        let data = funkos.data;
        console.log(data);

        let fragmento = "";

        console.log(funkos);

        document.getElementById("productoInicial").innerHTML = funkos.next ? (1 + (15*(funkos.next-2))) : (1 + (15*(funkos.pages-1))) ;
        document.getElementById("productosPorPagina").innerHTML = funkos.next ? (15*(funkos.next-1)) : funkos.items;
        document.getElementById("productosTotales").innerHTML = funkos.items;

        data.forEach(funko => {
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