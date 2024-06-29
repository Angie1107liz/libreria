//se almacena la url de la api
let url="http://127.0.0.1:8000/api/v1/libro/";

function listarLibro() {
    var busqueda = document.getElementById("buscar").value;
    var urlBusqueda = url;
    if (busqueda!=""){
        urlBusqueda+="?search="+busqueda;
    }   
    $.ajax({
        url:urlBusqueda,
        type: "GET",
        success: function(result){//success: funcion que se ejecuta cusndo la peticion tiene exito
            console.log(result);
            let curpoTablaLibro = document.getElementById("curpoTablaLibro");
            curpoTablaLibro.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaTitulo = document.createElement("td");
                let celdaAutor = document.createElement("td");
                let celdaIsbn = document.createElement("td");
                let celdaGenero = document.createElement("td");
                let celdaEjemplaresDisponibles = document.createElement("td");
                let celdaEjemplaresOcupados = document.createElement("td");
                // let celdaEstado = document.createElement("td");

                // let celdaEditar = document.createElement("td");
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdaTitulo.innerText= result[i]["titulo"];
                celdaAutor.innerText = result[i]["autor"];
                celdaIsbn.innerText = result[i]["ISBN"];
                celdaGenero.innerText = result[i]["genero"];
                celdaEjemplaresDisponibles.innerText = result[i]["num_disponible"];
                celdaEjemplaresOcupados.innerText = result[i]["num_ocupados"];
    
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaTitulo);
                trRegistro.appendChild(celdaAutor);
                trRegistro.appendChild(celdaIsbn);
                trRegistro.appendChild(celdaGenero);
                trRegistro.appendChild(celdaEjemplaresDisponibles);
                trRegistro.appendChild(celdaEjemplaresOcupados);

                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarLibro= document.createElement("button");
                botonEditarLibro.value=result[i]["id"];
                botonEditarLibro.innerHTML="<i class='fa-regular fa-pen-to-square'></i>";
                

                botonEditarLibro.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarLibroID(this.value); 
                }
                botonEditarLibro.className= "btn btn-outline-warning"

                celdaOpcion.appendChild(botonEditarLibro); 
                trRegistro.appendChild(celdaOpcion);

                curpoTablaLibro.appendChild(trRegistro);//se traen todos los registros

                 //boton Eliminar
                 let botonEliminarlibro = document.createElement("button");
                 botonEliminarlibro.innerHTML = "<i class='fas fa-trash-alt eliminar' ></i>"; 
                 botonEliminarlibro.className = "btn btn-outline-warning"; 
                  
                 let libroIdParaEliminar = result[i]["id"];
                 botonEliminarlibro.onclick = function() {
                    eliminarLibro(libroIdParaEliminar); // Llama a la función eliminarProducto con el ID del producto
                  };
                 
                 celdaOpcion.appendChild(botonEliminarlibro); 
                 trRegistro.appendChild(celdaOpcion);
    
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}

//Paso para crear el registro de un cliente ****
function registrarLibro() {
    
    let titulo = document.getElementById("titulo").value;
    let autor =document.getElementById("autor").value;
    let ISBN = document.getElementById("ISBN").value;
    let genero = document.getElementById("genero").value;
    let num_disponible = document.getElementById("num_disponible").value;
    let num_ocupados = document.getElementById("num_ocupados").value;

    let formData = {
        
        "titulo": titulo,
        "autor": autor,
        "ISBN": ISBN,
        "genero": genero,
        "num_disponible": num_disponible,
        "num_ocupados": num_ocupados
    };

    if(validarCampos()){

        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          success: function(result){
            Swal.fire({
              title: "Excelente",
              text: "Su registro se guardó correctamente",
              icon: "success"
            });
            // window.location.href= "http://127.0.0.1:5500/front_end/clienteRegistro.html";
          },
          error: function(error){
            Swal.fire("Error", "Error al guardar "+error.responseText, "error");
          }
        });
      }else{
       // alert("llena los campos correctamente")
        Swal.fire({
          title: "Error!",
          text: "complete los campos correctamente",
          icon: "error"
        });
      }
}


//Paso para que el usuario se registre y llene todos los datos correctamente :D****
function validarCampos() {
    var titulo = document.getElementById("titulo");
    var autor = document.getElementById("autor"); 
    var ISBN = document.getElementById("ISBN"); 
    var genero = document.getElementById("genero"); 
    var num_disponible=document.getElementById("num_disponible");
    var num_ocupados = document.getElementById("num_ocupados");  

    return validarTitulo(titulo) && validarAutor(autor) 
         && validarIsbn(ISBN) && validarGenero(genero) && validarEjemplaresDisponiblesOcupados(num_disponible)
         && validarEjemplaresDisponiblesOcupados(num_ocupados);
}

