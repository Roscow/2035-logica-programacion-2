from django.shortcuts import render
from .models  import Jugador, Pais
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.

def inicio(request):
    return render(request, 'alura_game_app/inicio.html')

@csrf_exempt  
def juega(request):
    listaPaises = Pais.objects.all().order_by('nombre')
    context = {'listaPaises':listaPaises}
    if request.method == 'POST':
        # Obtener los valores del formulario
        nombre_jugador = request.POST.get('nombre')
        pais_jugador = request.POST.get('pais')
        paisObj = Pais.objects.get(nombre=pais_jugador)
        tiempo = int(request.POST.get('tiempo'))
        try:
            jugadorObj = Jugador.objects.get(nombre=nombre_jugador, pais=paisObj)
            if (jugadorObj.mejor_puntaje > tiempo):
                jugadorObj.mejor_puntaje = tiempo
                jugadorObj.save()
        except Exception as e:
            print(f"no se pudo por error : {e}")
            jugadorObj = Jugador.objects.create(
                nombre=nombre_jugador,
                mejor_puntaje=tiempo,
                pais=paisObj
            )
            jugadorObj.save()
        return render(request, 'alura_game_app/juega.html', context)
    else:
        return render(request, 'alura_game_app/juega.html', context)


def puntuaciones(request):
    listaDiccionario=list()
    listaJugadores = Jugador.objects.all().order_by('mejor_puntaje')
    for l in listaJugadores:
        milisegundos_totales = int(l.mejor_puntaje)

        # Calcular segundos y milisegundos
        segundos = milisegundos_totales // 1000
        milisegundos = milisegundos_totales % 1000

        # Calcular minutos y segundos finales
        minutos = segundos // 60
        segundos = segundos % 60

        # Formatear el resultado
        tiempo_formateado = "{:02d}:{:02d}:{:03d}".format(minutos, segundos, milisegundos)
        dic={'jugador':l,'tiempo_formateado':tiempo_formateado }
        listaDiccionario.append(dic)
    context = {'listaJugadores':listaJugadores, 'listaDiccionario':listaDiccionario }
    return render(request, 'alura_game_app/puntuaciones.html',context)

@csrf_exempt  
def registrar_jugador(request):
    if request.method == 'POST':
        # Obtener los valores del formulario
        nombre_jugador = request.POST.get('nombre')
        pais_jugador = request.POST.get('pais')
        paisObj = Pais.objects.get(nombre=pais_jugador)
        tiempo = int(request.POST.get('tiempo'))
        try:
            jugadorObj = Jugador.objects.get(nombre=nombre_jugador, pais=paisObj)
            if (jugadorObj.mejor_puntaje > tiempo):
                jugadorObj.mejor_puntaje = tiempo
                jugadorObj.save()
        except Exception as e:
            print(f"no se pudo por error : {e}")
            jugadorObj = Jugador.objects.create(
                nombre=nombre_jugador,
                mejor_puntaje=tiempo,
                pais=paisObj
            )
            jugadorObj.save()

