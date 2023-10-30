"use strict";

function getMaxSubSum(arr) {
    
    let posibleSuma = 0;

    let arrSuma = [];

    for (let i = 0; i < arr.length; i++) 
    {
        if(arr[i] > 0)
        {
            for(let j = 0; j < arrSuma.length; j++)
            {
                posibleSuma += arrSuma[j];
            }

            if(posibleSuma < arr[i])
            {
                arrSuma.push(arr[i]);

                posibleSuma += arr[i];
            }
        }
        else
        {
            arrSuma.length = 0;
        }
    }


    return posibleSuma;
}

console.log(getMaxSubSum([-1,2,3,-9]));