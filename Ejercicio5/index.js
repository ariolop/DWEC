function cambiarIdioma(idioma) {

    let elem = document.getElementById("parrafo");

    switch (idioma) {
        case "espanol":
            elem.innerHTML = "Buenos dias";
            break;
        case "ingles":
            elem.innerHTML = "Good morning";
            break;
        case "ruso":
            elem.innerHTML = "доброе утро";
            break;
    }
}