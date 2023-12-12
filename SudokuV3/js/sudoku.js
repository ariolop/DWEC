class Sudoku {
    constructor(mezclas = 30) {
        this.datos = [
            // 1, 1, 1, 1, 1, 1, 1, 1, 1,
            // 2, 2, 2, 2, 2, 2, 2, 2, 2,
            // 3, 3, 3, 3, 3, 3, 3, 3, 3,
            // 4, 4, 4, 4, 4, 4, 4, 4, 4,
            // 5, 5, 5, 5, 5, 5, 5, 5, 5,
            // 1, 2, 3, 4, 5, 6, 7, 8, 9,
            // 1, 2, 3, 4, 5, 6, 7, 8, 9,
            // 1, 2, 3, 4, 5, 6, 7, 8, 9,
            // 1, 2, 3, 4, 5, 6, 7, 8, 9

            9,  2,  3,  8,  6,  1,  7,  4,  5,
            5,  4,  1,  2,  7,  9,  3,  8,  6,
            7,  6,  8,  4,  3,  5,  2,  9,  1,
            2,  8,  6,  7,  5,  3,  4,  1,  9,
            3,  7,  9,  6,  1,  4,  8,  5,  2,
            4,  1,  5,  9,  2,  8,  6,  3,  7,
            1,  9,  2,  3,  4,  7,  5,  6,  8,
            8,  3,  7,  5,  9,  6,  1,  2,  4,
            6,  5,  4,  1,  8,  2,  9,  7,  3
        ];

        this.nuevo(mezclas);
    }

    //Intercambia las filas del sudoku original de forma aleatoria
    intercambiaFila(i = 10) {
        switch (i) {
            case 0:
                this.cambiaFilas(1, 2);
                break;
            case 1:
                this.cambiaFilas(0, 2);
                break;
            case 2:
                this.cambiaFilas(0, 1);
                break;
            case 3:
                this.cambiaFilas(4, 5);
                break;
            case 4:
                this.cambiaFilas(3, 5);
                break;
            case 5:
                this.cambiaFilas(3, 4);
                break;
            case 6:
                this.cambiaFilas(7, 8);
                break;
            case 7:
                this.cambiaFilas(6, 8);
                break;
            case 8:
                this.cambiaFilas(6, 7);
                break;
            default:
                this.intercambiaFila(Math.floor(Math.random() * 9));
                break;
        }
    }

    //Intercambia las filas que se le indiquen
    cambiaFilas(a, b) {
        let indiceA = a*9;
        let indiceB = b*9;

        for (let i = 0; i < 9; i++, indiceA++, indiceB++) {
            let backup = this.datos[indiceA];
            this.datos[indiceA] = this.datos[indiceB];
            this.datos[indiceB] = backup;
        }
    }

    //Intercambia las columnas del sudoku original de forma aleatoria
    intercambiaColumna(i = 10) {
        switch (i) {
            case 0:
                this.cambiaColumnas(1, 2);
                break;
            case 1:
                this.cambiaColumnas(0, 2);
                break;
            case 2:
                this.cambiaColumnas(0, 1);
                break;
            case 3:
                this.cambiaColumnas(4, 5);
                break;
            case 4:
                this.cambiaColumnas(3, 5);
                break;
            case 5:
                this.cambiaColumnas(3, 4);
                break;
            case 6:
                this.cambiaColumnas(7, 8);
                break;
            case 7:
                this.cambiaColumnas(6, 8);
                break;
            case 8:
                this.cambiaColumnas(6, 7);
                break;
            default:
                this.intercambiaColumna(Math.floor(Math.random() * 9));
                break;
        }
    }

    //Intercambia las columnas que se le indiquen
    cambiaColumnas(a, b) {
        let indiceA = a;
        let indiceB = b;

        for (let i = 0; i < 9; i++, indiceA+=9, indiceB+=9) {
            let backup = this.datos[indiceA];
            this.datos[indiceA] = this.datos[indiceB];
            this.datos[indiceB] = backup;
        }   
    }

    //Intercambia las columnas que se le indiquen
    #obtenerColumna(celda){
        const id = +(celda.id.slice("2"));
        const fila = id%9;

        const columna = [];

        for (let i = fila; i <= fila+(8*9); i+=9) {
            columna.push(document.getElementById("td" + i));
        }

        return columna;
    }

    //Obtiene la fila donde se encuentra la celda
    #obtenerFila(celda){
        const id = +(celda.id.slice("2"));
        const columna = Math.floor(id / 9)*9;

        const fila = [];

        for (let i = columna; i < columna+9; i++) {
            fila.push(document.getElementById("td" + i));
        }

        return fila;
    }

    //Obtiene el Mini Sudoku donde se encuentra la celda
    #obtenerMiniSudoku(celda) {
        let data = celda.dataset.minisudoku;
        let coleccion = document.querySelectorAll("[data-minisudoku='"+data+"']");
        coleccion.item(1).id

        coleccion = Array.from(coleccion);

        return coleccion;
    }

    //Generar nuevo sudoku
    nuevo(mezclas = 10) {

        for (let i = 0; i < mezclas; i++) {
            this.intercambiaFila();
            this.intercambiaColumna();     
        }
    }

    //Mostrar el sudoku generado según un porcentaje, es decir, la dificultad
    muestra(porcentaje=1) {
        for (let i = 0; i < 81; i++) {
            if(Math.random()<porcentaje)
            {
                document.getElementById('td' + i).innerText = this.datos[i];
                document.getElementById('td' + i).classList.add("noModify");
            }
            else
            {
                document.getElementById('td' + i).innerText = " ";
                document.getElementById('td' + i).classList.remove("noModify");
            }
            
        }
    }

    //Comprobar si el sudoku está resuelto
    estaResuelto() {
        let sudokuCorrecto = true;

        //Comprobar si el sudoku está totalmente relleno
        for(let i = 0; i < 81 && sudokuCorrecto; i++)
        {
            if(document.getElementById("td" + i).innerHTML == " ")
            {
                sudokuCorrecto = false;
            }
        }

        //Comprobar filas
        if(sudokuCorrecto)
        {
            for (let idFila = 0; idFila <= 9*8 && sudokuCorrecto; idFila+=9) {
                
                let primeraCeldaFila = document.getElementById("td" + idFila);
                let fila = this.#obtenerFila(primeraCeldaFila);

                let valores = fila.map((item) => item.innerHTML);
                let valoresSinRepetir = new Set(valores);           
                sudokuCorrecto = valoresSinRepetir.size === 9 ? sudokuCorrecto : false;        
            }
        }

        //Comprobar columnas
        if(sudokuCorrecto)
        {
            for (let idColumna = 0; idColumna <= 9 && sudokuCorrecto; idColumna++) {
                
                let primeraCeldaColumna = document.getElementById("td" + idColumna);
                let columna = this.#obtenerColumna(primeraCeldaColumna);

                let valores = columna.map((item) => item.innerHTML);
                let valoresSinRepetir = new Set(valores);           
                sudokuCorrecto = valoresSinRepetir.size === 9 ? sudokuCorrecto : false;           
            }
        }

        //Comprobar minisudokus 1,2,3
        if(sudokuCorrecto)
        {
            for (let idMinisudoku = 0; idMinisudoku <= 9 && sudokuCorrecto; idMinisudoku+=3) {
                
                let primeraCeldaMinisudoku = document.getElementById("td" + idMinisudoku);
                let miniSudoku = this.#obtenerMiniSudoku(primeraCeldaMinisudoku);

                let valores = miniSudoku.map((item) => item.innerHTML);
                let valoresSinRepetir = new Set(valores);           
                sudokuCorrecto = valoresSinRepetir.size === 9 ? sudokuCorrecto : false;
            }
        }

        //Comprobar minisudokus 4,5,6
        if(sudokuCorrecto)
        {
            for (let idMinisudoku = 27; idMinisudoku <= 35 && sudokuCorrecto; idMinisudoku+=3) {
                
                let primeraCeldaMinisudoku = document.getElementById("td" + idMinisudoku);
                let miniSudoku = this.#obtenerMiniSudoku(primeraCeldaMinisudoku);

                let valores = miniSudoku.map((item) => item.innerHTML);
                let valoresSinRepetir = new Set(valores);           
                sudokuCorrecto = valoresSinRepetir.size === 9 ? sudokuCorrecto : false;          
            }
        }

        //Comprobar minisudokus 7,8,9
        if(sudokuCorrecto)
        {
            for (let idMinisudoku = 54; idMinisudoku <= 62 && sudokuCorrecto; idMinisudoku+=3) {
                
                let primeraCeldaMinisudoku = document.getElementById("td" + idMinisudoku);
                let miniSudoku = this.#obtenerMiniSudoku(primeraCeldaMinisudoku);

                let valores = miniSudoku.map((item) => item.innerHTML);
                let valoresSinRepetir = new Set(valores);           
                sudokuCorrecto = valoresSinRepetir.size === 9 ? sudokuCorrecto : false;
            }
        }


        if(sudokuCorrecto)
        {
            alert("El sudoku es correcto. ENHORABUENA!!");
        }
        else
        {
            alert("El sudoku no es correcto. Continua o crea uno nuevo");
        }
    }

    //Despintar una celda cuando ya no está seleccionada
    #despintarCelda(celdaUltimoFoco)
    {
        celdaUltimoFoco.classList.remove("gamehighlighttd");
    }

    //Despintar una columna cuando ya no está seleccionada
    #despintarColumna(celdaUltimoFoco) {
        const columna = this.#obtenerColumna(celdaUltimoFoco);

        for (let i = 0; i < columna.length; i++) {
            columna[i].classList.remove("columnaSelected");
        }

    }

    //Despintar una fila cuando ya no está seleccionada
    #despintarFila(celdaUltimoFoco) {
        const fila = this.#obtenerFila(celdaUltimoFoco);

        for (let i = 0; i < fila.length; i++) {
            fila[i].classList.remove("filaSelected");      
        }
    }

    //Despintar un mini sudoku cuando ya no está seleccionada
    #despintarMiniSudoku(celdaUltimoFoco) {
        let coleccion = this.#obtenerMiniSudoku(celdaUltimoFoco)

        for(let element of coleccion)
        {
            element.classList.remove("minisudokuSelected");
        }
    }

    //Pintar una celda cuando está seleccionada
    #pintarCelda(celda)
    {
        celda.classList.add("gamehighlighttd");
    }

    //Pintar una fila cuando está seleccionada
    #pintarFila(celda) {
        
        const fila = this.#obtenerFila(celda);

        for (let i = 0; i < fila.length; i++) {
            if(fila[i] != celda.id)
            {
                fila[i].classList.add("filaSelected");
            }         
        }
    }

    //Pintar una columna cuando está seleccionada
    #pintarColumna(celda) {
        const columna = this.#obtenerColumna(celda);

        for (let i = 0; i < columna.length; i++) {
            if(columna[i] != celda.id)
            {
                columna[i].classList.add("columnaSelected");
            }         
        }
    }

    //Pintar un mini sudoku cuando está seleccionada
    #pintarMiniSudoku (celda) {
        let coleccion = this.#obtenerMiniSudoku(celda);

        for(let element of coleccion)
        {
            element.classList.add("minisudokuSelected");
        };
    }

    //Despintar (columna, fila, minisudoku, celda) cuando ya no estén seleccionadas
    despintar(idCeldaUltimoFoco) {
        
        if(idCeldaUltimoFoco != -1)
        {
            const elemento = document.getElementById(idCeldaUltimoFoco);

            this.#despintarColumna(elemento);
            this.#despintarFila(elemento);
            this.#despintarMiniSudoku(elemento);
            this.#despintarCelda(elemento);
        }
    }

    //Pinta (columna, fila, minisudoku, celda) cuando estén seleccionadas
    pintar(idCelda) {       
        const elemento = document.getElementById(idCelda);
        this.#pintarCelda(elemento);
        this.#pintarColumna(elemento);
        this.#pintarFila(elemento);
        this.#pintarMiniSudoku(elemento);
    }

    //Modifica el número de una celda que se le pase
    cambiarNumero (celda, numero)
    {
        celda.innerHTML = numero;
    }

    //Comprueba si el número que se le pase se puede colocar en la celda que se le pase
    comprobarNumeroPosible(celda, numero)
    {
        const fila = this.#obtenerFila(celda);
        const columna = this.#obtenerColumna(celda);
        const miniSudoku = this.#obtenerMiniSudoku(celda);
        const contenidoCelda = celda.innerHTML;
        
        let esCorrecto = !(contenidoCelda == numero);

        for (let i = 0; i < fila.length && esCorrecto; i++) {
            if(numero == fila[i].innerHTML)
            {
                esCorrecto = false;
            }
        }

        for (let i = 0; i < columna.length && esCorrecto; i++) {
            if(numero == columna[i].innerHTML)
            {
                esCorrecto = false;
            }
        }

        for (let i = 0; i < miniSudoku.length && esCorrecto; i++) {
            if(numero == miniSudoku[i].innerHTML)
            {
                esCorrecto = false;
            }
        } 
        
        console.log(esCorrecto);
        console.log("-------------------------");
        esCorrecto = (numero == " ") ? true : esCorrecto;
        console.log(esCorrecto);
        console.log("..........................");

        console.log(numero);

        return esCorrecto;
    }

    
    comprobarSudoku(evento)
    {
        evento.preventDefault();
        miSudoku.estaResuelto();
    }
}


