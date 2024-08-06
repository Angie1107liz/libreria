from django.contrib import admin
from .models import libro
from.models import usuario
from.models import prestamo

admin.site.register(libro)
admin.site.register(usuario)
admin.site.register(prestamo)

# Register your models here.
