from django.shortcuts import render

# Create your views here.

def inicio(request):
    return render(request, 'alura_game_app/inicio.html')


def juega(request):
    return render(request, 'alura_game_app/juega.html')


def puntuaciones(request):
    return render(request, 'alura_game_app/puntuaciones.html')