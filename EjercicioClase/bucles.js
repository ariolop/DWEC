"use strict"

const ASTERICO = "*";

function pintarCuadrado(tamaño, caracter = ASTERICO) {

    let fila = "";
    for(let i = 0; i < tamaño; i++)
    {
        fila += caracter;
    }

    let cuadrado = "";
    for(let i = 0; i < tamaño; i++)
    {
        cuadrado += fila + "\n";
    }

    console.log(cuadrado);
}

function pintarTriangulo(tamaño, caracter = ASTERICO) {

    let fila = "";
    let figura = "";

    for(let i = 0; i < tamaño; i++)
    {
        fila += caracter;
        figura += fila + "\n";
    }

    console.log(figura);
}

function pintarTrianguloDerecha(tamaño, caracter = ASTERICO)
{
    let figura = "";

    for(let i = 0; i < tamaño; i++)
    {
        let fila = "";

        for(let j = i; j < tamaño-1; j++)
        {
            fila += " ";
        }
        
        for(let k = 0; k <= i; k++)
        {
            fila += caracter;
        }

        figura += fila + "\n";
    }

    console.log(figura);
}

function pintarTrianguloMedio(tamaño, caracter = ASTERICO)
{
    let figura = "";

    for(let i = 0; i < tamaño; i++)
    {
        let fila = "";
        let espacios = "";
        let caracteres = "";

        for(let j = tamaño-1; j > i; j--)
        {
            espacios += " ";
        }
        
        for(let k = 0; k <= (i*2); k++)
        {
            caracteres += caracter
        }

        fila = espacios + caracteres + espacios;

        figura += fila + "\n";
    }

    console.log(figura);
}

pintarTrianguloDerecha(5);