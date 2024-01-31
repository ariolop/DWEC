"use script";

function createCalendar(elem, year, month) {
    
    const fecha = new Date(year+"-"+month);

    const tabla = document.createElement("table");

    /* Genero fila con cabecera de la semana */
    const cabecera = document.createElement("th");
    const diasDeLaSemana = ["MO","TU","WE","TH","FR","SA","SU"]

    for (const diaSemana of diasDeLaSemana) {
        
    }
    
    /* Colocar los días en el día de la semana */
    while(fecha.getMonth()+1 === month)
    {
        console.log(fecha.getDate());




        fecha.setDate(fecha.getDate()+1);
    }

    /* Colocar la tabla al contenedor */
    elem.append(tabla);
}

const cal = document.getElementById("calendar");
createCalendar(cal, 2012, 9);