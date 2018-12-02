'use strict';
//Variables globales y constantes

const CERO=0;
const MARCA=2;
const SIN_MARCA=1;
let contPartidas = CERO;
let partidaMemoria = CERO;
let acierto = CERO;
let error = CERO;
let erroresT = CERO;
let aciertosT = CERO;
let cantMarcas = CERO;

//Arreglos de tablero.
let tablero = [];
let tableroAnterior = [];

//DOM boton comenzar.
let btnBegin = document.getElementById('btn-comenzar');
btnBegin.addEventListener('click', function(){
  acierto = CERO; //Forzamos inicio de aciertos parciales en CERO.
  error = CERO; //Forzamos inicio de errores parciales en CERO.
  let acerto = document.getElementById("acierto");
  acerto.innerHTML = CERO; //Mostramos aciertos.
  let erro = document.getElementById("error");
  erro.innerHTML = CERO; //Mostramos errores.
  let eTotales = document.getElementById("erroresT");
  eTotales.innerHTML = erroresT; //Mostramos errores totales.
  let aTotales = document.getElementById("aciertosT");
  aTotales.innerHTML = aciertosT; //Mostramos errores totales.

  generarTablero(); //Generamos tablero.
  let partida = document.getElementById("contPartidas");
  partida.innerHTML = ++contPartidas; //Mostramos la cantidad de partidas.

});

//Genera marcas, 1=Vacio 2=Marca
function generarMarca() {
  let num = Math.floor((Math.random() * 2) + 1);
  if (num===MARCA) {
    cantMarcas++; //Si añadimos marca la contamos.
  }
  return num;
}

//Generamos un tablero si es par nuevo, si es impar anterior
function generarTablero() {
  if (partidaMemoria % 2 === CERO) {
    cantMarcas = CERO;
    for (let i = 1; i <= 5; i++) {
      tablero[i] = generarMarca();
      tableroAnterior[i] = tablero[i];
      let tableros = document.getElementById(i);
      tableros.src = 'img/casillero' + tablero[i] + '.jpg';
    }
  } else {

    for (let i = 1; i <= 5; i++) {
      tablero[i] = tableroAnterior[i];
      let tablerosCopia = document.getElementById(i);
      tablerosCopia.src = 'img/casillero' + tablero[i] + '.jpg';
    }
  }

  partidaMemoria++;
  let tiempoUsuario = document.getElementById('tiempo').value;
  ocultarMarcas(tiempoUsuario);
  document.getElementById('formulario').classList.remove('oculto');
}

document.getElementById('btn-submit').addEventListener('click', function (event) {
  event.preventDefault();
  let choice = document.getElementById('numCasillero').value;
  console.log(play);
  play(choice);
});

function play(choice) {

  console.log("cantMarcas"+ cantMarcas);
  console.log("acierto"+ acierto);
  verificarValor(choice);
  //Si cantidad de aciertos es igual a las marcas generadas.
  if(acierto===cantMarcas){
    terminarPartida(); //Terminamos la partida
    erroresT += error; //Sumamos al total de errores los errores de la partida actual.
    aciertosT += acierto; //Sumamos al total de aciertos los totales de la partida actual.
    let eTotal = document.getElementById("erroresT");
    eTotal.innerHTML = erroresT; //Actualizamos el total de errores.
    let aTotal = document.getElementById("aciertosT");
    aTotal.innerHTML = aciertosT; //Actualizamos el total de aciertos.
    alert('Fin de la partida'); //Damos una alerta que termino la partida
  }
}

function verificarValor(choice) { //aca es cas o choice?
  //DOM Boton Submit

  switch(tablero[choice]){
    //Si el casillero esta vacio, le avisa al usuario.
    case CERO: alert("Ya ingreso ese casillero.") ;
    console.log("Casilleros: " + tablero[choice]);
    break;
    //Si el casillero no tiene marcas, le suma un error y inhabilita la casilla.
    case SIN_MARCA:
    console.log("Casilleros: " + tablero[choice]);
    let sumarError = document.getElementById("error");
    sumarError.innerHTML = ++error;
    tablero[choice] = CERO;
    break;
    //Si en  el casillero esta la marca le da un acierto y saca la casilla de juego.
    case MARCA:
    console.log("Casilleros: " + tablero[choice]);
    let sumarAcierto = document.getElementById("acierto");
    sumarAcierto.innerHTML = ++acierto;
    console.log("Aciertos: " + acierto);
    tablero[choice]= CERO;
    break;
}
}


function terminarPartida() {
  document.getElementById('formulario').classList.add('oculto');

}

function ocultarMarcas(tiempoUsuario) {
  let timer = setTimeout(function(){
    for (let i = 1; i < 6; i++) {
      let casilleros = document.getElementById(i);
      casilleros.src = 'img/tapa'+i+'.jpg';
    }
  }, (tiempoUsuario*1000));
}
