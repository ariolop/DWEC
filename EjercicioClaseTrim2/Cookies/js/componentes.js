let indexEspanol = `<div id="textoEspanol" class="textoEspanol">
<h1>Bienvenido a la web</h1>
<h2>Gracias por entrar!</h2>
<a href="configuracion.html">Cambiar configuracion</a><br>
<a href="informacion.html">Más información</a>
</div>`;

let indexIngles = `<div id="textoIngles" class="textoIngles">
<h1>Welcome to the web</h1>
<h2>Thanks for visit us!</h2>
<a href="configuracion.html">Change configuration</a><br>
<a href="informacion.html">More information</a>
</div>`;

let informacionEspanol = `<div>
<h1>Información</h1>
</div>
<div class="contenido">
<p>
    JavaScript es un lenguaje de programación de alto nivel que se ejecuta en el navegador del usuario, permitiendo la interactividad en las páginas web mediante la manipulación del DOM y el manejo de eventos.
</p>
</div>
<div class="enlace">
<a href="index.html">Volver al inicio</a>
</div>`;

let informacionIngles = `<div>
<h1>Information</h1>
</div>
<div class="contenido">
<p>
    JavaScript is a high-level programming language that runs in the user's browser, enabling interactivity in web pages by manipulating the DOM and handling events.
</p>
</div>
<div class="enlace">
<a href="index.html">Back to home</a>
</div>`;

let formularioEspanol = `<div class="form">
<h3>Realiza la configuracion</h3>
<form action="">
    <div>
        <label for="idioma">
            ¿Cuál es tu idioma?
        </label>
        <select name="idioma" id="idioma">
            <option value="espanol">Español</option>
            <option value="ingles">Inglés</option>
        </select>
    </div>
    <div>
        <label for="idioma">
            ¿Qué tema quieres?
        </label>
        <select name="tema" id="tema">
            <option value="claro">Claro</option>
            <option value="oscuro">Oscuro</option>
        </select>
    </div>
    <input id="aceptar" type="submit" value="Aceptar">
</form>
</div>`;

let formularioIngles = `<div class="form">
<h3>Realiza la configuracion</h3>
<form action="">
    <div>
        <label for="idioma">
            Which is your language?
        </label>
        <select name="idioma" id="idioma">
            <option value="ingles">English</option>
            <option value="espanol">Spanish</option>
        </select>
    </div>
    <div>
        <label for="idioma">
            What theme do you want?
        </label>
        <select name="tema" id="tema">
            <option value="claro">Light</option>
            <option value="oscuro">Dark</option>
        </select>
    </div>
    <input id="aceptar" type="submit" value="Send">
</form>
</div>`;


export {indexEspanol, indexIngles, formularioEspanol, formularioIngles, informacionEspanol, informacionIngles};