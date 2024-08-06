from rest_framework import serializers

from .models import libro
from .models import usuario
from .models import prestamo
from .models import multa
#aca se importa la clase modelo

#se crea la clase serializer por cada entidad
#la clase meta dentro de serializer sirve
#para proporcionar metadatos adicionales y
#configuraciones especificas para el serialaizador 

class libroSerializer(serializers.ModelSerializer):
    #agregar los campos necesario para mostrar 
    #si se desea agregar todos los campos sse utiliza la funcion __all__
    class Meta:
        model=libro
        fields='__all__'
        
class UsuarioSerializer(serializers.ModelSerializer):
    #agregar los campos necesario para mostrar 
    #si se desea agregar todos los campos sse utiliza la funcion __all__
    class Meta:
        model=usuario
        fields='__all__'
class prestamoSerializer(serializers.ModelSerializer):
    class Meta:
        model=prestamo
        fields='__all__'
class multaSerializer(serializers.ModelSerializer):
    class Meta:
        model=multa
        fields='__all__'