from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('juega/', views.juega, name='juega'),
    path('puntuaciones/', views.puntuaciones, name='puntuaciones'),
    path('juega/registrar_jugador/', views.registrar_jugador, name='registrar_jugador'),
]
