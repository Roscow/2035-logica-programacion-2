from django.urls import path
from . import views

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('juega/', views.juega, name='juega'),
    path('puntuaciones/', views.puntuaciones, name='puntuaciones'),
]
