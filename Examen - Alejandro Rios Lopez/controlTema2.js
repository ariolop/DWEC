"use strict";

//Ejercicio 1
function marco(altura, anchura) 
{
    const marco = [];

    //Comprobamos que "altura" y "anchura" son valores finitos
    if(Number.isFinite(altura) && Number.isFinite(anchura))
    {
        //Bucle para cambiar de fila
        for (let i = 0; i < altura; i++) 
        {
            const fila = [];

            //Condicion para saber si es primera o ultima fila y rellenar con 1
            if(i === 0 || i === altura-1)
            {
                for (let j = 0; j < anchura; j++) 
                {
                    fila.push(1);
                }
            }
            else
            {
                for (let j = 0; j < anchura; j++) 
                {
                    //Condicion para saber si estamos en la primera o la última posicion de la fila
                    if(j === 0 || j === anchura-1)
                        fila.push(1);
                    else
                        fila.push(0);
                }
            }
            
            marco.push(fila);
        }
    }

    return marco;
}

const tablaA = marco(3,5);
console.log(tablaA); 

const tablaB = marco(5,10); 
console.log(tablaB);


//Ejercicio 2
const encuentraIndices = (array, valor) => 
{

    let indicesEncontrados = [];

    if(Array.isArray(array))
    {
        for (let i = 0; i < array.length; i++) 
        {
            
            if(array[i] === valor)
            {
                indicesEncontrados.push(i);
            }            
        }
    }

    return indicesEncontrados;
}

const encuentraIndices2 = (arrayNumeros, arrayBuscar) => 
{

    let indicesEncontrados = [];
    if(Array.isArray(arrayNumeros) && Array.isArray(arrayBuscar))
    {
        for (let i = 0; i < arrayNumeros.length; i++) 
        {
            if(arrayBuscar.includes(arrayNumeros[i]))
            {
                indicesEncontrados.push(i);
            }            
        }
    }

    return indicesEncontrados;
}

const a = [ 12, 2, 4, 12, 0, -1, 7, 12]; 
const indices12 = encuentraIndices(a, 12);
console.log(indices12); // debe mostrar un array con [0, 3, 7]

const o = [ 12, 2, 4, 12, 0, -1, 7, 12];
const indices = encuentraIndices2(o, [12, 4, 0]);
console.log(indices); // debe mostrar un array con [0, 2, 3, 4, 7]


//Ejercicio 3
function miSplice(array, posicion, elementosAEliminar)
{
    /*
        Comprobamos que:
            - "array" sea un Array
            - "posicion" sea un valor finito y mayor que -1
            - "elementosAEliminar" sea un valor finito y mayor que -1
    */
    if(Array.isArray(array) && Number.isFinite(posicion) && posicion > -1 && Number.isFinite(elementosAEliminar) && elementosAEliminar > -1)
    {
        const arrAux = [];

        //Guardamos los elementos del final del array que no vamos a eliminar para luego volverlos a añadir
        const longitudOriginal = array.length;
        for(let i = posicion+elementosAEliminar; i < longitudOriginal; i++)
        {
            arrAux.unshift(array.pop());
        }

        //Eliminamos tantos valores como indique el argumento "elementosAEliminar" hasta posicion
        for(let i = 0; i < elementosAEliminar && array.length > posicion; i++)
        {
            array.pop();
        }

        //Añadimos los valores que haya en arguements[] a partir de la posicion 3
        for(let i = 3; i < arguments.length; i++)
        {
            array.push(arguments[i]);
        }

        //Volvemos a añadir los valores que hemos guardado
        for(let i = 0; i < arrAux.length; i++)
        {
            array.push(arrAux[i]);
        }
    }
}

const ArrayA = [7, 9, 14, 18, 5, 23, 1];

miSplice(ArrayA, 2, 3); 

console.log(ArrayA);

miSplice(ArrayA, 3, 0, "esto", "se","añade"); 

console.log(ArrayA);