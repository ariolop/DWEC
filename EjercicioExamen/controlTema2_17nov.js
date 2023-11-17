"use strict";

/* Ejercicio 1 */
function aleatorios(cantElementos, inicioRango, finalRango) { 

    if(comprobarNumerosEnteros(cantElementos) && Number.isFinite(inicioRango) && Number.isFinite(finalRango) && inicioRango <= finalRango)
    {
        return calcularAleatorios(cantElementos, inicioRango, finalRango);
    }
    else
    {
        throw new Error("Alguno de los parámetros no es correcto o el segundo parámetro es mayor que el tercer parámetro");
    }
}

function calcularAleatorios(cantElementos, inicioRango, finalRango) {
    let numAleatorios = [];

    if(Array.isArray(cantElementos))
    {
        if(cantElementos.length == 1)
        {
            numAleatorios.push(calcularAleatorios(cantElementos[0], inicioRango, finalRango));
        }
        else
        {
            let repeticiones = cantElementos.shift();

            for(let i = 0; i < repeticiones; i++)
            {
                numAleatorios.push(calcularAleatorios(cantElementos, inicioRango, finalRango));
            }

            cantElementos.unshift(repeticiones);
        }
    }
    else
    {
        for (let i = 0; i < cantElementos; i++) {
            numAleatorios.push(Math.floor((Math.random() * (finalRango-inicioRango)) + inicioRango));    
        }
    
        numAleatorios.sort((a,b) => a-b);
    }

    return numAleatorios;
}

function comprobarNumerosEnteros(array) {
    
    let sonEnteros = true;

    for (let i = 0; i < array.length && sonEnteros; i++) {
        if(!Number.isInteger(array[i]))
        {
            sonEnteros = false;           
        }
    }

    return sonEnteros;
}

console.log(aleatorios(4, 10, 20));
console.log(aleatorios([3,5], 0, 10));



/* Ejercicio 2 */
function tajada(array, principio, final) {
    const nuevoArray = [];

    if(Array.isArray(array) && Number.isInteger(principio) && Number.isInteger(final) && principio > -1 && final <= array.length) 
    {
        for (let i = principio, j = 0; i < final; i++, j++) {
        
            nuevoArray[j] = array[i];
        }
    }
    else
    {
        throw new Error("Alguno de los parámetros no es correcto");
    }

    return nuevoArray;
}

console.log(tajada([3,2,30,4], 1, 3));

/* Ejercicio 3 */
function romboTruncado(altura) {
    
    let figura = "";

    if(Number.isInteger(altura))
    {
        for(let i = 0; i < altura; i++)
        {
            /* Espacios "." */
            let fila = "";
            for(let cantEspacio = i; cantEspacio < altura-1; cantEspacio++)
            {
                fila += "."
            }

            if(i == 0)
            {
                /* Asteriscos */
                for(let cantAsteriscos = 0; cantAsteriscos < altura; cantAsteriscos++)
                {
                    fila += "*"
                }
            }
            else
            {
                fila += "*";

                for(let cantnumeros = 0, j=1; cantnumeros < (altura)+(2*(i-1)); cantnumeros++,j++)
                {
                    fila += j.toString(36).toUpperCase();
                }

                fila += "*";
            }

            figura += fila + "\n";
        }

        for (let i = altura-1; i > 0; i--) {
            /* Espacios "." */
            let fila = "";
            for(let cantEspacio = altura; cantEspacio > i; cantEspacio--)
            {
                fila += "."
            }

            if(i == 1)
            {
                /* Asteriscos */
                for(let cantAsteriscos = 0; cantAsteriscos < altura; cantAsteriscos++)
                {
                    fila += "*"
                }
            }
            else
            {
                fila += "*";

                for(let cantnumeros = 0, j=1; cantnumeros < (altura)+(2*(i-2)); cantnumeros++,j++)
                {
                    fila += j.toString(36).toUpperCase();
                }

                fila += "*";
            }

            figura += fila + "\n";    
        }

        console.log(figura);
    }
    else
    {
        throw new Error("La altura no es un numero entero");
    }
}

romboTruncado(4);
romboTruncado(3);
romboTruncado(5);