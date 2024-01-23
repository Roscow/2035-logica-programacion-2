var tituloPrincipal = document.querySelector('h1')
tituloPrincipal.innerHTML= "Humano, juegas??"
var numeroSecreto = 0;
var numeroIntentos = 5;
var intentoActual = 0;
var parrafo = document.querySelector('p')
var pista = document.getElementById("pista")
var inputNUmero = document.querySelector('input')
var listaNumerosUsuario=[];

function assignarTexto(elemento, texto){
    elemento.innerHTML = texto;
}

function nuevoJuego(){
    pista.remove();
    inputNUmero.value='';
    numeroSecreto = Math.floor(Math.random() * 10) + 1;
    pista.innerHTML= numeroSecreto;
    intentoActual=0;
    istaNumerosUsuario=[];
    assignarTexto(tituloPrincipal,"Nuevo juego, tienes "+ numeroIntentos+ " oportunidades" );
    assignarTexto(parrafo , "Indica un numero entre 1 y 10");
    document.getElementById("intentar").disabled = false;  
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
    var numeroUsuario = inputNUmero.value;
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
            tituloPrincipal.innerHTML = "Ultimo intento, una pista fue revelada en la pantalla  : ";
        }
    
        if(parseInt(numeroIntentos-intentoActual) == 0 && numeroUsuario != numeroSecreto){
            tituloPrincipal.innerHTML = "PERDISTE";
            parrafo.innerHTML = "SE TE ACABARON LOS INTENTOS, el numero era: "+ numeroSecreto;
            document.getElementById("intentar").disabled = true;
        }
    }
    
    
    
}

function fallaste(){
    parrafo.innerHTML = "Fallaste";
    tituloPrincipal.innerHTML = "Tu Intento n° "+  intentoActual+ " Fallo, quedan " + (numeroIntentos-intentoActual) + ' intentos' ;
}

function adivinaste(){
    tituloPrincipal.innerHTML = "FELICIDADES";
    parrafo.innerHTML = "Adivinaste en el " + intentoActual + "° intento";
}

function perdiste(){
    tituloPrincipal.innerHTML = "PERDISTE";
    parrafo.innerHTML = "SE TE ACABARON LOS INTENTOS, el numero era: "+ numeroSecreto;
}