const miSudoku = new Sudoku();
let celdaUltimoFoco = -1;

let probabilidad = document.getElementById("dificultad").value;
miSudoku.muestra(probabilidad);

/* Genera un nuevo sudoku y se muestra dependiendo de la probabilidad */
function nuevoSudoku(evento) {
    document.getElementById("comprobar").removeAttribute("disabled");
    let probabilidad = document.getElementById("dificultad").value;
    evento.preventDefault();
    miSudoku.nuevo();
    miSudoku.muestra(probabilidad);
    miSudoku.despintar(celdaUltimoFoco);

    const filaNumeros = document.getElementsByClassName("digito");
        
    for (const iterator of filaNumeros) 
    {
        iterator.classList.remove("hidden");
        iterator.classList.remove("visible");
    }

    document.getElementById("numeros").style.visibility = "hidden";
}

//Muestra otros numeros del mismo sudoku con la probabilidad indicada (no genera uno nuevo)
function otraPartida(evento) {
    document.getElementById("comprobar").removeAttribute("disabled");
    let probabilidad = document.getElementById("dificultad").value;
    evento.preventDefault();
    miSudoku.muestra(probabilidad);
    miSudoku.despintar(celdaUltimoFoco);

    const filaNumeros = document.getElementsByClassName("digito");
        
    for (const iterator of filaNumeros) 
    {
        iterator.classList.remove("hidden");
        iterator.classList.remove("visible");
    }

    document.getElementById("numeros").style.visibility = "hidden";
}

