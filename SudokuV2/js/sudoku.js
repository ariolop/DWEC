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

    cambiaFilas(a, b) {
        let indiceA = a*9;
        let indiceB = b*9;

        for (let i = 0; i < 9; i++, indiceA++, indiceB++) {
            let backup = this.datos[indiceA];
            this.datos[indiceA] = this.datos[indiceB];
            this.datos[indiceB] = backup;
        }
    }

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

    #obtenerMiniSudoku(celda) {
        let data = celda.dataset.minisudoku;
        let coleccion = document.querySelectorAll("[data-minisudoku='"+data+"']");
        
        return coleccion;
    }

    cambiaColumnas(a, b) {
        let indiceA = a;
        let indiceB = b;

        for (let i = 0; i < 9; i++, indiceA+=9, indiceB+=9) {
            let backup = this.datos[indiceA];
            this.datos[indiceA] = this.datos[indiceB];
            this.datos[indiceB] = backup;
        }   
    }

    nuevo(mezclas = 10) {

        for (let i = 0; i < mezclas; i++) {
            this.intercambiaFila();
            this.intercambiaColumna();     
        }
    }

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

    estaResuelto() {
        // debe devolver true o false
    }

    #despintarCelda(celdaUltimoFoco)
    {
        celdaUltimoFoco.classList.remove("gamehighlighttd");
    }

    #despintarColumna(celdaUltimoFoco) {
        const id = +(celdaUltimoFoco.id.slice("2"));
        const fila = id%9;

        for (let i = fila; i <= fila+(8*9); i+=9) {
            document.getElementById("td" + i).classList.remove("columnaSelected");
        }
    }

    #despintarFila(celdaUltimoFoco) {
        const id = +(celdaUltimoFoco.id.slice("2"));
        const columna = Math.floor(id / 9)*9;

        for (let i = columna; i < columna+9; i++) {
            document.getElementById("td" + i).classList.remove("filaSelected");      
        }
    }

    #despintarMiniSudoku(celdaUltimoFoco) {
        let coleccion = this.#obtenerMiniSudoku(celdaUltimoFoco)

        for(let element of coleccion)
        {
            element.classList.remove("minisudokuSelected");
        }
    }

    #pintarCelda(celda)
    {
        celda.classList.add("gamehighlighttd");
    }

    #pintarFila(celda) {
        
        let id = +(celda.id.slice("2"));

        let fila = Math.floor(id / 9)*9;

        for (let i = fila; i < fila+9; i++) {
            if(i != id)
            {
                document.getElementById("td" + i).classList.add("filaSelected");
            }         
        }
    }

    #pintarColumna(celda) {
        let id = +(celda.id.slice("2"));
        let columna = id % 9;

        for (let i = columna; i <= columna+(8*9); i+=9) {
            if(i != id)
            {
                document.getElementById("td" + i).classList.add("columnaSelected");
            }         
        }
    }

    #pintarMiniSudoku (celda) {
        let coleccion = this.#obtenerMiniSudoku(celda);

        for(let element of coleccion)
        {
            element.classList.add("minisudokuSelected");
        };
    }

    despintar(celdaUltimoFoco) {
        
        if(celdaUltimoFoco != -1)
        {
            const elemento = document.getElementById(celdaUltimoFoco);

            this.#despintarColumna(elemento);
            this.#despintarFila(elemento);
            this.#despintarMiniSudoku(elemento);
            this.#despintarCelda(elemento);
        }
    }

    pintar(idCelda) {       
        const elemento = document.getElementById(idCelda);
        this.#pintarCelda(elemento);
        this.#pintarColumna(elemento);
        this.#pintarFila(elemento);
        this.#pintarMiniSudoku(elemento);
    }

    cambiarNumero (elemento, numero)
    {
        elemento.innerHTML = numero;
    }
}


const miSudoku = new Sudoku();
let celdaUltimoFoco = -1;

let probabilidad = document.getElementById("dificultad").value;
miSudoku.muestra(probabilidad);

function nuevoSudoku(evento) {
    let probabilidad = document.getElementById("dificultad").value;
    evento.preventDefault();
    miSudoku.nuevo();
    miSudoku.muestra(probabilidad);
    miSudoku.despintar(celdaUltimoFoco);

    document.getElementById("numeros").style.visibility = "hidden";
}


// class "minisudokuSelected"
// class "filaSelected"
// class "columnaSelected"

function clickEnTabla(evento) {
    if (evento.target.id.charAt(0) != 't' || evento.target.id.charAt(1) != 'd')
        return;
    console.log("click en el id: " + evento.target.id);
    console.log("último foco en " + celdaUltimoFoco);
    if (celdaUltimoFoco != -1) {
        miSudoku.despintar(celdaUltimoFoco);
    }
    miSudoku.pintar(evento.target.id);

    if(!evento.target.classList.contains("noModify"))
    {
        document.getElementById("numeros").style.visibility = "visible";
    }
    else
    {
        document.getElementById("numeros").style.visibility = "hidden";
    }

    celdaUltimoFoco = evento.target.id;
}

function clickEnNumeros(evento)
{
    console.log(evento.target.id);

    if (evento.target.id < 0 || evento.target.id > 9)
    return;


    let element = document.getElementsByClassName("gamehighlighttd")[0];
    const numero = evento.target.id > 0 ? evento.target.id : " ";

    miSudoku.cambiarNumero(element, numero);
}

document.getElementById('nuevoSudoku').addEventListener('click', nuevoSudoku);

document.getElementById('playtable').addEventListener('click', clickEnTabla);

document.getElementById('tableNumbers').addEventListener('click', clickEnNumeros);