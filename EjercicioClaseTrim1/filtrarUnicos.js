"use strict";

function unique(arr) {
    let unicos = arr.filter((elem, indice, arr) => !arr.slice(0,indice).includes(elem));

    return unicos;
    //return arr.filter((elem, indice, arr) => !arr.slice(0,indice).includes(elem));
    //return arr.filter((elem, indice, arr) => arr.indexOf(elem)===i);
  }
  
  let strings = ["Hare", "Krishna", "Hare", "Krishna",
    "Krishna", "Krishna", "Hare", "Hare", ":-O"
  ];
  
  console.log( unique(strings) ); // Hare, Krishna, :-O