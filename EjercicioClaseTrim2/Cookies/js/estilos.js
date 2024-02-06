"use strict";

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

let tema = getCookie("tema");

if(tema === "oscuro")
{
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/styleOscuro.css";

    document.head.appendChild(link);
}