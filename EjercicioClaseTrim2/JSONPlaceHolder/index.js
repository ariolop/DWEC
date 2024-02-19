"use strict";

const colocaUsuarios = usuarios => {

    if(Array.isArray(usuarios))
    {
        const tabla = document.getElementById("usuarios");

        const filas = usuarios.map( u => `<tr data-id-usuario="${u.id}"> 
                                            <td>${u.name}</td> 
                                            <td>${u.email}</td> 
                                        </tr>` )
                            .join('');

        // let estructura = "";
        // usuarios.forEach(usuario => {
        //     estructura += `<tr>
        //         <td>${usuario.name}</td>
        //         <td>${usuario.email}</td>
        //     </tr>`;
        // });

        tabla.tBodies[0].innerHTML = filas;
    }
}

fetch("https://jsonplaceholder.typicode.com/users")
    .then(resultado => resultado.json())
    .then(usuarios => colocaUsuarios(usuarios))
    .catch(console.log);

fetch("https://jsonplaceholder.typicode.com/comments" ,{
    method: 'POST',
    body: JSON.stringify({
        "postId": 1,
        "name": "El comentario nuevo",
        "email": "hola@gmail.com",
        "body": "laudantium enim quasi est quidem magnam voluptate ipsam"
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    }
})
    .then(response => response.json())
    .then(json => console.log(json));