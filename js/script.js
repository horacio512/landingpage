const machineNames = ["Kioshi", "Aang", "Wan", "Korra", "Roku"]; // Array con nombres

$(document).ready(function () {

    //borra los divs al enviar para poder mostrar el contenido mejor
    $("#enviar").on('click', () => {
        $("#createStats").remove();
        $("#byeTwo").remove();
    });


    //guarda el nombre dependiendo de si esta checked en local o session storage
    $("#btnGuardar").on('click', () => {
        if (rememberMe.checked) {
            guardarDatos("localStorage");
        } else {
            guardarDatos("sStorage");
        }
    })

    //borra los datos de local storage
    $("#btnBorrar").on('click', () => {
        localStorage.clear();
    })


$("#machine").append(`<p id="avatarShow" class=machineSt>${machineNames.join(" ")}  </p>`);

$("#avatarImg").hide(); //esconde la imagen por defecto

$("#avatarShow").mouseenter(function () { //muestra la imagen al pasar por arriba
    $("#avatarImg").fadeIn();

});
$("#avatarShow").mouseleave(function () {  //la esconde de nuevo al salir
    $("#avatarImg").fadeOut();
});

});

const avatar = document.getElementById('jsCreate');

const user = []
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
        win.innerHTML = `<p class="matchWin" >El ganador es: ${user[user.length - 1]} </p>`

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
        stats.innerHTML = `<p class="match">El avatar ${user} tiene los siguientes stats: </p>
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

let combatStart = document.getElementById('enviar');

combatStart.addEventListener("click", sendStats);

/*Funcion del boton Fight! que realiza los calculos, borra lo que hay en pantalla
para mostrar los resultados*/
function sendStats() {

    //creo un avatar con un nombre al azar
    let machineAvatar = new Avatar(random(1, 10), random(1, 10), random(1, 10), random(1, 10));
    //le defino los stats
    machineAvatar.fuerzaMax();
    machineAvatar.agilidadMax();
    machineAvatar.inteligenciaMax();
    machineAvatar.destrezaMax();


    //creo un avatar con los datos que da el usuario
    let nuevoAvatar = new Avatar(Number(document.getElementById('fuerza').value), Number(document.getElementById('agilidad').value),
        Number(document.getElementById('inteligencia').value), Number(document.getElementById('destreza').value));
    //le defino los stats    
    nuevoAvatar.fuerzaMax();
    nuevoAvatar.agilidadMax();
    nuevoAvatar.inteligenciaMax();
    nuevoAvatar.destrezaMax();
    nuevoAvatar.mostrarStats();
    machineAvatar.machineStats();
    vs(nuevoAvatar.promedio(), machineAvatar.promedio(), saveRandom);
}


/*   FUNCIONAMIENTO DE BOTONES   */
//Funcionamiento de botones de fuerza

const myInput = document.getElementById("fuerza");
function stepper(btn) {
    let id = btn.getAttribute("id");
    let min = myInput.getAttribute("min");
    let max = myInput.getAttribute("max");
    let step = myInput.getAttribute("step");
    let val = myInput.getAttribute("value");
    let calcStep = (id == "increment") ? (step * 1) : (step * -1);

    let newValue = parseInt(val) + calcStep;

    if (newValue >= min && newValue <= max) {
        fuerza.setAttribute("value", newValue);
    }
}
//boton de agilidad
const myInput2 = document.getElementById("agilidad");
function stepper2(btn2) {
    let id = btn2.getAttribute("id");
    let min = myInput2.getAttribute("min");
    let max = myInput2.getAttribute("max");
    let step = myInput2.getAttribute("step");
    let val = myInput2.getAttribute("value");
    let calcStep = (id == "increment1") ? (step * 1) : (step * -1);

    let newValue1 = parseInt(val) + calcStep;

    if (newValue1 >= min && newValue1 <= max) {
        agilidad.setAttribute("value", newValue1);
    }
}

const myInput3 = document.getElementById("inteligencia");
function stepper3(btn3) {
    let id = btn3.getAttribute("id");
    let min = myInput3.getAttribute("min");
    let max = myInput3.getAttribute("max");
    let step = myInput3.getAttribute("step");
    let val = myInput3.getAttribute("value");
    let calcStep = (id == "increment2") ? (step * 1) : (step * -1);

    let newValue2 = parseInt(val) + calcStep;

    if (newValue2 >= min && newValue2 <= max) {
        inteligencia.setAttribute("value", newValue2);
    }
}

const myInput4 = document.getElementById("destreza");
function stepper4(btn4) {
    let id = btn4.getAttribute("id");
    let min = myInput4.getAttribute("min");
    let max = myInput4.getAttribute("max");
    let step = myInput4.getAttribute("step");
    let val = myInput4.getAttribute("value");
    let calcStep = (id == "increment3") ? (step * 1) : (step * -1);

    let newValue3 = parseInt(val) + calcStep;

    if (newValue3 >= min && newValue3 <= max) {
        destreza.setAttribute("value", newValue3);
    }
}

/* FIN DE FUNCIONAMIENTO DE BOTONES */


//Botones de STORAGE


function guardarDatos(storage) {

    if (storage === "localStorage") {

        //consigo el dato del usuario
        let newData = document.getElementById('avatarName').value;
        user.push(newData);
        //chequeo que no este vacio y despues guardo un array vacio
        if (localStorage.getItem('data') == null) {
            localStorage.setItem('data', '[]');
        }

        let oldData = JSON.parse(localStorage.getItem('data'));
        oldData.push(newData);

        localStorage.setItem('data', JSON.stringify(oldData));

    }

    if (storage === "sStorage") {

        //consigo el dato del usuario
        let newData = document.getElementById('avatarName').value;
        user.push(newData);
        //chequeo que no este vacio y despues guardo un array vacio
        if (sessionStorage.getItem('data') == null) {
            sessionStorage.setItem('data', '[]');
        }

        let oldData = JSON.parse(sessionStorage.getItem('data'));
        oldData.push(newData);

        sessionStorage.setItem('data', JSON.stringify(oldData));
    }

}


let btnSesion = document.getElementById('btnSesion');
