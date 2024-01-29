"use script";

let texto = "";

do {
    texto = prompt("Escribe una tarea: ");

    if(texto !== "" && texto !== null)
    {
        const lista = document.getElementById("lista");
        const item = document.createElement("li");
        item.innerText = texto;
        lista.append(item);
    }

} while(texto !== "" && texto !== null);
