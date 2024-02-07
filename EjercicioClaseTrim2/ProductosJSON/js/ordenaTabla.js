"use script";

const maxProductosPorPagina = 5;

const filtraProductosPorPagina = (pagina=1)=>{
    const tabla = document.getElementById('mis-productos');
    if (!tabla) return;  
  
    console.log('filtraProductosPorPagina: pagina ' + pagina)
    const filasSinFiltradoTexto =  Array
                                  .from(tabla.tBodies[0].rows)
                                  .filter(f=>!f.classList.contains('filtradoTexto'));
  
    const nFilas = filasSinFiltradoTexto.length;
    const paginas = Math.ceil(nFilas/maxProductosPorPagina);
  
    const primerProductoAMostrar = (pagina-1) * maxProductosPorPagina;
    const ultimoProductoAMostrar = pagina * maxProductosPorPagina - 1;
    
    for (let i=0;i< filasSinFiltradoTexto.length; i++){
        if (i>=primerProductoAMostrar && i<=ultimoProductoAMostrar) {
              filasSinFiltradoTexto[i].classList.remove('ocultoPaginacion');
        }
        else {
              filasSinFiltradoTexto[i].classList.add('ocultoPaginacion');
        }
    }  
  };

function ordenaTablaAlfabeticamente(tabla, columna) {
    const filas = Array.from(tabla.tBodies[0].rows);
    filas.sort((f1,f2) =>  
                        f1.cells[columna].textContent.localeCompare(f2.cells[columna].textContent));

    tabla.tBodies[0].append(...filas);

    filtraProductosPorPagina(1);
}

function preparaOrdenacion(idTabla){
    const tabla =document.getElementById(idTabla);
    if (!tabla) return;
    tabla.tHead.rows[0].addEventListener('click', (e) => {
        if(e.target.tagName !== "TH") return;
        if(e.target.dataset.orden === "cadena")
        {
            const columna = e.target.cellIndex;

            ordenaTablaAlfabeticamente(tabla, columna);
        }
        else if(e.target.dataset.orden === "numero")
        {
            const columna = e.target.cellIndex;

            ordenaTablaNumericamente(tabla, columna);
        }
    });

    console.log("Estamos bien");
}

export {preparaOrdenacion};