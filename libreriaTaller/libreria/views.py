from django.shortcuts import render
from rest_framework import viewsets,filters,status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializer import libroSerializer
from .serializer import UsuarioSerializer
from .serializer import prestamoSerializer
from .serializer import multaSerializer
from .models import usuario
from .models import libro
from .models import prestamo
from .models import multa

# Create your views here.

class libroView(viewsets.ModelViewSet):
    serializer_class=libroSerializer
    queryset=libro.objects.all()
    filter_backends=[filters.SearchFilter]
    search_fields={'$titulo','$autor','$ISBN','$genero'}
    
    @api_view(['DELETE'])
    def eliminarLibro(request, pk):
        try:
            libro= libro.objects.get(pk=pk)
        except libro.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if request.method=='DELETE':
            libro.delete()
            return Response(status=status.HTTP_204_NO_CONTENT,message="Se elimino correctamente")
            
    
    
class usuarioView(viewsets.ModelViewSet):
    serializer_class=UsuarioSerializer
    queryset=usuario.objects.all()
    filter_backends=[filters.SearchFilter]
    search_fields=['$nombreUsuario','$correo']

class prestamoView(viewsets.ModelViewSet):
    serializer_class=prestamoSerializer
    queryset=prestamo.objects.all()

class multaView(viewsets.ModelViewSet):
    serializer_class=multaSerializer
    queryset=multa.objects.all()
