let numeroSecreto = 0;
let numeroMaximo = 10;
let intentos = 0;
let intentosMaximos = 3;
let numerosSorteados = [];
let vecesJugadas = 0;
let vecesJugadasMaximas = 5;

condicionesIniciales();

function asignarTextoElemento(selector, texto) {
    // Aqui obtenemos los elementos de nuestro html mediante el DOM
    let elemento = document.querySelector(selector);
    // Aqui manipulamos esos elementos
    elemento.innerHTML = texto;
}

function verificarIntento() {
    // Parseamos a entero el dato ingresado por el usuario
    let numeroUsuario = parseInt(document.querySelector("input").value);

    if (numeroSecreto === numeroUsuario) {
        asignarTextoElemento("p", `¡Adivinaste el número :)! en ${intentos} ${intentos === 1 ? "intento" : "intentos"}`);

        // Habilitamos el boton Nuevo juego removiendo el atributo disabled
        document.querySelector("#reiniciar").removeAttribute("disabled");

        // Deshabilitamos el boton Intentar dandole el atributo disabled
        document.querySelector("#intentar").setAttribute("disabled", true);
    } else {
        if (intentos === intentosMaximos) {
            asignarTextoElemento("p", "¡Perdiste :(! llegaste al máximo de intentos");

            // Habilitamos el boton Nuevo juego removiendo el atributo disabled
            document.querySelector("#reiniciar").removeAttribute("disabled");

            // Deshabilitamos el boton Intentar dandole el atributo disabled
            document.querySelector("#intentar").setAttribute("disabled", true);
        } else {
            let numeroIntento = intentosMaximos - intentos;

            // Le damos pistar al usuario
            if (numeroUsuario > numeroSecreto) {
                asignarTextoElemento("p", `El número secreto es menor. Te ${numeroIntento === 1 ? "queda" : "quedan"} ${numeroIntento} ${numeroIntento == 1 ? "intento" : "intentos"}`);
            } else {
                asignarTextoElemento("p", `El número secreto es mayor. Te ${numeroIntento === 1 ? "queda" : "quedan"} ${numeroIntento} ${numeroIntento == 1 ? "intento" : "intentos"}`);
            }
            
            intentos++;
            limpiarDato();
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento("h1", "Juego del número secreto");
    asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function generarNumeroSecreto() {
    let numeroElegido = Math.floor(Math.random() * numeroMaximo) + 1;

    if (vecesJugadas === vecesJugadasMaximas) {
        numerosSorteados = []; // Reseteamos el array para que todos los numeros sean sorteados
        vecesJugadas = 1;
    }

    if (numerosSorteados.includes(numeroElegido)) {
        return generarNumeroSecreto(); // Usamos la recursividad, para generar un numero que no este en el arreglo
    } else {
        numerosSorteados.push(numeroElegido);
        return numeroElegido;
    }
}

function limpiarDato() {
    document.querySelector("input").value = "";
}

function reiniciarJuego() {
    // Reiniciamos los valores - condiciones
    condicionesIniciales();

    // Limpiamos el dato del input
    limpiarDato();

    // Deshabilitamos el boton Nuevo juego dandole el atributo disabled
    document.querySelector("#reiniciar").setAttribute("disabled", true);

    // Habilitamos el boton Intentar removiendo el atributo disabled
    document.querySelector("#intentar").removeAttribute("disabled");

    // Aumentamos las veces que juega el usuario
    vecesJugadas++;
}