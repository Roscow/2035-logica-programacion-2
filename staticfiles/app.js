var tituloPrincipal = document.querySelector('h1')
var inputNUmero = document.getElementById('numeroUsuario')
var intentosRestantesParrafo = document.getElementById('intentosRestantes')
var inputNombreUsuario = document.getElementById('nombre_jugador')
var listaNumerosParrafo = document.getElementById('listaNumeros')
var parrafo = document.getElementById('texto__parrafo')
var selectPais = document.getElementById('pais_jugador')
var labelTIempo = document.getElementById('label_tiempo')
var pista = document.getElementById("pista")

var numeroSecreto = 0;
var numeroIntentos = 5;
var intentoActual = 0;
var listaNumerosUsuario=[];
var nombreJugador;
let segundos = 0;
let minutos = 0;
let milisegundos=0;
let cronometroInterval;
inputNUmero.hidden=true
labelTIempo.hidden = true;

function assignarTexto(elemento, texto){
    elemento.innerHTML = texto;
}

function nuevoJuego(){
    reiniciarCronometro()
    pais = selectPais.value;
    nombreJugador = inputNombreUsuario.value;
    inputNombreUsuario.hidden = false;
    selectPais.hidden = false;

    if(nombreJugador == '' || pais == ''){
        assignarTexto(parrafo, "Debes llenar todos los campos para iniciar un juego nuevo");
        inputNombreUsuario.value = nombreJugador;
        selectPais.value = pais;
    }
    else{
        nombreJugador = inputNombreUsuario.value;
        pais = selectPais.value;
        pista.remove();
        inputNUmero.value='';
        inputNombreUsuario.hidden = true;
        selectPais.hidden = true;
        numeroSecreto = Math.floor(Math.random() * 10) + 1;
        pista.innerHTML= numeroSecreto;
        intentoActual=0;
        listaNumerosUsuario=[];
        intentosRestantes = numeroIntentos;
        assignarTexto(tituloPrincipal,"Nuevo juego")
        assignarTexto(parrafo , "Indica un numero entre 1 y 10");
        assignarTexto(intentosRestantesParrafo,'Intentos restantes: '+ intentosRestantes)
        assignarTexto(listaNumerosParrafo,'Numeros Probados: [ '+ listaNumerosUsuario+' ]')
        document.getElementById("intentar").disabled = false;  
        iniciarCronometro();
        inputNUmero.hidden = false;
        labelTIempo.hidden = false;
    }
}

function mostrarPIsta(){
    // Obtén las dimensiones de la ventana del navegador
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    // Calcula posiciones aleatorias
    var randomX = Math.floor(Math.random() * (windowWidth - 100)); // 100 es el ancho máximo del elemento
    var randomY = Math.floor(Math.random() * (windowHeight - 100)); // 100 es la altura máxima del elemento
    // Configura las propiedades CSS
    pista.style.position = "absolute";
    pista.style.left = randomX + "px";
    pista.style.top = randomY + "px";
    //pista.style.backgroundColor = "rgba(255, 255, 255, 0.7)"; // Color blanco con transparencia
    pista.style.color = "black";
    pista.style.opacity = "0,7" ;
    // Agrega el elemento al cuerpo del documento (o a otro contenedor)
    document.body.appendChild(pista);
}

function intentar(){
    intentoActual++;
    intentosRestantes = numeroIntentos-intentoActual;
    var numeroUsuario = inputNUmero.value;
    assignarTexto(intentosRestantesParrafo,'Intentos restantes: '+ intentosRestantes)
    
    if( listaNumerosUsuario.includes(numeroUsuario)){
        intentoActual--;
        parrafo.innerHTML = "Ya habias intentado con este numero, prueba con otro"
    }
    else{

        listaNumerosUsuario.push(numeroUsuario);

        if(numeroSecreto == numeroUsuario){
            document.getElementById("intentar").disabled = true;
            adivinaste()
        }
        else{
            fallaste()  
        }
    
        if(parseInt(numeroIntentos-intentoActual) == 1 && numeroUsuario != numeroSecreto){
            mostrarPIsta()
            tituloPrincipal.innerHTML = "Ultimo intento, una pista fue revelada en la pantalla";
        }
    
        if(parseInt(numeroIntentos-intentoActual) == 0 && numeroUsuario != numeroSecreto){
            tituloPrincipal.innerHTML = "PERDISTE";
            parrafo.innerHTML = "SE TE ACABARON LOS INTENTOS, el numero era: "+ numeroSecreto;
            document.getElementById("intentar").disabled = true;
            detenerCronometro()
        }
    }
    assignarTexto(listaNumerosParrafo,'Numeros Probados: [ '+ listaNumerosUsuario+' ]')    
}

function fallaste(){
    parrafo.innerHTML = "Fallaste";
    tituloPrincipal.innerHTML = "Tu Intento n° "+  intentoActual ;
    assignarTexto(intentosRestantesParrafo,'Intentos restantes: '+ intentosRestantes)
}

function adivinaste(){
    detenerCronometro()
    tituloPrincipal.innerHTML = "Ganaste!!  :)";
    parrafo.innerHTML = "Adivinaste en el " + intentoActual + "° intento";
    enviarDatosAServidor();
}

function perdiste(){
    detenerCronometro()
    tituloPrincipal.innerHTML = "Perdiste!!  :(";
    parrafo.innerHTML = "SE TE ACABARON LOS INTENTOS, el numero era: "+ numeroSecreto;
    
}

/*
function actualizarCronometro() {
    segundos++;

    if (segundos == 60) {
        segundos = 0;
        minutos++;
    }

    // Formatea el tiempo en formato mm:ss
    const tiempoFormateado = minutos + ":" + (segundos < 10 ? "0" : "") + segundos;

    document.getElementById('cronometro').innerText = tiempoFormateado;
}
*/

function actualizarCronometro() {
    milisegundos += 100; // Incrementa los milisegundos en 100 (puedes ajustar el valor según tus necesidades)

    if (milisegundos == 1000) {
        milisegundos = 0;
        segundos++;

        if (segundos == 60) {
            segundos = 0;
            minutos++;
        }
    }

    // Formatea el tiempo en formato mm:ss:SS
    const tiempoFormateado = minutos + ":" + (segundos < 10 ? "0" : "") + segundos + ":" + (milisegundos < 10 ? "0" : milisegundos < 100 ? "" : "") + milisegundos;

    document.getElementById('cronometro').innerText = tiempoFormateado;
}


function iniciarCronometro() {
    cronometroInterval = setInterval(actualizarCronometro, 100);
}

function detenerCronometro() {
    clearInterval(cronometroInterval);
}

function reiniciarCronometro() {
    clearInterval(cronometroInterval);
    segundos = 0;
    minutos = 0;
    document.getElementById('cronometro').innerText = "0:00:00";
}


function enviarDatosAServidor() {
    var tiempoEnMiliSegundos = (minutos * 60 + segundos) * 1000 + milisegundos;;

    // Crear un objeto FormData y agregar valores
    var formData = new FormData();
    formData.append('nombre', nombreJugador);
    formData.append('pais', pais);
    formData.append('tiempo', tiempoEnMiliSegundos);

    // Realizar una solicitud POST a la vista de Django
    fetch('', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
            // No establezcas el Content-Type, será establecido automáticamente con multipart/form-data
        },
        credentials: 'same-origin',  // Ajusta esto según tus necesidades
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Manejar la respuesta del servidor si es necesario
    })
    .catch(error => {
        console.error('Error al enviar datos:', error);
    });
}

