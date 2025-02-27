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
            document.getElementById('td' + i).innerText = this.datos[i]; //Math.random()<porcentaje ? this.datos[i]:'';
        }
    }

    estaResuelto() {
        // debe devolver true o false
    }
}


const miSudoku = new Sudoku();

miSudoku.muestra(0.75);

function nuevoSudoku(evento) {
    evento.preventDefault();
    miSudoku.nuevo();
    miSudoku.muestra(0.75);
}


let celdaUltimoFoco = -1;

function clickEnTabla(evento) {
    if (evento.target.id.charAt(0) != 't' || evento.target.id.charAt(1) != 'd')
        return;
    console.log("click en el id: " + evento.target.id);
    console.log("último foco en " + celdaUltimoFoco);
    if (celdaUltimoFoco != -1) {
        document.getElementById(celdaUltimoFoco).classList.remove("gamehighlighttd");
    }
    evento.target.classList.add("gamehighlighttd");
    celdaUltimoFoco = evento.target.id;
}

document.getElementById('nuevoSudoku').addEventListener('click', nuevoSudoku);

document.getElementById('playtable').addEventListener('click', clickEnTabla);