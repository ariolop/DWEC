"use strict";

document.getElementById("tree").addEventListener("click", (e) => {
    if(e.target.tagName !== "SPAN") return;
    if(e.target.parentElement.tagName !== "LI") return;
    if(!e.target.parentElement.querySelector("ul")) return;
    
    const ul = e.target.parentElement.querySelector("ul");
    if(ul.style.display === "none")
    {
        ul.style.display = "block";
    }
    else
    {
        ul.style.display = "none";
    }
    console.log("oculto");
});