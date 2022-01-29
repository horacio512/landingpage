const avatar = document.getElementById('jsCreate');

//Función que revisa que al ingresarse un campo no este vacío
function campoVacio(cadena) {
    if (cadena == "") {
        return true;
    }
    else {
        return false;
    }
}

//Funcion que crea valores al azar entre 1 y 10
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
//Funcion que determina que avatar gano la lucha
function vs(nuevoAvatar, machineAvatar, saveRandom) {
    if (nuevoAvatar > machineAvatar) {

        let win = document.createElement('div');
        win.classList.add("col-12");
        //lo pongo que lleva adentro
        win.innerHTML = `<p class="matchWin" >El ganador es: ${user[1]} </p>`

        //le digo donde mostrar
        avatar.appendChild(win);
    }

    else {
        let lose = document.createElement('div');
        lose.classList.add("col-12");
        //lo pongo que lleva adentro
        lose.innerHTML = `<p class="matchLose">El ganador es: ${saveRandom} </p>`
        //le digo donde mostrar
        avatar.appendChild(lose);
    }

}

// Array con nombres

const machineNames = ["Rotary", "Bumblebee", "Simbioide", "Tikitaka", "Kazekage", "Don Barredora"];

// Funcion que ordena los nombres y los Junta separados por un espacio
function orderNames(orderNames) {
    orderNames = machineNames.sort();
    return orderNames.join(" ");
}


//Funcion que elije un nombre al azar del array machineNames
function randomAvatar() {
    const random = Math.random() * machineNames.length | 0;
    const randomName = machineNames[random];
    return randomName;
}
//Guardo el nombre aleatorio para poder usarlo
const saveRandom = randomAvatar();

class Avatar {

    constructor(fuerza, agilidad, inteligencia, destreza) {
        this.fuerza = fuerza;
        this.agilidad = agilidad;
        this.inteligencia = inteligencia;
        this.destreza = destreza;
    }

    fuerzaMax() {
        if (this.fuerza > 7) {
            this.agilidad -= 2;
            this.inteligencia -= 2;
            this.destreza -= 2;
        }

        if ((this.fuerza >= 5) & (this.fuerza <= 7)) {
            this.agilidad -= 1;
            this.inteligencia -= 1;
            this.destreza -= 1;
        }

    }

    agilidadMax() {
        if (this.agilidad > 7) {
            this.inteligencia += 1;
            this.destreza += 1;
        }

        if ((this.agilidad >= 5) & (this.agilidad <= 7)) {
            this.inteligencia += 1;
            this.destreza += 1;
        }

    }

    inteligenciaMax() {
        if (this.inteligencia > 7) {
            this.agilidad += 1;
            this.destreza += 2;
        }

        if ((this.inteligencia >= 5) & (this.inteligencia <= 7)) {
            this.inteligencia += 1;
            this.destreza += 1;
        }
    }

    destrezaMax() {
        if (this.destreza > 7) {
            this.fuerza -= 1;
            this.inteligencia += 1;
            this.agilidad += 2;
        }

        if ((this.destreza >= 5) & (this.destreza <= 7)) {
            this.inteligencia += 1;
            this.destreza += 1;
        }

    }

    promedio() {
        return (this.fuerza + this.inteligencia + this.agilidad + this.destreza) / 4;
    }

    mostrarStats() {

        let stats = document.createElement('div');
        stats.classList.add("col-lg-4");
        //lo pongo que lleva adentro
        stats.innerHTML = `<p class="match">El avatar ${user[1]} tiene los siguientes stats: </p>
                            <p class="match">Una fuerza de: ${this.fuerza}</p>
                            <p class="match">Una agilidad de: ${this.agilidad}</p>
                            <p class="match">Una inteligencia de: ${this.inteligencia}</p>
                            <p class="match">Una destreza de: ${this.destreza}</p>
                            <p class="match">Con un promedio de ${this.promedio()}</p>`
        //le digo donde mostrar
        avatar.appendChild(stats);

        //agrego gif
        const img = document.createElement('img');
        img.src = "./images/fight.gif";
        document.querySelector('#jsCreate').appendChild(img)
        img.classList.add("col-lg-4");

    }

    machineStats() {
        let stats = document.createElement('div');
        stats.classList.add("col-lg-4");
        //lo pongo que lleva adentro
        stats.innerHTML = `<p class="match">El avatar ${saveRandom} tiene los siguientes stats: </p>
                            <p class="match">Una fuerza de: ${this.fuerza}</p>
                            <p class="match">Una agilidad de: ${this.agilidad}</p>
                            <p class="match">Una inteligencia de: ${this.inteligencia}</p>
                            <p class="match">Una destreza de: ${this.destreza}</p>
                            <p class="match">Con un promedio de ${this.promedio()}</p>`
        //le digo donde mostrar
        avatar.appendChild(stats);
    }

}



//llamo al elemento padre
const jsNew = document.getElementById('machine');
//creo elemento div para contener esta parte 
let simulator = document.createElement('div');

//lo pongo que lleva adentro
simulator.innerHTML = `<p class=machineSt>${orderNames(machineNames)}  </p>`;

//le digo donde mostrar
jsNew.appendChild(simulator);



let combatStart = document.getElementById('enviar');

combatStart.addEventListener("click", sendStats);

function sendStats() {

    let machineAvatar = new Avatar(random(1, 10), random(1, 10), random(1, 10), random(1, 10));
    machineAvatar.fuerzaMax();
    machineAvatar.agilidadMax();
    machineAvatar.inteligenciaMax();
    machineAvatar.destrezaMax();



    let nuevoAvatar = new Avatar(Number(document.getElementById('fuerza').value), Number(document.getElementById('agilidad').value),
        Number(document.getElementById('inteligencia').value), Number(document.getElementById('destreza').value));
    nuevoAvatar.fuerzaMax();
    nuevoAvatar.agilidadMax();
    nuevoAvatar.inteligenciaMax();
    nuevoAvatar.destrezaMax();
    nuevoAvatar.mostrarStats();
    machineAvatar.machineStats();
    vs(nuevoAvatar.promedio(), machineAvatar.promedio(), saveRandom);

    let bye = document.getElementById("createStats");
    bye.parentNode.removeChild(bye);

    let byeTwo = document.getElementById("byeTwo");
    byeTwo.parentNode.removeChild(byeTwo);
}


/*COMIENZO DEL ARRAY CON LOS DATOS DEL USUARIO*/

const user = [];
let band = true;
/*
//Agrego datos al array
while (band) {

    let userName = prompt("Ingrese su nombre: ")

    if (campoVacio(userName)) {
        alert("Ingrese dato correcto!");
    }
    else {
        user.push(userName);
        band = false;
    }
}
*/


