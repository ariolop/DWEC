'use strict'

var modal = document.getElementById("myModal");
var btnEs = document.getElementById("buttonEs");
var btnIn = document.getElementById("buttonIn");
var btnRu = document.getElementById("buttonRu");
var span = document.getElementsByClassName("close")[0];
var body = document.getElementsByTagName("body")[0];

btnEs.onclick = function() {
    modal.style.display = "block";

    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";

    document.getElementById("parrafo").innerHTML = "Buenos dias";
}

btnIn.onclick = function() {
    modal.style.display = "block";

    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";

    document.getElementById("parrafo").innerHTML = "Good morning";
}

btnRu.onclick = function() {
    modal.style.display = "block";

    body.style.position = "static";
    body.style.height = "100%";
    body.style.overflow = "hidden";

    document.getElementById("parrafo").innerHTML = "доброе утро";
}

span.onclick = function() {
    modal.style.display = "none";

    body.style.position = "inherit";
    body.style.height = "auto";
    body.style.overflow = "visible";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }
}