function validarTitulo(campo){
    var valido=true;
    if(campo.value.length < 3 || campo.value.length > 200){
        valido=false;
    }

    if (valido) {
        campo.className = "form-control is-valid"
    }
    else{
        campo.className = "form-control is-invalid"
    }
    return valido;
}

function validarAutor(Autor){
    let valor = Autor.value;
    let valido = true;
    if (valor.length <=0 || valor.length >60) {
        valido = false
    }
    if (valido) {
        Autor.className = "form-control is-valid"
    }
    else{
        Autor.className = "form-control is-invalid"
    }
    return valido;
}

function validarIsbn(Numero) {
    
    let valor = Numero.value;
    let valido = true;
    if (valor.length < 10 || valor.length >13) {
        valido = false
    }

    if (valido) {
        Numero.className = "form-control is-valid"
    }
    else{
        Numero.className = "form-control is-invalid"
    }
    return valido;
}

function validarGenero(Genero){
    let valor = Genero.value;
    let valido = true;
    if (valor.length <=0 || valor.length >60) {
        valido = false
    }
    if (valido) {
        Genero.className = "form-control is-valid"
    }
    else{
        Genero.className = "form-control is-invalid"
    }
    return valido;
}

function validarEjemplaresDisponiblesOcupados(Disponible) {
    
    let valor = Disponible.value;
    let valido = true;
    if (valor.length < 1 || valor.length >3) {
        valido = false
    }

    if (valido) {
        Disponible.className = "form-control is-valid"
    }
    else{
        Disponible.className = "form-control is-invalid"
    }
    return valido;
}




//Cuando le damos click al boton de guardar, este llamara a la function Update por medio del onclick******
function updateLibro() {
    var id = document.getElementById("id").value;

    let formData = {
        "titulo": document.getElementById("titulo").value,
        "autor": document.getElementById("autor").value,
        "ISBN": document.getElementById("ISBN").value,
        "genero": document.getElementById("genero").value,
        "num_disponible": document.getElementById("num_disponible").value,
        "num_ocupados": document.getElementById("num_ocupados").value
        // "estado": document.getElementById("estado").value
    };


    //Cuando estamos actualizando los datos, y lo hacemos correctamente Aparecerá la Alerta EXCELENTE *****
    if(validarCampos()){
    $.ajax({
        url: url + id+"/",
        type: "PUT",
        data: formData,
        success: function(result) {
            Swal.fire({
                title: "Excelente",
                text: "Su registro se actualizó correctamente",
                icon: "success"
            });
            
            var modal = document.getElementById("exampleModal"); 
            modal.style.display = "hide";

            listarLibro(); //Lista los médicos después de actualizar
        },
        error: function(error) {
            Swal.fire("Error", "Error al guardar", "error");
        }  
    });
    }else{
        Swal.fire({
            title: "Error!",
            text: "Complete los campos correctamente",
            icon: "error"
        });
        }
}


/* metodo para obtener los datos en el modal de actualizar*/ 
//1.Crear petición que traiga la información del cliente por id
function consultarLibroID(id){
    //alert(id);
    $.ajax({
        url:url + id,
        type:"GET",
        success: function(result){
            
            document.getElementById("id").value=result["id"];
            document.getElementById("titulo").value=result["titulo"];
            document.getElementById("autor").value=result["autor"];
            document.getElementById("ISBN").value=result["ISBN"];
            document.getElementById("genero").value=result["genero"];
            document.getElementById("num_disponible").value=result["num_disponible"];
            document.getElementById("num_ocupados").value=result["num_ocupados"];
        }
    });
}
function limpiar(){

    // document.getElementById("id").className="form-control";
    document.getElementById("titulo").className="form-control";
    document.getElementById("autor").className="form-control";
    document.getElementById("ISBN").className="form-control";
    document.getElementById("genero").className="form-control";
    document.getElementById("num_disponible").className="form-control";
    document.getElementById("num_ocupados").className="form-control";
    // document.getElementById("estado").className="form-control";

    // document.getElementById("tipo_Identificacion").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("ISBN").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("num_disponible").value = "";
    document.getElementById("num_ocupados").value = "";
}


   // funcion de  elimado permanente  
   function eliminarLibro(id) {
    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
      title: '¿Estás seguro de eliminar este registro ?',
      text: "Esta opción no tiene marcha atrás",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Eliminar!'
    }).then((result) => {
      // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
      if (result.isConfirmed) {
        $.ajax({
          url: url + id+"/",
          type: "DELETE",
          success: function (eliminarPermanente) {
            // Mostrar un mensaje de éxito
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Registro Eliminado",
                showConfirmButton: false,
                timer: 1500
            });
            // Actualizar la lista de cliente después de eliminar
            listarLibro();
          },
          error: function (xhr, status, error) {
            // Manejo de errores
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El registro tiene un ingreso.'
            });
          }
        });
      }
   });
 };