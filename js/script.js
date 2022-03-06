//url con los datos de los avatars
const URL = "./JSON/avatars.json"

$(document).ready(function () {

    //obtiene los datos de los avatars como nombre y su foto de un JSON local
    //y los muestra en pantalla al hacer click luegos los oculta tambien
    $("#btnAvatars").click(() => {
        $.get(URL, function (res, state) {
            if (state == "success") {
                $("#newShow").empty();
                res.forEach(dato => {
                    $("#newShow").append(`
                <div style="display: none; class= "col-12"> 
                           <div class="col-4 avatarDesc"><p id="des-${dato.id}" style="display: none;" >${dato.description}</p></div>
                           <div class="col-4 text-center"><p id="name-${dato.id}" class="avatarNameStyle">${dato.name}</p></div> 
                           <div class="col-3 text-center"><img id="img-${dato.id}" src="${dato.img}" class="img-fluid avatarPics"></div>
                           <div class="col-1 avatar-age" ><p id="id-${dato.id}" style="display: none; class="text-center">${dato.age} años.</p></div>
                           
                </div>`);
                    $("#newShow").show();
                    $("#newShow div").addClass("d-flex justify-content-around align-items-center").slideDown(1500);
                    $(`#newShow #img-${dato.id}`).hover(function () {
                        $(`#newShow #id-${dato.id}`).fadeIn(400);
                    }, function () {
                        $(`#newShow #id-${dato.id}`).fadeOut(400);
                    })

                    $(`#newShow #name-${dato.id}`).hover(function () {
                        $(`#newShow #des-${dato.id}`).fadeIn(1000);
                        $(`#newShow #name-${dato.id}`).animate({
                            fontSize: "3.5rem"
                        }, 500, function () {
                            $(`#newShow #des-${dato.id}`).animate({
                                textDecoration: "underline"
                            }, 500, function () { })
                        });
                    }, function () {
                        $(`#newShow #des-${dato.id}`).fadeOut(1000);
                        $(`#newShow #name-${dato.id}`).animate({
                            fontSize: "3rem"

                        }, 500, function () { });
                    });
                })
            }
            $("#newShow").append(`<div class="text-center pt-5"> 
                <button id="ocult" class="btn simuladorText2">Ocultar</button>
                </div>`);
            $("#ocult").on('click', () => {
                $("#newShow").slideUp(1500);
            })
        });
    })



    //borra los divs al enviar para poder mostrar el contenido mejor
    //ademas crea el boton para jugar de nuevo
    $("#enviar").on('click', () => {
        $("#createStats").remove();
        $("#byeTwo").remove();
        $("#reloadPage").append(`<div class="d-flex justify-content-center align-items-center">
        <p class="playAgain">Jugar de Nuevo</p>
        <img id="reload" src="./images/reload.png" class="img-fluid btn"></div>`);

        //permite re cargar la pagina para jugar de nuevo
        $("#reload").click(function () {
            location.reload(true);
        });

    });


    //guarda el nombre dependiendo de si esta checked en local o session storage
    $("#btnGuardar").on('click', () => {

        //muestra cartel de error en caso de que este vacio
        if (avatarName.value == "") {
            $("#errorDisplay").empty();
            $("#errorDisplay").append(`<p id="err-2" class="error">Ingrese un nombre para continuar</p>`);
        }
        else {
            $("#errorDisplay #err-2").fadeOut(1000, function () {
                $("#errorDisplay #err-2").remove();
            });
            if (rememberMe.checked) {
                guardarDatos("localStorage");
                $("#enviar").fadeIn(2000);
                $("#btnGuardar").hide();
            } else {
                guardarDatos("sStorage");
                $("#enviar").fadeIn(2000);
                $("#btnGuardar").hide();
            }
        }
    })

    //borra los datos de local storage referentes al usuario y muestra una confirmación
    $("#btnBorrar").on('click', () => {
        window.localStorage.removeItem('data');
        sessionStorage.clear();
        $("#errorDisplay-2").empty();
        $("#errorDisplay-2").append(`<p id="err-3" class="success">Datos Borrados</p>`);
        $("#errorDisplay-2").animate($("#err-3").fadeOut(6000));
    })

    //Historial

    $("#btnHistorial").on('click', () => {
        $("#historial").empty();
        let historialPelea = localStorage.getItem('historial');

        let myData = JSON.parse(historialPelea);
            //si el historial esta vacio muestra un error en pantalla
        if (localStorage.getItem('historial') == null) {
            $("#historial").append(`<h3 class="historialTitle">Historial Vacio</h3>`)
        } 
        else {
            $("#historial").append(`<h3 class="historialTitle">Historial de Peleas</h3>`)
            //muestra en pantalla los datos de historial siendo el usuario el avatar y quien gano.
            for (let i = 0; i < myData.length; i++) {

                $("#historial").append(`<div class="text-center"><p class="fs-2 ">${(myData[i].usuario)} VS ${(myData[i].maquina)}</p>
                                <p class="fs-2 historialPeleas">Ganador  ${(myData[i].ganador)}</p></div>`);
            }
            //crea el boton para borrar el historial
            $("#historial").append(`<div class="text-center"><button id="borrarHistorial" class="btn simuladorText2 text-center">Borrar Historial</button></div>`);
            //borra solo el historial
            $("#borrarHistorial").on('click', () => {
                window.localStorage.removeItem('historial');
            //muestra confirmacion al borrar
                $("#historial").empty();
                $("#historial").append(`<p id="err-3" class="success col-3">Datos Borrados</p>`);
                $("historial").animate($("#err-3").fadeOut(6000));
            });
        }
    })


});


