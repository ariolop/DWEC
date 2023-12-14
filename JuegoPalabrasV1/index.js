"use strict"

/* Objecto "tiempo" */
let tiempo = {

    cronometro: undefined,

    pararCronometro: function()
    {
        clearInterval(this.cronometro);
        console.log("Cronometro parado");

        document.getElementById("introducirPalabras").setAttribute("disabled",true);
        document.getElementById("enviarPalabra").setAttribute("disabled",true);
        document.getElementById("empezarPartida").setAttribute("disabled",true);
        document.getElementById("nuevaPartida").removeAttribute("disabled");

        document.getElementById("cantPalabras").innerHTML = palabras.length;
        document.getElementById("listaPalabras").innerHTML = palabras.toString();

        document.getElementsByClassName("resultado").item(0).style.display = "block";
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

    const posAlea = Math.floor((Math.random())*(letras.length));
    const letraAleatoria = letras[posAlea];

    document.getElementById("letra").innerHTML = letraAleatoria;

    return letraAleatoria;
}

/* Array con las palabras introducidas */
const palabras = [];


/* Empezar partida */
function empezarPartida(event) {
    document.getElementById("introducirPalabras").disabled = false;
    document.getElementById("enviarPalabra").disabled = false;
    document.getElementById("nuevaPartida").disabled = true;
    document.getElementById("empezarPartida").disabled = true;
    palabras.splice(0,palabras.length);

    tiempo.iniciarCronometro(9, 0);
    document.getElementById("introducirPalabras").focus();
    document.getElementsByClassName("resultado").item(0).style.display = "none";
}

/* Reiniciar cronometro si introduce una palabra correcta */
function reiniciarCronometro(event)
{
    event.preventDefault();
    const palabra = String(document.getElementById("introducirPalabras").value);

    if(palabra.startsWith(letraAleatoria))
    {
        tiempo.reiniciarCronometro();
        palabras.push(palabra);
    }


    document.getElementById("introducirPalabras").value = "";
    document.getElementById("introducirPalabras").focus();
}


/* Agregar eventos */
document.getElementById("empezarPartida").addEventListener("click", empezarPartida);
document.getElementById("form").addEventListener("submit", reiniciarCronometro);
document.getElementById("nuevaPartida").addEventListener("click", () => {letraAleatoria = generarLetra()});

/* Funciones que se ejecutan cuando carga la página */
let letraAleatoria = generarLetra();