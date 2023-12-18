/* Importamos el diccionario */
import {diccionario} from "https://cdn.jsdelivr.net/gh/fran-dawbaza/spanish-dictionary/diccionario.js";

/* Elimina los diacríticos de un texto excepto si es una "ñ" (ES6) */
function eliminarDiacriticosEs(texto) {
    return texto
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();
}

const diccionarioSinTildes = diccionario.map(eliminarDiacriticosEs);

const diccionarioSet = new Set(diccionarioSinTildes);

/* Array con las palabras introducidas*/
const listaPalabrasSinTiltes = [];
const listaPalabrasOriginal = [];

/* Variables utilizadas para guardar los puntos totales y los puntos por palabra correcta */
let puntos = 0;
let puntosPorPalabra = 0;

/* Funciones que se ejecutan cuando carga la página (primera letra aleatoria) */
const letras = ['a','b','c','d','e','f','g','h','i','j','k','l', 'ñ','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let letraAleatoria = generarLetra();

/* Mapa con [longitud,puntos] para saber los puntos correspondientes por longitud de la palabra */
const puntosPorLongitudPalabra = new Map([
    [8,1],      [6,2],      [5,3],      [4,4],      [1,5],
    [9,1],      [7,2],      [15,3],     [16,4],     [2,5],
    [10,1],     [13,2],                 [17,4],     [3,5],
    [11,1],     [14,2],                             [18,5],
    [12,1]
]);

/* Variable con el nombre del usuarop para guardarlo en caché */
let nombreUsuario = "";
let puntosUsuario = undefined;


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

        document.getElementById("cantPalabras").innerHTML = listaPalabrasOriginal.length;
        document.getElementById("listaPalabras").innerHTML = listaPalabrasOriginal.toString();

        document.getElementById("filaResultado").classList.replace("d-none","d-flex");
        
        document.getElementById("alertaCorrecta").style.display = "none";
        document.getElementById("alertaIncorrecta").style.display = "none";

        document.getElementById("totalPuntos").innerHTML = puntos;

        document.getElementById("puntosPromedioPartida").innerHTML = puntuacionPartidaPromedio(puntos,listaPalabrasOriginal.length);

        puntosUsuario.push(puntos);

        localStorage.setItem(nombreUsuario,puntosUsuario);

        actualizarResumenPuntuacion(puntosUsuario);
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

function generarLetra()
{
    document.getElementById("empezarPartida").disabled = false;
    document.getElementById("nuevaPartida").removeAttribute("disabled");
    document.getElementById("tiempo").innerHTML = 10;
    document.getElementById("filaResultado").classList.replace("d-flex","d-none");

    const posAlea = Math.floor((Math.random())*(letras.length));
    const letraAleatoria = letras[posAlea];

    document.getElementById("letra").innerHTML = letraAleatoria;

    puntosPorPalabra = puntosPorLetraInicial(letraAleatoria);

    return letraAleatoria;
}

/* Dependiendo de la letra, la palabra introducida que sea correcta, tendrá unos puntos u otros */
function puntosPorLetraInicial(letra) {
    switch (letra) {
        case "a": case "c": case "d": case "e":
            return 1;
        case "m": case "p": case "r": case "s": case "t":
            return 2;
        case "b": case "f": case "g": case "h": case "i": case "v":
            return 3;
        case "j": case "l": case "n": case "o": case "z":
            return 4;
        case "k": case "ñ": case "q": case "u": case "w": case "x": case "y":
            return 5;
    }
}

/* Empezar partida */
function empezarPartida(event) {
    document.getElementById("introducirPalabras").disabled = false;
    document.getElementById("enviarPalabra").disabled = false;
    document.getElementById("nuevaPartida").disabled = true;
    document.getElementById("empezarPartida").disabled = true;
    listaPalabrasOriginal.splice(0,listaPalabrasOriginal.length);
    listaPalabrasSinTiltes.splice(0,listaPalabrasSinTiltes.length);
    puntos = 0;

    tiempo.iniciarCronometro(9, 0);
    document.getElementById("introducirPalabras").focus();
}

/* Si introduce una palabra correcta, reiniciamos tiempo y mostramos mensaje "correcto"; sino solo mostramos mensaje incorrecto personalizado */
function palabraIntroducida(event)
{
    event.preventDefault();

    document.getElementById("alertaCorrecta").style.display = "none";
    document.getElementById("alertaIncorrecta").style.display = "none";

    //Eliminamos diacríticos y ponemos la palabra en minúscula para que esté igual que en el diccionario.
    //PROBLEMA --> Riñón y Riñon son palabras diferentes pero acepta las dos (ya que guarda "riñón" y no "riñon")
    const palabraOriginal = document.getElementById("introducirPalabras").value;
    const palabraModificada = eliminarDiacriticosEs(palabraOriginal.toLowerCase());

    if(validarPalabra(palabraModificada))
    {
        tiempo.reiniciarCronometro();
        listaPalabrasOriginal.push(palabraOriginal);
        listaPalabrasSinTiltes.push(palabraModificada);
        calcularPuntos(palabraModificada);
    }


    document.getElementById("introducirPalabras").value = "";
    document.getElementById("introducirPalabras").focus();
}

/* ¿Es válida la palabra? Muestra mensaje y Devuelve valor boolean */
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
    else if( listaPalabrasSinTiltes.includes(palabra) )
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

    puntos += (palabra.length < 18) ? puntosPorLongitudPalabra.get(palabra.length) : 5;

    puntos += puntosAdicionales(palabra);
}

