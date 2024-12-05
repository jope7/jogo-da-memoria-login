from django.shortcuts import render, redirect
from .models import Partida
from django.utils import timezone

def index(request):
    
    if request.method == "POST":
        nome_jogador = request.POST.get('nome_jogador')
        quant_tentativas = int(request.POST.get('quant_tentativas'))
        tempo_duracao = float(request.POST.get('tempo_duracao'))  
        
        nova_partida = Partida(
            nome_jogador=nome_jogador, 
            quant_tentativas=quant_tentativas, 
            tempo_duracao=tempo_duracao,
            data_hora_partida=timezone.now()
        )
        
        nova_partida.save()
        
        return redirect('ranking')
    
    return render(request, 'index.html')

def ranking(request):
    partidas_tabela = Partida.objects.all().order_by('quant_tentativas','tempo_duracao','-data_hora_partida')
    
    return render(request, 'ranking.html', {
        'partidas_tabela':partidas_tabela, 
    })