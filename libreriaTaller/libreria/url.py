from django.contrib import admin
from django.urls import path,include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers

from libreria import views
 
router=routers.DefaultRouter()
router.register(r'',views.libroView,'/libro')
router=routers.DefaultRouter()
router.register(r'',views.usuarioView,'/usuario')


urlpatterns = [
    path("api/v1/libro/", include(router.urls)),
    path("api/v1/usuario/", include(router.urls)),
    path("docs/",include_docs_urls(title ="libreriaAPI"))
]