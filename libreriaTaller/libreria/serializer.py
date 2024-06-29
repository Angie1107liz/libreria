from rest_framework import serializers

from .models import libro
from .models import usuario
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