/* Calcular puntos adicionales */
function puntosAdicionales(palabra)
{
    let puntosAdicionales = 0;
    const letrasAdicionales = ['k', 'ñ', 'q', 'w', 'x', 'y'];

    for (let i = 0; i < palabra.length; i++) {
        if(letrasAdicionales.includes(palabra.at(i)))
        {
            puntosAdicionales++;
        }
    }

    return puntosAdicionales;
}

/* Obtener nombre del usuario y mostrar juego */
function obtenerNombreUsuario(event) {
    event.preventDefault();

    nombreUsuario = document.getElementById("introducirNombre").value;
    document.getElementById("textoUsuario").innerHTML = nombreUsuario;

    document.getElementById("contenedorJuego").classList.replace("d-none","d-block")
    document.getElementById("contenedorBienvenido").classList.replace("d-block","d-none")
    document.getElementById("contenedorPuntuacion").classList.replace("d-none","d-block")

    puntosUsuario = localStorage.getItem(nombreUsuario) ?? [];

    //Comprobamos si no es un array, ya que "getItem()" devuelve una cadena. En ese caso, el usuario ha jugado partidas anteriormente.
    if( ! Array.isArray(puntosUsuario))
    {
        puntosUsuario = puntosUsuario.split(",");
    }

    actualizarResumenPuntuacion(puntosUsuario);
}

/* Cierra la "sesion" del usuario, es decir, vuelve al menú para volver a introducir el nombre */
function cerrarSesion(event) {
    document.getElementById("contenedorJuego").classList.replace("d-block","d-none")

    document.getElementById("contenedorBienvenido").classList.replace("d-none","d-block")

    document.getElementById("contenedorPuntuacion").classList.replace("d-block","d-none")

    document.getElementById("filaResultado").classList.replace("d-flex","d-none");

    document.getElementById("introducirNombre").value = "";
}

/* Calcular la puntuación promedio de la partida recién acabada */
function puntuacionPartidaPromedio(puntosTotales, cantidadPalabras) {
    return ((puntosTotales / cantidadPalabras) || 0).toFixed(2);
}

/* Calcular la puntuación promedio del total de partidas */
function puntuacionTotalPromedio(arrayPuntos) {
    let sumaTotal = 0;

    for (let i = 0; i < arrayPuntos.length; i++) {
        
        sumaTotal += +(arrayPuntos[i]);
    }

    return ((sumaTotal/arrayPuntos.length) || 0).toFixed(2);
}

/* Actualizar resumen de puntuacion total del usuario */
function actualizarResumenPuntuacion(arrayPuntos) {

    document.getElementById("puntosPromedioTotal").innerHTML = puntuacionTotalPromedio(arrayPuntos);
    document.getElementById("partidasJugadas").innerHTML = arrayPuntos.length;
}

/* Agregar eventos */
document.getElementById("empezarPartida").addEventListener("click", empezarPartida);
document.getElementById("formIntroducirPalabra").addEventListener("submit", palabraIntroducida);
document.getElementById("nuevaPartida").addEventListener("click", () => {letraAleatoria = generarLetra()});
document.getElementById("formObtenerNombre").addEventListener("submit", obtenerNombreUsuario);
document.getElementById("cerrarSesion").addEventListener("click", cerrarSesion);