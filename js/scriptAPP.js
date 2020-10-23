window.addEventListener('load', function(){
    
    var preguntas = [{
        pregunta: '¿quien descubrio america?',
        respuesta1: 'un hamster',
        respuesta2: 'Leonardo Di Caprio',
        respuesta3: 'Fede',
        respuesta4: 'Colón',
        respuestaCorrecta: 'respuesta4'
    },
    {
        pregunta: '¿quien soy?',
        respuesta1: 'un hamster',
        respuesta2: 'Leonardo Di Caprio',
        respuesta3: 'Fede',
        respuesta4: 'Colón',
        respuestaCorrecta: 'respuesta3'
    },
    {
        pregunta: '¿Quien es el padre de los simpsons?',
        respuesta1: 'un hamster',
        respuesta2: 'Leonardo Di Caprio',
        respuesta3: 'Homer',
        respuesta4: 'Colón',
        respuestaCorrecta: 'respuesta3'
    },
    {
        pregunta: '¿Cual no es un pokemon?',
        respuesta1: 'un hamster',
        respuesta2: 'Leonardo Di Caprio',
        respuesta3: 'Fede',
        respuesta4: 'Todas las anteriores',
        respuestaCorrecta: 'respuesta4'
    }

    ]



    const contenedorBoton = document.getElementById('contenedorBoton');
    const contador = document.querySelector('.contador');
    var valorContadorInicial = 5;

    const contenedor = document.querySelector('#contenedor');

    const barraTiempo = document.querySelector('#barraProgreso > div');
    var tiempo = 10;
    
    const pregunta = document.getElementById('pregunta');
    const respuesta1 = document.getElementById('respuesta1');
    const respuesta2 = document.getElementById('respuesta2');
    const respuesta3 = document.getElementById('respuesta3');
    const respuesta4 = document.getElementById('respuesta4');
    const respuestas = document.querySelectorAll('.respuesta');
    
    var respuestaBuena = ' ';
    
    const marcadorPlayer1 = document.getElementById('puntosP1');
    const marcadorPlayer2 = document.getElementById('puntosP2');
    var puntosPlayer1 = 0;
    var puntosPlayer2 = 0;
    
    var turnos = 0;
    var finPartida = 4;
    var cambioTurno = finPartida/2;
    
    contador.addEventListener('click', countdown);
    respuesta1.addEventListener('click', comprobarRespuesta);
    respuesta2.addEventListener('click', comprobarRespuesta);
    respuesta3.addEventListener('click', comprobarRespuesta);
    respuesta4.addEventListener('click', comprobarRespuesta);

    /**
     * Cuenta atras al entrar que inicia la partida
     */
    function countdown(){
        contador.classList.remove('contadorSinPulsar');
        //contador.classList.add('contadorPulsado');
        contador.textContent = valorContadorInicial;


    let intervalo = setInterval(function(){
            valorContadorInicial--;
            contador.textContent = valorContadorInicial;
            if(valorContadorInicial == 0) {
                clearInterval(intervalo);
                contador.textContent = 'Turno del player 1'
                setTimeout(() => {
                    contenedorBoton.style.display = 'none';
                    contenedor.style.visibility = 'visible';
                    cambiaPregunta();
                }, 2000);
            }
        },1500);
        contador.removeEventListener('click', countdown);
    }


    /**
     * Función que carga una pregunta al azar de el array y la elimina de este para que no se repita. 
     */
    function cambiaPregunta(){
        barraTiempo.style.display = 'flex'; //Muestra la barra de tiempo
        tiempo = 10;

        let posicion = Math.floor(Math.random() * (preguntas.length)); //Genero el numero random que sera la posicion de la pregunta

            pregunta.innerHTML = preguntas[posicion].pregunta;
            respuesta1.innerHTML = preguntas[posicion].respuesta1;
            respuesta2.innerHTML = preguntas[posicion].respuesta2;
            respuesta3.innerHTML = preguntas[posicion].respuesta3;
            respuesta4.innerHTML = preguntas[posicion].respuesta4;
            respuestaBuena = preguntas[posicion].respuestaCorrecta; //esta es la respuesta correcta
            //preguntasRespondidas.push(posicion);

            preguntas.splice(posicion,1); //eliminamos la pregunta del array
            

            var tiempoRespuesta = setInterval(() => {
                tiempo--;
                if (tiempo == 0) {
                    comprobarQueHacer();
                    clearInterval(tiempoRespuesta);
                }
            }, 1000);

    }


    /**
     * Una vez seleccionada la respuesta debemos comprobar si es correcta o no comparandola con nuestra variable
     * de respuesta buena. 
     * @param {} e 
     */
    function comprobarRespuesta(e){
        //barraTiempo.style.display = 'none'; //quitamos la barra de tiempo

        if (e.target.id == respuestaBuena) {
            e.target.classList.add('respuestaCorrecta');
            
            //a continuacion si hemos acertado no suma puntos. 
            if(turnos < cambioTurno) {
                puntosPlayer1++;
                marcadorPlayer1.innerHTML = puntosPlayer1;
            } else {
                puntosPlayer2++;
                marcadorPlayer2.innerHTML = puntosPlayer2;
            }

        }else {
            e.target.classList.add('respuestaIncorrecta');
            for (const elemento of respuestas) {
                if (elemento.id == respuestaBuena) elemento.classList.add('respuestaCorrecta');
            }
        }
    
        comprobarQueHacer();
    }

    function comprobarQueHacer() {
        turnos++;
        barraTiempo.style.display = 'none'; //quitamos la barra de tiempo
        
        for (const elemento of respuestas) {
            if (elemento.id == respuestaBuena) elemento.classList.add('respuestaCorrecta');
        }

        if (turnos == finPartida) terminarPartida();
        else if (turnos == cambioTurno){
            cambioDeTurno();
        } else {
            setTimeout(() => {
                quitarClase(); //quitamos la clase de correcta o incorrecta
                cambiaPregunta();
            }, 2000);
        }
    }

    function cambioDeTurno(){
        setTimeout(() => {
            //e.target.className = 'respuesta'; //quitamos la clase de respuesta correcta o incorrecta
            quitarClase(); //quitamos la clase de correcta o incorrecta
            document.getElementById('turno').innerHTML = 'Player 2';
            contenedor.style.visibility = 'hidden';
            contador.textContent = 'Turno del player 2' //avisamos que comienza el turno del player 2. 
            contenedorBoton.style.display = 'flex';
            setTimeout(() => {
                contenedor.style.visibility = 'visible';
                contenedorBoton.style.display = 'none';
                cambiaPregunta();
            }, 3300);
        }, 1500);

    }
    

    /**
     * Cuando se acaban los turnos comprobamos quien tiene mas respuestas correctas y mostramos por pantalla. 
     */
    function terminarPartida() {
        let ganador;
            if (puntosPlayer1 > puntosPlayer2) ganador = 'Ganador player 1';
            else if (puntosPlayer1 < puntosPlayer2) ganador = 'Ganador player 2';
            else ganador = 'empate';

            setTimeout(() => {
                contenedor.style.visibility = 'hidden';
                contador.textContent = ganador;
                contenedorBoton.style.display = 'flex';
            }, 1000);
    }


    function quitarClase(){
        for (const elemento of respuestas) {
            elemento.className = 'respuesta';
        }
    }


})

