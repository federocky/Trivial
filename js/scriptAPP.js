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




    var contador = document.querySelector('.contador');
    var valorContador = 2;

    const contenedor = document.querySelector('#contenedor');

    const pregunta = document.getElementById('pregunta');
    const respuesta1 = document.getElementById('respuesta1');
    const respuesta2 = document.getElementById('respuesta2');
    const respuesta3 = document.getElementById('respuesta3');
    const respuesta4 = document.getElementById('respuesta4');
    var preguntasRespondidas = [];
    var respuestaBuena = ' ';
    contador.addEventListener('click', countdown);
    
    respuesta1.addEventListener('click', comprobarRespuesta);
    respuesta2.addEventListener('click', comprobarRespuesta);
    respuesta3.addEventListener('click', comprobarRespuesta);
    respuesta4.addEventListener('click', comprobarRespuesta);

    /**
     * Cuenta atras al entrar.
     */
    function countdown(){
        contador.classList.remove('contadorSinPulsar');
        contador.classList.add('contadorPulsado');
        contador.textContent = valorContador;

    let intervalo = setInterval(function(){
            valorContador--;
            contador.textContent = valorContador
            if(valorContador == 0) {
                clearInterval(intervalo);
                contador.style.display = 'none';
                contenedor.style.visibility = 'visible';
                cambiaPregunta();
            }
        },1500);
    }

    function cambiaPregunta(){
        let posicion = Math.floor(Math.random() * (preguntas.length));

        if(contiene(preguntasRespondidas, posicion)) {
            cambiaPregunta
        } else {
            pregunta.innerHTML = preguntas[posicion].pregunta;
            respuesta1.innerHTML = preguntas[posicion].respuesta1;
            respuesta2.innerHTML = preguntas[posicion].respuesta2;
            respuesta3.innerHTML = preguntas[posicion].respuesta3;
            respuesta4.innerHTML = preguntas[posicion].respuesta4;
            respuestaBuena = preguntas[posicion].respuestaCorrecta;
            preguntasRespondidas.push(posicion);
        }

    }



    function comprobarRespuesta(e){
        if (e.target.id == respuestaBuena) e.target.classList.add('respuestaCorrecta');
        else e.target.classList.add('respuestaIncorrecta');

        setTimeout(() => {
            e.target.className = 'respuesta';
            cambiaPregunta();
        }, 2000);
    }
    




    function contiene (array, valor) {
        for (const elemento of array) {
            if (elemento == valor) return true;
        }
        return false;
    }


})

