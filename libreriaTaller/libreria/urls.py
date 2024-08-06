from django.contrib import admin
from django.urls import path,include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers

from libreria import views
 
routerLibro=routers.DefaultRouter()
routerLibro.register(r'',views.libroView,'/libro')

routerUsuario=routers.DefaultRouter()
routerUsuario.register(r'',views.usuarioView,'/usuario')

routerPrestamo=routers.DefaultRouter()
routerPrestamo.register(r'',views.prestamoView,'/prestamo')


urlpatterns = [
    path("api/v1/libro/", include(routerLibro.urls)),
    path("api/v1/usuario/", include(routerUsuario.urls)),
    path("api/v1/prestamo/", include(routerPrestamo.urls)),
    path("docs/",include_docs_urls(title ="libreriaAPI"))
]