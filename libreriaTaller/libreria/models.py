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
        return self.title 
    
    
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
        return self.title
    


    

