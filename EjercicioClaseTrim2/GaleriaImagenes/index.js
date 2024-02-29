"use strict";

document.getElementById("thumbs").addEventListener("click", (e) => {
    if(!e.target.closest("a")) return;
    e.preventDefault();

    const enlaceImagen = e.target.closest("a");
    document.getElementById("largeImg").src = enlaceImagen.src;
    document.getElementById("largeImg").title = enlaceImagen.title;
});