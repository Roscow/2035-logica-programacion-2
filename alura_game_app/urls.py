from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.inicio, name='inicio'),
    path('juega/', views.juega, name='juega'),
    path('puntuaciones/', views.puntuaciones, name='puntuaciones'),
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