//Si hacemos clic fuera de la tabla, despinta la celda que estaba seleccionada y esconde la tabla de numeros
function clickFueraTabla(evento) {
    if (evento.target.id.charAt(0) != 't' || evento.target.id.charAt(1) != 'd')
    {
        miSudoku.despintar(celdaUltimoFoco);
        const filaNumeros = document.getElementsByClassName("digito");
        
        for (const iterator of filaNumeros) 
        {
            iterator.classList.add("hidden");
            iterator.classList.remove("visible");
        }
    }
}

/* Si hacemos clic dentro de la tabla, despinta la celda que estaba seleccionada, 
   pinta la celda en la que se hace clic y muestra los números posibles para esa celda */
function clickEnTabla(evento) {
    if (evento.target.id.charAt(0) != 't' || evento.target.id.charAt(1) != 'd')
        return;
    
        
    console.log("click en el id: " + evento.target.id);
    console.log("último foco en " + celdaUltimoFoco);
    if (celdaUltimoFoco != -1) {
        miSudoku.despintar(celdaUltimoFoco);
    }

    const filaNumeros = document.getElementsByClassName("digito");
        
    for (const iterator of filaNumeros) 
    {
        iterator.classList.remove("hidden");
        iterator.classList.remove("visible");
    }


    miSudoku.pintar(evento.target.id);

    if(!evento.target.classList.contains("noModify"))
    {
        mostrarTablaNumeros(evento);        
    }
    else
    {
        document.getElementById("numeros").style.visibility = "hidden";
    }

    celdaUltimoFoco = evento.target.id;
}

