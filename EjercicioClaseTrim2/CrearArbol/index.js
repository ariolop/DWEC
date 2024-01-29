"use script";

function createTree(container, data) {

    if (!Object.keys(data).length > 0) return
  
    const lista = document.createElement("ul");
    container.append(lista);

    for(let i = 0; i < Object.keys(data).length; i++)
    {
        const item = document.createElement("li");
        const objeto = Object.keys(data)[i];
        item.append(objeto);
        lista.append(item);

        createTree(item, data[objeto]);
        
    }

}

let data = {
    "Fish": {
      "trout": {},
      "salmon": {}
    },
  
    "Tree": {
      "Huge": {
        "sequoia": {},
        "oak": {}
      },
      "Flowering": {
        "apple tree": {},
        "magnolia": {}
      }
    }
};

let container = document.getElementById('container');
createTree(container, data); // crea el árbol en el contenedor