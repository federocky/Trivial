window.addEventListener('load', function(){

    var boton = document.getElementById('boton');
    var campoNombre = document.getElementById('nombre');
    var campoContrasenia = document.getElementById('contrasenia');
    var mensajeError = document.getElementById('mensajeError');

    boton.addEventListener('click', function(e){
        e.preventDefault();

        
        if(campoNombre.value === '' || campoContrasenia.value === '') {
            mensajeError.style.visibility = 'visible';
            setTimeout(function(){
                mensajeError.style.visibility = 'hidden';
            }, 2000)
        } else if (campoNombre.value === 'fede'){
            document.location.href = 'app.html';
        } else {
            document.location.href = 'player2.html';
        }

    });

});