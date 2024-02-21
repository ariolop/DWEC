function extraerCategorias(json) {
    return json.map( p => p.categorias[0]).filter((c,i,array) => i === array.indexOf(c));
}

export function cargarFiltroCategorias() {
    fetch("http://localhost:3000/funkos")
    .then(resultado => resultado.json())
    .then(funkos => {
        console.log(funkos);
        const categorias = extraerCategorias(funkos);

        let checkboxCategorias = "";

        categorias.forEach(c => {
            checkboxCategorias += `
                <div>
                    <input type="radio" name="categoriaFiltrada" value="${c}"> <label>${c}</label>
                </div>
            `
        });

        document.getElementById("filtroCategorias").innerHTML = checkboxCategorias;

        return funkos;
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
                <a href="categorias.html?cat=${c.replaceAll(" ","").toLowerCase()}">${c}</a>
            </li>`
        });

        document.getElementById("listaMenuCategorias").innerHTML = listaCategorias;
        document.getElementById("listaFooterCategorias").innerHTML = listaCategorias;

        return funkos;
    });
}