function mostrarTablaNumeros(evento)
{
    document.getElementById("numeros").style.visibility = "visible";

    const filaNumeros = document.getElementsByClassName("digito");
    
    for (const iterator of filaNumeros) {
        
        if(miSudoku.comprobarNumeroPosible(evento.target, iterator.id))
        {
            iterator.classList.add("visible");
        }
        else
        {
            iterator.classList.add("hidden");
        }
    }
}

// Coloca el número en el que se ha hecho clic dentro de la celda seleccionada
function clickEnNumeros(evento)
{
    if (evento.target.id < 0 || evento.target.id > 9)
        return;


    let element = document.getElementsByClassName("gamehighlighttd")[0];
    const numero = evento.target.id > 0 ? evento.target.innerHTML : " ";

    miSudoku.cambiarNumero(element, numero);
}

// Obtiene el número correspondiente a la tecla pulsada
function obtieneNumeroPulsado(evento)
{
    let numero = undefined;

    switch(evento.code)
    {
        case "Digit1":
        case "Numpad1":
            numero = 1;
            break;
        case "Digit2":
        case "Numpad2":
            numero = 2;
            break;
        case "Digit3":
        case "Numpad3":
            numero = 3;
            break;
        case "Digit4":
        case "Numpad4":
            numero = 4;
            break;
        case "Digit5":
        case "Numpad5":
            numero = 5;
            break;
        case "Digit6":
        case "Numpad6":
            numero = 6;
            break;
        case "Digit7":
        case "Numpad7":
            numero = 7;
            break;
        case "Digit8":
        case "Numpad8":
            numero = 8;
            break;
        case "Digit9":
        case "Numpad9":
            numero = 9;
            break;
        case "Backspace":
            numero = " ";
            break;
    }

    return numero;
}

