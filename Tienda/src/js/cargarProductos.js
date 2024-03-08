import {Paginacion} from './paginacion.js';
import * as Cartas from './cartas.js';

/* Librería para cargar los productos en función de la búsqueda o de la/s categoria/s seleccionada/s */
export function cargarBusquedaProductos(busqueda, orden, oferta, stock) {
    
    const cadenaFetch = obtenerFetch("","",orden, oferta, stock);
    console.log(cadenaFetch);
    fetch(cadenaFetch)
    .then( resultado => resultado.json() )
    .then( funkos => orden === "+id" ? funkos.reverse() : funkos)
    .then( funkos => funkos.filter( f => 
            f.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            f.categorias[0].toLowerCase().includes(busqueda.toLowerCase()) ||
            f.categorias[1].toLowerCase().includes(busqueda.toLowerCase()) ||
            f.categorias[2].toLowerCase().includes(busqueda.toLowerCase())
        )
    )
    .then( funkosBusqueda => {
        const pag = new Paginacion(funkosBusqueda, 15);
        
        crearPaginacion(pag.getUltima(), 1, pag);
        añadirEventosPaginacion(pag);
        modificarInformacionPaginacion(pag);
        const fragmento = Cartas.crearCartas(pag.getDatosPagina());
        document.getElementById("cartas").innerHTML = fragmento;
    });
}

export function cargarCategoriaProductos(filtroCategoria, filtroSubcategoria, orden, oferta, stock) {

    const cadenaFetch = obtenerFetch(filtroCategoria, filtroSubcategoria, orden, oferta, stock);
    console.log(cadenaFetch);
    fetch(cadenaFetch)
    .then( resultado => resultado.json())
    .then( funkos => orden === "+id" ? funkos.reverse() : funkos)
    .then( funkos => {
        console.log(funkos);
        const pag = new Paginacion(funkos, 15);
        console.log("Paginacion creada");
        
        crearPaginacion(pag.getUltima(), 1);
        añadirEventosPaginacion(pag);
        modificarInformacionPaginacion(pag);
        const fragmento = Cartas.crearCartas(pag.getDatosPagina());
        document.getElementById("cartas").innerHTML = fragmento;

        if(pag.getDatosPagina().length === 0)
            document.getElementById("error").style.display = "block";
        else
            document.getElementById("error").style.display = "";
    });
}

function crearPaginacion(cantidadPaginas, paginaActual)
{
    let paginacion = ``;

    if(cantidadPaginas > 1)
    {
        for (let i = 1; i <= cantidadPaginas && cantidadPaginas; i++) {
            if(i === paginaActual || i === paginaActual-1 || i === paginaActual+1 || i === 1 || i === cantidadPaginas)
            {
                if(i === 1)
                {
                    paginacion += `<div>
                    <a id="${i}" href="#">Inicio</a>
                    </div>`;
                }
                else if(i === cantidadPaginas)
                {
                    paginacion += `<div>
                    <a id="${i}" href="#">Fin</a>
                    </div>`;
                }
                else
                {
                    paginacion += `<div>
                    <a id="${i}" href="#">${i}</a>
                    </div>`;
                }
            }
            else if(i === Math.floor(cantidadPaginas / 2))
            {
                paginacion += `<div>
                <a>...</a>
                </div>`;
            }
        }
    }
    
    const paginacionElement = document.getElementById("paginacion");
    
    paginacionElement.innerHTML = paginacion;

    if(document.getElementById(paginaActual))
    {
        document.getElementById(paginaActual).classList.add("actual");
    }
}

function añadirEventosPaginacion(pag) {
    document.getElementById("paginacion").addEventListener('click' , e => {
        if(e.target.tagName === "A")
        {
            pag.moverPagina(+e.target.id);
            crearPaginacion(pag.getUltima(), pag.getActual(), pag);
            modificarInformacionPaginacion(pag);
            const fragmento = Cartas.crearCartas(pag.getDatosPagina());
            document.getElementById("cartas").innerHTML = fragmento;
        }
    });
}

function modificarInformacionPaginacion(pag) {
    const productoInicial = pag.getDatosTotal().length > 0 ? 1 + (15*(pag.getActual()-1)) : 0;
    const productoFinal = pag.getDatosTotal().length > 0 ? (pag.getSiguiente() ? (15*(pag.getActual())) : pag.getDatosTotal().length) : 0;
    const productosTotales = pag.getDatosTotal().length;

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

function obtenerFetch(filtroCategoria, filtroSubcategoria, orden, oferta, stock) {
    const cadenaFiltroCategorias = filtroCategoria ? `categorias[0]=${filtroCategoria}` : "";
    const cadenaFiltroSubcategorias = filtroSubcategoria ? `&categorias[1]=${filtroSubcategoria}` : "";
    const cadenaOrdenacion = orden ? `_sort=${orden}&` : "";
    const cadenaOferta = oferta ? `oferta=${oferta}&` : "";
    const cadenaStock = stock ? `stock_gt=0&` : "";

    return `http://localhost:3000/funkos?${cadenaStock}${cadenaOferta}${cadenaOrdenacion}${cadenaFiltroCategorias}${cadenaFiltroSubcategorias}`;
}