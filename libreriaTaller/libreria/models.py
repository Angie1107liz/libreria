from django.db import models

# Create your models here.

#1. para definir un campo de texto (strings)
#models.CharField

#2. Indica la longitud maxima del campo 
#max_length

#3. indica que el campo acepta valores nulos o no obligario el campo de llenar.
#blank=true

#4. indica el valor por defecto del campo
#default=

#models es por la carpeta y model es una entidad para indicar que es una clase del archivo models 

class libro(models.Model):
    titulo= models.CharField(max_length=200)
    autor=models.CharField(max_length=60)
    ISBN=models.CharField(max_length=11)
    genero=models.CharField(max_length=60)
    num_disponible=models.IntegerField(max_length=3)
    num_ocupados=models.IntegerField(max_length=3)
    
    def __str__(self):
        return self.titulo 
    
    
class usuario(models.Model):
    
    nombreUsuario = models.CharField(max_length=60)
    direccionResidencia = models.CharField(max_length=60)
    correo = models.CharField(max_length=150)
    tipo_usuario = [
        (1, 'Lector'),
        (2, 'Bibliotecario'),
        (3, 'Administrador')
    ]
    tipoUsuario = models.IntegerField(choices=tipo_usuario)
    def _str_(self):
        return self.nombreUsuario
    
class prestamo(models.Model):
    fecha_prestamo=models.DateField()
    fecha_devolucion=models.DateField()
    estado=[
        (1, 'Prestamo'),
        (2, 'Entregado'),
        (3, 'Cancelado')
    ]
        
    Estado=models.IntegerField(choices=estado)
    usuario_prestamo=models.ForeignKey(usuario, related_name='prestamo', on_delete=models.PROTECT) 
    libro_prestamo = models.ForeignKey(libro, related_name='prestamo', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title
    


    

