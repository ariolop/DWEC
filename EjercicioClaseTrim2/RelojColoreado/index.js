let reloj;

function clockStart() {
    
    let tiempo = new Date(Date.now());
    let tablaTiempo = [];
    tablaTiempo.push(tiempo.getSeconds(),tiempo.getMinutes(),tiempo.getHours());

    document.getElementById("segundos").innerText = tablaTiempo[0].toLocaleString();
    document.getElementById("minutos").innerText = tablaTiempo[1];
    document.getElementById("horas").innerText = tablaTiempo[2];
    
    reloj = setInterval((tablaTiempo) => {

        tablaTiempo[0]++;

        if(tablaTiempo[0] === 60)
        {
            tablaTiempo[0] = 0;
            tablaTiempo[1]++;
        }
        else if(tablaTiempo[1] === 60)
        {
            tablaTiempo[1] = 0;
            tablaTiempo[2]++;
        }
        else if(tablaTiempo[2] === 24)
        {
            tablaTiempo[2] = 0;
        }
        document.getElementById("segundos").innerText = tablaTiempo[0];
        document.getElementById("minutos").innerText = tablaTiempo[1];
        document.getElementById("horas").innerText = tablaTiempo[2];

    }, 1000, tablaTiempo);
}

function clockStop() {
    clearInterval(reloj);
}