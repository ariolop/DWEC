export class Paginacion extends Object { //Hereda de 'object' algunos métodos importantes de los objetos 

    #primera;
    #anterior;
    #actual;
    #siguiente;
    #ultima;
    #datosTotal;
    #datosPagina;
    #elementosPorPagina;

    constructor(datos, elementosPorPagina) {
        super();
        this.#elementosPorPagina = elementosPorPagina;
        this.#datosTotal = Array(...datos);
        this.#primera = this.#datosTotal.length > 0 ? 1 : undefined;
        this.#actual = this.#datosTotal.length > 0 ? 1 : undefined;
        this.#ultima = this.#datosTotal.length > 0 ? Math.ceil(datos.length / this.#elementosPorPagina) : undefined;
        this.#siguiente = this.#ultima > 1 ? 2 : undefined;
        this.#anterior = this.#actual != 1 ? this.#actual - 1 : undefined;
        this.#datosPagina = datos.slice(0, this.#elementosPorPagina);
    }

    getPrimera()
    {
        return this.#primera;
    }

    getAnterior()
    {
        return this.#anterior;
    }

    getActual()
    {
        return this.#actual;
    }

    getSiguiente()
    {
        return this.#siguiente;
    }

    getUltima()
    {
        return this.#ultima;
    }

    getDatosTotal()
    {
        return this.#datosTotal;
    }

    getDatosPagina()
    {
        return this.#datosPagina;
    }

    moverPagina(pag)
    {
        if(pag < this.#primera || pag > this.#ultima) return;
    
        this.#actual = pag;
        this.#siguiente = this.#actual + 1 > this.#ultima ? undefined : this.#actual + 1;
        this.#anterior = this.#actual - 1 < this.#primera ? undefined : this.#actual - 1;
        this.#datosPagina = this.#datosTotal.slice(0 + (this.#elementosPorPagina*(this.#actual-1)), this.#elementosPorPagina * this.#actual);
        console.log(this.#datosPagina);
    }

    paginaAnterior()
    {
        console.log("Página anterior");
        if(this.#actual-1 < this.#primera) return;
        
        this.#actual -= 1;
        this.#siguiente = this.#siguiente ? this.#siguiente + 1 : this.#ultima;
        this.#anterior = this.#anterior-1 === 0 ? undefined : this.#anterior - 1;  //Comprobamos si es Undefined
        this.#datosPagina = this.#datosTotal.slice(0 + (this.#elementosPorPagina*(this.#actual-1)), this.#elementosPorPagina * this.#actual);
        console.log(this.#datosPagina);
    }

    paginaSiguiente()
    {
        console.log("Página siguiente");
        //Comprobamos para no pasarnos de página
        if(this.#actual+1 > this.#ultima) return;

        this.#actual += 1; 
        this.#siguiente = this.#siguiente+1 > this.#ultima ? undefined : this.#siguiente + 1;
        this.#anterior = this.#anterior ? this.#anterior + 1 : this.#primera; //Comprobamos si es Undefined
        this.#datosPagina = this.#datosTotal.slice(0 + (this.#elementosPorPagina*(this.#actual-1)), this.#elementosPorPagina * this.#actual);
        console.log(this.#datosPagina);
    }

    toString()
    {
        return `{
            primera: ${this.#primera}
            anterior: ${this.#anterior}
            actual: ${this.#actual}
            siguiente: ${this.#siguiente}
            ultima: ${this.#ultima}
            datosTotal: ${this.#datosTotal}
            datosPagina: ${this.#datosPagina}
            elementosPorPagina: ${this.#elementosPorPagina}
        }`;
    }
}