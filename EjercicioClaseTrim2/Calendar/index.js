"use script";

function createCalendar(elem, year, month) {
    
    const fecha = new Date(year+"-"+month);

    const tabla = document.createElement("table");

    /* Genero fila con cabecera de la semana */
    const cabecera = document.createElement("th");
    const diasDeLaSemana = ["SU","MO","TU","WE","TH","FR","SA"];

    for (let i = 1; i < diasDeLaSemana.length; i++) {
        const celda = document.createElement("td");
        celda.textContent = diasDeLaSemana[i];
        cabecera.append(celda);
    }

        /* Domingo */
    const celda = document.createElement("td");
    celda.textContent = diasDeLaSemana[0];
    cabecera.append(celda);

    tabla.append(cabecera);
    
    /* Colocar los días en el día de la semana */
    debugger;
    while(fecha.getMonth()+1 === month)
    {
        console.log(fecha.getDate() + " " + (fecha.getDay()) + " " + diasDeLaSemana[fecha.getDay()]);

        const fila = document.createElement("tr");

        for (let i = 1; i != 0; i++) {
            
            const celda = document.createElement("td");

            if(i === fecha.getDate())
            {
                celda.textContent = fecha.getDate();
                fecha.setDate(fecha.getDate()+1);
            }
            else
            {
                celda.textContent = "";
            }

            fila.append(celda);

            i = i === 6 ? i = -1 : i;

            console.log(i);
        }

        tabla.append(fila);
    }

    /* Colocar la tabla al contenedor */
    elem.append(tabla);
}

const cal = document.getElementById("calendar");
createCalendar(cal, 2012, 9);