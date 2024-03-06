/* Cargar sesión local */
const sesionLocal = localStorage.getItem("sesionLocal");

if(sesionLocal)
{
    document.getElementById("usuario").innerText = "Hola, " + sesionLocal.split('@')[0];

    document.getElementById("enlaceInicioSesion").setAttribute("data-bs-target","#modalInformacionUsuario");
    document.getElementById("nuevoEmail").setAttribute("placeholder", sesionLocal);

    document.getElementById("formCambiarCorreo").addEventListener("submit", () => {
        const nuevoEmail = document.getElementById("nuevoEmail").value;

        if(localStorage.getItem(sesionLocal))
        {
            localStorage.setItem(nuevoEmail, localStorage.getItem(sesionLocal));
            localStorage.removeItem(sesionLocal);
        }

        localStorage.setItem("sesionLocal", nuevoEmail);

        location.reload();
    });

    document.getElementById("cerrarSesion").addEventListener("click", _ => {
        localStorage.removeItem("sesionLocal");
    });
}
else
{
    /* Eventos inicio sesión */
    document.getElementById("formInicioSesion").addEventListener("submit", (e) => {
        //Inicio de sesión con usuario
        e.preventDefault();
    });

    document.getElementById("formInicioSesionLocal").addEventListener("submit", (e) => {
        e.preventDefault();

        const correo = document.getElementById("emailLocal").value;
        localStorage.setItem("sesionLocal", correo);

        location.reload();
    });
}