let saveRandom = "";
//Funcion que elije un nombre al azar de la API local 
function randomAvatar() {
    const random = Math.random() * 5 | 0;
    $.get(URL, function (data) {

        const randomName = data[random].name;
        saveRandom = randomName;
    })
}
//Guardo el nombre aleatorio para poder usarlo
const execute = randomAvatar();

const avatar = document.getElementById('jsCreate');

const user = []
//Funcion que crea valores al azar entre 1 y 10
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

//Funcion que determina que avatar gano la lucha
let winner = true;
function vs(nuevoAvatar, machineAvatar, saveRandom) {
    if (nuevoAvatar > machineAvatar) {

        let win = document.createElement('div');
        win.classList.add("col-12");
        //muestra al ganador utilizando al último usuario creado
        win.innerHTML = `<p class="matchWin" >El ganador es: ${user[user.length - 1]} </p>`

        //le digo donde mostrar
        avatar.appendChild(win);
        winner = true;
    }

    else {
        let lose = document.createElement('div');
        lose.classList.add("col-12");
        //lo pongo que lleva adentro
        lose.innerHTML = `<p class="matchLose">El ganador es: ${saveRandom} </p>`
        //le digo donde mostrar
        avatar.appendChild(lose);
        winner = false;
    }

}


//objeto con su constructor para la funcionalidad de la "pelea"
class Avatar {

    constructor(fuerza, agilidad, inteligencia, destreza) {
        this.fuerza = fuerza;
        this.agilidad = agilidad;
        this.inteligencia = inteligencia;
        this.destreza = destreza;
    }

    //funciones que calculan los stats

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
    // fin de funciones que calculan los stats

    //funcion que calcula el promedio
    promedio() {
        return (this.fuerza + this.inteligencia + this.agilidad + this.destreza) / 4;
    }

    //funcion que muestra en pantalla el resultado de los stats
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

//Funcion del boton Fight! que realiza los calculos
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

    //ejecuto funcion para guardar un historial de peleas
    saveMatches(saveRandom, user[user.length - 1], winner);

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

function saveMatches(machine, user, winner) {


    let victory = "";
    if (winner == true) {
        victory = user;
    }
    else if (winner == false) {
        victory = machine;
    }

    let history = { usuario: user, maquina: machine, ganador: victory };

    if (localStorage.getItem('historial') == null) {
        localStorage.setItem('historial', '[]');
    }

    let fight1 = JSON.parse(localStorage.getItem('historial'));
    fight1.push(history);

    localStorage.setItem('historial', JSON.stringify(fight1));

}


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

