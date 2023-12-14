/* Importamos el diccionario */
import {diccionario} from "https://cdn.jsdelivr.net/gh/fran-dawbaza/spanish-dictionary/diccionario.js";

/* Constantes de ERROR */
const ERROR_ININIO_LETRA = 101;

/* Elimina los diacríticos de un texto excepto si es una "ñ" (ES6) */
function eliminarDiacriticosEs(texto) {
    return texto
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();
}

const diccionarioSinTildes = diccionario.map(eliminarDiacriticosEs);

const diccionarioSet = new Set(diccionarioSinTildes);


/* Objecto "tiempo" */
let tiempo = {

    cronometro: undefined,

    pararCronometro: function()
    {
        clearInterval(this.cronometro);
        console.log("Cronometro parado");

        document.getElementById("introducirPalabras").setAttribute("disabled",true);
        document.getElementById("introducirPalabras").value = "";
        document.getElementById("enviarPalabra").setAttribute("disabled",true);
        document.getElementById("empezarPartida").setAttribute("disabled",true);
        document.getElementById("nuevaPartida").removeAttribute("disabled");

        document.getElementById("cantPalabras").innerHTML = listaPalabras.length;
        document.getElementById("listaPalabras").innerHTML = listaPalabras.toString();

        document.getElementsByClassName("resultado").item(0).style.display = "flex";
        
        document.getElementById("alertaCorrecta").style.display = "none";
        document.getElementById("alertaIncorrecta").style.display = "none";

        document.getElementById("totalPuntos").innerHTML = puntos;
    },

    reiniciarCronometro: function()
    {
        clearInterval(this.cronometro);
        document.getElementById("tiempo").innerHTML = 10;
        this.iniciarCronometro(9,0);
        console.log("Cronometro reiniciado");
    },

    iniciarCronometro: function(from, to)
    {
        let current = from;

        this.cronometro = setInterval(function(cronometro) {
            
            document.getElementById("tiempo").innerHTML = current;

            if (current == to) {
                cronometro.pararCronometro();
            }

            current--;
        }, 1000, this);

        console.log("Cronometro iniciado");
    }
};

/* Generar letra aleatoria */
const letras = ['a','b','c','d','e','f','g','h','i','j','k','l', 'ñ','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

function generarLetra()
{
    document.getElementById("empezarPartida").disabled = false;
    document.getElementById("nuevaPartida").removeAttribute("disabled");
    document.getElementById("tiempo").innerHTML = 10;
    document.getElementsByClassName("resultado").item(0).style.display = "none";

    const posAlea = Math.floor((Math.random())*(letras.length));
    const letraAleatoria = letras[posAlea];

    document.getElementById("letra").innerHTML = letraAleatoria;

    puntosPorPalabra = puntosPorLetraInicial();

    return letraAleatoria;
}

/* Dependiendo de la letra, la palabra introducida tendrá unos puntos u otros */
function puntosPorLetraInicial(letra) {
    switch (letra) {
        case 'A', 'C', 'D', 'E':
            return 1;
        case 'M', 'P', 'R', 'S', 'T':
            return 2;
        case 'B', 'F', 'G', 'H', 'I', 'V':
            return 3;
        case 'J', 'L', 'N', 'O', 'Z':
            return 4;
        case 'K', 'Ñ', 'Q', 'U', 'W', 'X', 'Y':
            return 5;
    }
}

/* Array con las palabras introducidas */
const listaPalabras = [];
let puntos = 0;
let puntosPorPalabra = 0;
const puntosPorLongitudPalabra = new Map([
    [8,1],      [6,2],      [5,3],      [4,4],      [1,5],
    [9,1],      [7,2],      [15,3],     [16,4],     [2,5],
    [10,1],     [13,2],                 [17,4],     [3,5],
    [11,1],     [14,2],                             [18,5],
    [12,1]
]);

/* Empezar partida */
function empezarPartida(event) {
    document.getElementById("introducirPalabras").disabled = false;
    document.getElementById("enviarPalabra").disabled = false;
    document.getElementById("nuevaPartida").disabled = true;
    document.getElementById("empezarPartida").disabled = true;
    listaPalabras.splice(0,listaPalabras.length);

    tiempo.iniciarCronometro(9, 0);
    document.getElementById("introducirPalabras").focus();
    document.getElementsByClassName("resultado").item(0).style.display = "none";
}

/* Si introduce una palabra correcta, reiniciamos tiempo y mostramos mensaje "correcto"; sino solo mostramos mensaje "incorrecto" */
function palabraIntroducida(event)
{
    event.preventDefault();

    document.getElementById("alertaCorrecta").style.display = "none";
    document.getElementById("alertaIncorrecta").style.display = "none";

    const palabra = String(document.getElementById("introducirPalabras").value).toLowerCase();

    if(validarPalabra(palabra))
    {
        tiempo.reiniciarCronometro();
        listaPalabras.push(palabra);
        calcularPuntos(palabra);
    }


    document.getElementById("introducirPalabras").value = "";
    document.getElementById("introducirPalabras").focus();
}

/* ¿Es válida la palabra? */
function validarPalabra(palabra)
{
    let palabraCorrecta;

    if( ! palabra.startsWith(letraAleatoria))
    {
        //Mostrar mensaje: "La palabra no empieza por la letra indicada"
        palabraCorrecta = false;

        document.getElementById("alertaIncorrecta").innerHTML = "La palabra no empieza por la letra indicada";
        document.getElementById("alertaIncorrecta").style.display = "block";
    }
    else if( listaPalabras.includes(palabra) )
    {
        //Mostrar mensaje: "La palabra ya ha sido introducida"
        palabraCorrecta = false;
        
        document.getElementById("alertaIncorrecta").innerHTML = "La palabra ya ha sido introducida";
        document.getElementById("alertaIncorrecta").style.display = "block";
    }
    else if( ! diccionarioSet.has(palabra) )
    {
        //Mostrar mensaje: "La palabra no existe en el diccionario"
        palabraCorrecta = false;    

        document.getElementById("alertaIncorrecta").innerHTML = "La palabra no existe en el diccionario";
        document.getElementById("alertaIncorrecta").style.display = "block";
    }
    else
    {
        //Palabra correcta
        palabraCorrecta = true;
        document.getElementById("alertaCorrecta").style.display = "block";
    }

    return palabraCorrecta;
}

/* Calcular puntos de la palabra */
function calcularPuntos(palabra) {
    puntos += puntosPorPalabra;

    puntos += (palabra.length < 18) ?  puntosPorLongitudPalabra.get(palabra.length) : 5;

    puntos += puntosAdicionales(palabra);
}

/* Calcular puntos adicionales */
function puntosAdicionales(palabra)
{
    const puntosAdicionales = 0;

    

    return puntosAdicionales;
}


/* Agregar eventos */
document.getElementById("empezarPartida").addEventListener("click", empezarPartida);
document.getElementById("form").addEventListener("submit", palabraIntroducida);
document.getElementById("nuevaPartida").addEventListener("click", () => {letraAleatoria = generarLetra()});

/* Funciones que se ejecutan cuando carga la página */
let letraAleatoria = generarLetra();