let id;
comprobarLocalStorage();

function comprobarLocalStorage()
{
    if(localStorage.getItem("resultados"))
    {
        const resultadosAnteriores = localStorage.getItem("resultados").split(",");

        let fragmento = ``;

        for (let i = 0; i < resultadosAnteriores.length; i+=3) {
            const fila = `
            <tr>
                <td>${resultadosAnteriores[i]}</td>
                <td>${resultadosAnteriores[i+1]}</td>
                <td>${resultadosAnteriores[i+2]}</td>
            <tr>
            `;

            fragmento += fila;
        }

        document.getElementById("table").tBodies[0].innerHTML += fragmento;
    }
}


function success(pos) {
    const coordenadas = pos.coords;

    let resultados = localStorage.getItem("resultados") || [];
    if(!Array.isArray() && resultados.length > 0)
    {
        console.log(resultados);
        resultados = resultados.split(",")
    }

    const fila = [pos.timestamp, coordenadas.latitude, coordenadas.longitude];

    const fragmento = `
        <tr>
            <td>${fila[0]}</td>
            <td>${fila[1]}</td>
            <td>${fila[2]}</td>
        </tr>
    `;


    resultados.push(...fila);

    document.getElementById("table").tBodies[0].innerHTML += fragmento;

    localStorage.setItem("resultados", resultados);
}


document.getElementById("iniciar").addEventListener("click", () => {
    id = navigator.geolocation.watchPosition(success);
});

document.getElementById("detener").addEventListener("click", () => {
    navigator.geolocation.clearWatch(id);
});

document.getElementById("eliminar").addEventListener("click", () => {
    localStorage.removeItem("resultados");
    location.reload();
});
    