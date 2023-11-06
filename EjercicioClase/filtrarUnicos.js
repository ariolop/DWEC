"use strict";

function unique(arr) {
    let unicos = [];
    
    // unicos = arr.filter((elem, indice, arr) => {
    //     let noEncontrado = true;

    //     for(let i = 0; i < indice; i++)
    //     {
    //         if(arr[i] === elem)
    //         {
    //             noEncontrado = false;
    //         }
    //     }

    //     return noEncontrado;
    // });

    unicos = arr.filter((elem, indice, arr) => !arr.slice(0,indice).find(subElem => subElem == elem));

    return unicos;
  }
  
  let strings = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];
  
  console.log( unique(strings) ); // Hare, Krishna, :-O