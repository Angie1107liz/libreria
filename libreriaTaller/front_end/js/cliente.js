//se almacena la url de la api
let url="http://127.0.0.1:8000/api/v1/cliente/";
function listarUsuario() {
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
            let curpoTablaUsuario = document.getElementById("curpoTablaUsuario");
            curpoTablaUsuario.innerHTML="";
            for (let i = 0; i < result.length; i++) {
               //se crea una etiqueta tr por cada registro
                let trRegistro = document.createElement("tr");//fila por cada registro de la tabla
                let celdaId = document.createElement("td");
                let celdaNombre = document.createElement("td");
                let celdaDireccion = document.createElement("td");
                let celdaCorreo = document.createElement("td");
                let celdaTipo_Usuario = document.createElement("td");
                // let celdaEstado = document.createElement("td");

                // let celdaEditar = document.createElement("td");
                
                //almacenamos en valor
                
                celdaId.innerText = result[i]["id"];
                celdaNombre.innerText= result[i]["nombreUsuario"];
                celdaDireccion.innerText = result[i]["direccionResidencia"];
                celdaCorreo.innerText = result[i]["correo"];
                celdaTipo_Usuario.innerText = result[i]["tipo_usuario"];
    
                
                //agregando a los td a su respectivo th y agregandolos a la fila

                trRegistro.appendChild(celdaId);
                trRegistro.appendChild(celdaNombre);
                trRegistro.appendChild(celdaDireccion);
                trRegistro.appendChild(celdaCorreo);
                trRegistro.appendChild(celdaTipo_Usuario);
                
                //boton editar 
                let celdaOpcion= document.createElement("td");
                let botonEditarUsuario= document.createElement("button");
                botonEditarUsuario.value=result[i]["id"];
                botonEditarUsuario.innerHTML="<i class='fa-solid fa-pencil'></i>";
                

                botonEditarUsuario.onclick=function(e){
                    $('#exampleModal').modal('show');
                    consultarUsuarioID(this.value); 
                }
                botonEditarUsuario.className= "btn btn-success"

                celdaOpcion.appendChild(botonEditarUsuario); 
                trRegistro.appendChild(celdaOpcion);

                curpoTablaUsuario.appendChild(trRegistro);//se traen todos los registros

                 //boton Eliminar
                 let botonEliminarUsuario = document.createElement("button");
                 botonEliminarUsuario.innerHTML = "<i class='fas fa-trash-alt eliminar'></i>"; 
                 botonEliminarUsuario.className = "btn btn-danger"; 
                  
                 let usuarioIdParaEliminar = result[i]["id"];
                 botonEliminarUsuario.onclick = function() {
                    eliminarUsuario(usuarioIdParaEliminar); // Llama a la función eliminarProducto con el ID del producto
                  };
                 
                 celdaOpcion.appendChild(botonEliminarUsuario); 
                 trRegistro.appendChild(celdaOpcion);
    
            }
        },
        error:function(error){
            alert("Error en la peticion ${error}");
        }
    })
 
}

//Paso para crear el registro de un cliente ****
function registrarUsuario() {
    
    let nombreUsuario = document.getElementById("nombreUsuario").value;
    let direccionResidencia =document.getElementById("direccionResidencia").value;
    let correo = document.getElementById("correo").value;
    let tipo_usuario = document.getElementById("tipo_usuario").value;

    let formData = {
        
        "nombreUsuario": nombreUsuario,
        "direccionResidencia": direccionResidencia,
        "correo": correo,
        "tipo_usuario": tipo_usuario
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
    var nombreUsuario = document.getElementById("nombreUsuario");
    var direccionResidencia = document.getElementById("direccionResidencia"); 
    var correo = document.getElementById("correo"); 
    var tipo_usuario =document.getElementById("tipo_usuario"); 
     

    return validarNombre(nombreUsuario) && validarDireccion(direccionResidencia) 
         && correo(correo) ;
}

function validarNombre(campo){
    var valido=true;
    if(campo.value.length < 3 || campo.value.length > 60){
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

function validarDireccion(Direccion){
    let valor = Direccion.value;
    let valido = true;
    if (valor.length <=0 || valor.length >50) {
        valido = false
    }
    if (valido) {
      Direccion.className = "form-control is-valid"
    }
    else{
      Direccion.className = "form-control is-invalid"
    }
    return valido;
}

function validarCorreo(Correo){
    let valor = Correo.value;
    let valido = true;
    if (valor.length <=0 || valor.length >150) {
        valido = false
    }
    if (valido) {
        Correo.className = "form-control is-valid"
    }
    else{
        Correo.className = "form-control is-invalid"
    }
    return valido;
}

//Cuando le damos click al boton de guardar, este llamara a la function Update por medio del onclick******
function updateUsuario() {
    var id = document.getElementById("id").value;

    let formData = {
        "nombre": document.getElementById("nombre").value,
        "direccion": document.getElementById("direccion").value,
        "correo": document.getElementById("correo").value,
        "tipo_usuario": document.getElementById("tipo_usuario").value,
       
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

            listarUsuario(); //Lista los médicos después de actualizar
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
function consultarUsuarioID(id){
    //alert(id);
    $.ajax({
        url:url+id,
        type:"GET",
        success: function(result){
            
            document.getElementById("id").value=result["id"];
            document.getElementById("nombre").value=result["nombre"];
            document.getElementById("direccion").value=result["direccion"];
            document.getElementById("correo").value=result["correo"];
            document.getElementById("tipo_usuario").value=result["tipo_usuario"];
        }
    });
}
function limpiar(){

    document.getElementById("id").className="form-control";
    document.getElementById("nombre").className="form-control";
    document.getElementById("direccion").className="form-control";
    document.getElementById("correo").className="form-control";
    document.getElementById("tipo_usuario").className="form-control";


    // document.getElementById("tipo_Identificacion").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("tipo_usuario").value = "";
   
}


   // funcion de  elimado permanente  
   function eliminarUsuario(id) {
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
            listarUsuario();
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