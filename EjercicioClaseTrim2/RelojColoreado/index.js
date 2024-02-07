let reloj = undefined;
let tiempo = undefined;
let segundos = undefined;
let minutos = undefined;
let horas = undefined;


function clockStart() {
    
    tiempo = new Date(Date.now());
    segundos = tiempo.getSeconds();
    minutos = tiempo.getMinutes();
    horas = tiempo.getHours();
    document.getElementById("segundos").innerText = segundos;
    document.getElementById("minutos").innerText = minutos;
    document.getElementById("horas").innerText = horas;
    
    reloj = setInterval((segundos, minutos, horas) => {

        console.log(segundos);
        console.log(minutos);
        console.log(horas);

        segundos++;

        if(segundos === 60)
        {
            segundos = 0;
            minutos++;
        }
        else if(minutos === 60)
        {
            minutos = 0;
            horas++;
        }
        else if(horas === 24)
        {
            horas = 0;
        }

        console.log(segundos);
        console.log(minutos);
        console.log(horas);

        console.log("-----------------------------------");

        document.getElementById("segundos").innerText = segundos;
        document.getElementById("minutos").innerText = minutos;
        document.getElementById("horas").innerText = horas;

    }, 1000, segundos, minutos, horas);
}

function clockStop() {
    clearInterval(reloj);
}