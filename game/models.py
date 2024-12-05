from django.db import models

class Partida(models.Model):
    nome_jogador = models.CharField(max_length=100, null=False)
    quant_tentativas = models.IntegerField(null=False)
    data_hora_partida = models.DateTimeField(auto_now_add=True, null=False)
    tempo_duracao = models.FloatField(null=True)  
    # Novo campo para a duração da partida
    
    def __str__(self):
        return f'{self.nome_jogador} - {self.data_hora_partida}'