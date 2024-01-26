from django.db import models

class Jugador(models.Model):
    nombre = models.CharField(max_length=200)
    red_social = models.CharField(max_length=300, blank=True, null=True)
    pais = models.ForeignKey('Pais', models.DO_NOTHING, db_column='pais')
    mejor_puntaje = models.IntegerField()

    def __str__(self):
        return self.nombre
    
    class Meta:
        managed = False
        db_table = 'jugador'


class Pais(models.Model):
    nombre = models.CharField(max_length=100)
    codigo_bandera = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.nombre
    
    class Meta:
        managed = False
        db_table = 'pais'
