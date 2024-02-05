const maxProductosPorPagina = 8;

fetch('./assets/productos.json')
.then(res=>res.json())
.then(datos=>{
    productos = datos.products;
    muestraProductos(productos); //aquí sí
});

function muestraProductos(p){
    const filas = p.map((p, indice)=>`      <tr class="${indice>7?'ocultoPaginacion':''}">
    <th scope="row">${p.title}</th>
    <td>${p.price}</td>
    <td><img  width="75px" src="${p.thumbnail}"/></td>
    <td>
    <i data-id-producto="${p.id}" class="bi bi-eye" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#productoModal"></i></td>
  </tr>`).join('');
    const paginas = Math.ceil(p.length / maxProductosPorPagina);
    obtenPaginacion(1, paginas);  
  
  const tabla = `    
    <table id="mis-productos" class="table">
    <thead>´ñ
      <tr>
        <th scope="col">Nombre</th>
        <th scope="col">Precio</th>
        <th scope="col"></th>
        <th scope="col">Acción</th>
      </tr>
    </thead>
    <tbody>
        ${filas}
    </tbody>
  </table>  
    `;

    const miDiv = document.getElementById('contenidoPrincipal');
    miDiv.innerHTML = tabla;
    miDiv.addEventListener('click', (e)=>{
        muestraProducto(e,p);
    });
}

function obtenPaginacion(pagina=1, paginas)
{
    const navPaginacion = document.getElementById("navPaginacion");

    const outerHTML = `
    <nav id="navPaginacion">
        <ul class="pagination justify-content-end">
            <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1" aria-disabled="true">&lt;</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
            <a class="page-link" href="#">&gt;</a>
            </li>
        </ul>
    </nav>
    `;
}

function muestraProducto(evento,productos){
    console.dir(evento);
    if (evento.target.tagName==='I') {
        console.log('Has hecho click en el icono del producto:' +
            evento.target.dataset.idProducto);
        const producto = productos.find(p=>p.id===+evento.target.dataset.idProducto)
        console.dir(producto);
        const tituloModal = document.getElementById('productoModalLabel');
        const bodyModal = document.getElementById('productoBody');
        tituloModal.textContent = producto.title;
        console.dir(producto);
        bodyModal.textContent = producto.brand + ' ' + producto.description;
    }
    else {
        console.log('No has hecho click en un <i ...>');
    }
}

function filtraProductosCon(texto) {
    const tabla = document.getElementById("mis-productos");

    const textoEnMinuscula = texto.toLowerCase();

    if(!tabla) return; //Por si se ejecuta antes de que se genere la tabla

    for (const fila of tabla.tBodies[0].rows) {
        if(!fila.textContent.toLowerCase().includes(textoEnMinuscula))
        {
            fila.classList.add("filtradoTexto");
        }
        else
        {
            fila.classList.remove("filtradoTexto");
        }
    }

    filtraProductosPorPagina();
}

function filtraProductosPorPagina(pagina=1) {
    const tabla = document.getElementById("mis-productos");

    if(!tabla) return; //Por si se ejecuta antes de que se genere la tabla

    const filasSinFiltradoTexto = Array.from(tabla.tBodies[0].rows)
                                       .filter( fila => !fila.classList.contains("filtradoTexto") );

    const nfilas = filasSinFiltradoTexto.length;
    const nPaginas = Math.ceil(nfilas / maxProductosPorPagina);

    const primerProductoAMostrar = (pagina-1) * maxProductosPorPagina;
    const ultimoProductoAMostrar = (pagina * maxProductosPorPagina) - 1;

    for (let i = 0; i < nfilas; i++) {
        if(i >= primerProductoAMostrar && i <= ultimoProductoAMostrar)
        {
            filasSinFiltradoTexto[i].classList.remove("ocultoPaginacion");
        }
        else
        {
            filasSinFiltradoTexto[i].classList.add("ocultoPaginacion");
        }
    }

    obtenPaginacion(paginaActual, nPaginas)
}

document.getElementById("filtraProducto").addEventListener("input", (e) => filtraProductosCon(e.target.value));