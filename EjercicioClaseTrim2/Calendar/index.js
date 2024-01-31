"use script";

function createCalendar(elem, year, month) {
    
    const fecha = new Date(year+"-"+month);

    const tabla = document.createElement("table");

    /* Genero fila con cabecera de la semana */
    const cabecera = document.createElement("tr");
    const diasDeLaSemana = ["MO", "TU", "WE","TH", "FR","SA","SU"];

    for (let i = 0; i < diasDeLaSemana.length; i++) {
        const celda = document.createElement("th");
        celda.textContent = diasDeLaSemana[i];
        cabecera.append(celda);
    }

    tabla.append(cabecera);
    
    /* Colocar los días en el día de la semana */
    // debugger;
    while(fecha.getMonth()+1 === month)
    {
        console.log(fecha.getDate() + " " + (fecha.getDay()) + " " + diasDeLaSemana[fecha.getDay()]);

        const fila = document.createElement("tr");

        for(let i = 0; i < 7; i++)
        {
            const diaDeLaSemana = fecha.getDay() !== 0 ? fecha.getDay() - 1 : 6;

            console.log(diaDeLaSemana);

            const celda = document.createElement("td");

            if(i === diaDeLaSemana && fecha.getMonth()+1 === month)
            {
                celda.textContent = fecha.getDate();
                fecha.setDate(fecha.getDate()+1);
            }
            else
            {
                celda.textContent = " ";
            }

            fila.append(celda);
        }

        tabla.append(fila);
    }

    /* Colocar la tabla al contenedor */
    elem.append(tabla);
}

const cal = document.getElementById("calendar");
createCalendar(cal, 2024, 1);