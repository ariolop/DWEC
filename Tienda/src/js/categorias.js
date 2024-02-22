function extraerCategorias(json) {
    return json.map( p => p.categorias[0]).filter((c,i,array) => i === array.indexOf(c));
}

export function cargarFiltroCategorias() {
    fetch("http://localhost:3000/funkos")
    .then(resultado => resultado.json())
    .then(funkos => {
        const categorias = extraerCategorias(funkos);

        let checkboxCategorias = "";

        checkboxCategorias += `
                <div>
                    <input type="radio" name="categoriaFiltrada" value="" checked> <label>Todas</label>
                </div>`;
        categorias.forEach(c => {
            checkboxCategorias += `
                <div>
                    <input id="${c}" type="radio" name="categoriaFiltrada" value="${c}"> <label>${c}</label>
                </div>
            `
        });

        document.getElementById("filtroCategorias").innerHTML = checkboxCategorias;
    })
    .then( () => {
        const categoria = location.search  
                        ? (location.search.split('?')[1].split('=')[0] === "cat"  
                                ? location.search.split('?')[1].split('=')[1] 
                                : "")  
                        : "";
        if(categoria) 
            document.getElementById(decodeURIComponent(categoria)).checked = true;
    });
}

export function cargarCategoriasMenu()
{
    fetch("http://localhost:3000/funkos")
    .then(resultado => resultado.json())
    .then(funkos => { /* Construir menú desplegable "categorias" */
        const categorias = extraerCategorias(funkos);

        let listaCategorias = "";

        categorias.forEach(c => {
            listaCategorias += `
            <li>
                <a href="productos.html?cat=${c}">${c}</a>
            </li>`
        });

        document.getElementById("listaMenuCategorias").innerHTML = listaCategorias;
        document.getElementById("listaFooterCategorias").innerHTML = listaCategorias;
    });
}