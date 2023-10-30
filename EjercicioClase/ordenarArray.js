"use strict";

function ordena(arr) {
    
    if(Array.isArray(arr))
    {
        let arrTemp = [];

        for (let i = 0; i < arr.length; i++) 
        {
            arrTemp[i] = arr[i];    
        }

        let seguir = false;

        do{
            seguir = false;

            for (let i = 0; i < arrTemp.length-1; i++) 
            {
                if(arrTemp[i] > arrTemp[i+1])
                {
                    seguir = true;

                    const swap = arrTemp[i];
                    arrTemp[i] = arrTemp[i+1];
                    arrTemp[i+1] = swap;
                }     
            }

        }while (seguir)

        return arrTemp;
    }
    
    return null;
}

let arr = [-8,5,7.5,6,10,15,1,0];

console.log(arr);
console.log(ordena(arr));
console.log(arr);
