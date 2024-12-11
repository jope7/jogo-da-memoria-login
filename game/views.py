from django.shortcuts import render, redirect
from .models import Partida
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

def menu(request):
    return render(request, 'menu.html')

@login_required
def index(request):
    
    if request.method == "POST":
        jogador = request.user
        # nome_jogador = request.POST.get('nome_jogador')
        quant_tentativas = int(request.POST.get('quant_tentativas'))
        tempo_duracao = float(request.POST.get('tempo_duracao'))  
        
        nova_partida = Partida(
            nome_jogador=jogador, 
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