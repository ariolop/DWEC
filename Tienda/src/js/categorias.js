/* Librería para cargar las categorias */ 
function extraerCategorias(json) {
    return json.map( p => p.categorias[0]).filter((c,i,array) => i === array.indexOf(c));
}

function extraerSubcategorias(json) {
    return json.map( p => p.categorias[1]).filter((c,i,array) => i === array.indexOf(c));
}

export function cargarFiltroCategorias() {
    fetch("http://localhost:3000/funkos")
    .then(resultado => resultado.json())
    .then(funkos => {
        const categorias = extraerCategorias(funkos);

        let radiobuttonCategorias = "";

        radiobuttonCategorias += `
                <div>
                    <input id="todas" type="radio" name="categoriaFiltrada" value=""> <label>Todas</label>
                </div>`;
        categorias.forEach(c => {
            radiobuttonCategorias += `
                <div>
                    <input id="${c}" type="radio" name="categoriaFiltrada" value="${c}"> <label>${c}</label>
                </div>
            `
        });

        document.getElementById("filtroCategorias").innerHTML = radiobuttonCategorias;
    })
    .then( () => {
        const categoria = localStorage.getItem("categoriaSeleccionada");
        const busqueda = location.search  
                            ? location.search.split('?')[1].split('=')[1] 
                            : "";

        if(!busqueda)
        {
            if(categoria) 
                document.getElementById(decodeURIComponent(categoria)).checked = true;
            else
                document.getElementById("todas").checked = true;
        }
    });
}

export function cargarCategoriasMenu()
{
    console.log("Añadir evento carrito");

    fetch("http://localhost:3000/funkos")
    .then(resultado => resultado.json())
    .then(funkos => { /* Construir menú desplegable "categorias" */
        const categorias = extraerCategorias(funkos);

        let listaCategorias = "";

        categorias.forEach(c => {
            listaCategorias += `
            <li>
                <a href="productos.html">${c}</a>
            </li>`
        });

        document.getElementById("listaMenuCategorias").innerHTML = listaCategorias;
        document.getElementById("listaFooterCategorias").innerHTML = listaCategorias;
    })
    .then(() => {
        document.getElementById("enlacesProductos").addEventListener(('click'), (e) => {
            if(!e.target.tag === "A") return;

            if(e.target.innerText === "Categorías")
                localStorage.setItem("categoriaSeleccionada", "");
            else
                localStorage.setItem("categoriaSeleccionada", e.target.innerText);

            localStorage.setItem("subcategoriaSeleccionada", "")
        });

        document.getElementById("enlaceOferta").addEventListener(('click'), () => {
            localStorage.setItem("categoriaSeleccionada", "");
            localStorage.setItem("subcategoriaSeleccionada", "");
            localStorage.setItem("oferta", "true");
        });

        document.getElementById("enlaceNovedades").addEventListener(('click'), () => {
            localStorage.setItem("categoriaSeleccionada", "");
            localStorage.setItem("subcategoriaSeleccionada", "");
            localStorage.setItem("oferta", "false");
        });
    });
}

export function cargarFiltroSubcategorias(categoria) {
 
    fetch(`http://localhost:3000/funkos?categorias[0]=${categoria}`)
    .then(resultado => resultado.json())
    .then( funkos => {
        const subcategorias = extraerSubcategorias(funkos);

        let radiobuttonSubcategoria = "";

        radiobuttonSubcategoria += `
                <div>
                    <input id="todas" type="radio" name="subcategoriaFiltrada" value="" checked> <label>Todas</label>
                </div>`;
        
        subcategorias.forEach(c => {
            radiobuttonSubcategoria += `
                <div>
                    <input id="${c}" type="radio" name="subcategoriaFiltrada" value="${c}"> <label>${c}</label>
                </div>
            `
        });

        document.getElementById("filtroSubcategorias").innerHTML = radiobuttonSubcategoria;
    })
    .then( _ => {
        const subcategoria = localStorage.getItem("subcategoriaSeleccionada");

        if(subcategoria)
            document.getElementById(decodeURIComponent(subcategoria)).checked = true;
    });
}