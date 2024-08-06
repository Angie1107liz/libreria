from django.shortcuts import render
from rest_framework import viewsets,filters

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
    
    
class usuarioView(viewsets.ModelViewSet):
    serializer_class=UsuarioSerializer
    queryset=usuario.objects.all()
    filter_backends=[filters.SearchFilter]
    search_fields={'$nombreUsuario','$direccionResidencia','$tipoUsuario'}

class prestamoView(viewsets.ModelViewSet):
    serializer_class=prestamoSerializer
    queryset=prestamo.objects.all()
    filter_backends=[filters.SearchFilter]
    search_fields={'$fecha_prestamo,$fecha_devolucion,$Estado,$usuario_prestamo,$libro_prestamo'}

class multaView(viewsets.ModelViewSet):
    serializer_class=multaSerializer
    queryset=multa.objects.all()
    filter_backends=[filters.SearchFilter]
    search_fields={'$fecha_multa,$usuario_multado,$prestamo,$valor_multa,$estado_multa'}