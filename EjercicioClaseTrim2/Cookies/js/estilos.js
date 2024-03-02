"use strict";

import { getCookie } from "./funciones.js";

let tema = getCookie("tema");

if(tema === "oscuro")
{
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./css/styleOscuro.css";

    document.head.appendChild(link);
}