// Cambia el número de una celda seleccionada en el caso de que no tenga la clase "NoModify" o que la tecla pulsada no sea un número
function cambiarCasillaSeleccionada(evento)
{
    const numero = obtieneNumeroPulsado(evento);
    if(numero != undefined && !evento.target.classList.contains("noModify") && miSudoku.comprobarNumeroPosible(evento.target,numero))
    {
        miSudoku.cambiarNumero(document.getElementById(evento.target.id), numero);
    }
}

// Muestra el sudoku resuelto y pone el valor "comprobar" a deshabilitado
function rendirse(evento)
{
    miSudoku.muestra(1);
    document.getElementById("comprobar").setAttribute("disabled","disabled");

    const filaNumeros = document.getElementsByClassName("digito");
        
    for (const iterator of filaNumeros) 
    {
        iterator.classList.add("hidden");
        iterator.classList.remove("visible");
    }
}

// Asignamos los eventos correspondientes a los botones
document.getElementById('nuevoSudoku').addEventListener('click', nuevoSudoku);
document.getElementById('comprobar').addEventListener('click', miSudoku.comprobarSudoku);
document.getElementById('meRindo').addEventListener('click', rendirse);
document.getElementById('otraPartida').addEventListener('click', otraPartida);

document.getElementById('playtable').addEventListener('keyup', cambiarCasillaSeleccionada);
document.getElementById('playtable').addEventListener('click', clickEnTabla);

document.getElementById('playarea').addEventListener('click', clickFueraTabla);

document.getElementById('tableNumbers').addEventListener('click', clickEnNumeros);