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

function pintarRomboNumerico(tamaño)
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
        
        for(let k = 1; k <= (i*2)+1; k++)
        {
            caracteres += k
        }

        fila = espacios + caracteres + espacios;

        figura += fila + "\n";
    }

    for(let i = tamaño-1; i > 0; i--)
    {
        let fila = "";
        let espacios = "";
        let caracteres = "";

        for(let j = tamaño; j > i; j--)
        {
            espacios += " ";
        }
        
        for(let k = 1; k < (i*2); k++)
        {
            caracteres += k
        }

        fila = espacios + caracteres + espacios;

        figura += fila + "\n";
    }

    console.log(figura);
}

function pintarRomboNumerico2(tamaño)
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
        
        
        for(let k = 1, mayorqueK = 0; k <= (i*2)+1; k++)
        {
            if(k > i+1)
            {
                mayorqueK += 2;
                caracteres += (k - mayorqueK);
            }
            else
            {
                caracteres += k;
            }
        }

        fila = espacios + caracteres + espacios;

        figura += fila + "\n";
    }

    for(let i = tamaño-1; i > 0; i--)
    {
        let fila = "";
        let espacios = "";
        let caracteres = "";

        for(let j = tamaño; j > i; j--)
        {
            espacios += " ";
        }
        
        for(let k = 1, mayorqueK = 0; k < (i*2); k++)
        {
            if(k >= i+1)
            {
                mayorqueK += 2;
                caracteres += (k - mayorqueK);
            }
            else
            {
                caracteres += k;
            }
        }

        fila = espacios + caracteres + espacios;

        figura += fila + "\n";
    }

    console.log(figura);
}

function pintarRomboHueco(tamaño){

    let figura = "";

    for(let i = 0; i < tamaño; i++)
    {
        let fila = "";
        let espaciosExternos = "";
        let espaciosInternos = "";

        for(let j = tamaño-1; j > i; j--)
        {
            espaciosExternos += " ";
        }

        for(let k = 0; k < (i*2)-1; k++)
        {
            espaciosInternos += " ";
        }

        fila += espaciosExternos + "*";

        if(espaciosInternos)
        {
            fila += espaciosInternos + "*";
        }
         
        figura += fila + "\n";
    }

    for(let i = tamaño-2; i >= 0; i--)
    {
        let fila = "";
        let espaciosExternos = "";
        let espaciosInternos = "";

        for(let j = tamaño-1; j > i; j--)
        {
            espaciosExternos += " ";
        }

        for(let k = (i*2)-1; k > 0; k--)
        {
            espaciosInternos += " ";
        }

        fila += espaciosExternos + "*";

        if(espaciosInternos)
        {
            fila += espaciosInternos + "*";
        }
         
        figura += fila + "\n";
    }

    console.log(figura);
}

function pintaTablero(tamaño)
{
    let figura = "";
    let elecCaracterColumna = true;

    for(let bloqueFilas = 1; bloqueFilas <= tamaño; bloqueFilas++)
    {
        for(let filas = 1; filas <= tamaño; filas++) //Filas
        {
            let elecCaracterFila = elecCaracterColumna;
            
            let fila = construirFila(tamaño, elecCaracterFila);
        
            figura += fila + "\n";
        }

        elecCaracterColumna = !elecCaracterColumna;

    }    

    console.log(figura);
}

function elegirCaracter(eleccionCaracter)
{
    if(eleccionCaracter)
    {
        return "#";
    }
    
    return "-";
}

function construirBloque(caracter, tamaño)
{
    let bloque = "";

    for(let k = 0; k < tamaño; k++) //Columnas y diferenciacion de caracteres
    {
        bloque += caracter;   
    }

    return bloque;
}

function construirFila(tamaño, elecCaracterFila) 
{
    let fila = "";
    
    for(let j = 1; j <= tamaño; j++) //Bloque columnas
    {
        let caracter = elegirCaracter(elecCaracterFila);

        fila += construirBloque(caracter, tamaño);

        elecCaracterFila = !elecCaracterFila;
    }

    return fila;
}

pintaTablero(5);