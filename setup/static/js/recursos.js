$(document).ready(function() {
    
    const baseUrl = "/static/img/"

    const cartas = [
        { name: 'cereja', img: baseUrl + "carta1.png"},
        { name: 'melancia', img: baseUrl + 'carta2.png'},
        { name: 'tangerina', img: baseUrl + 'carta3.png'},
        { name: 'banana', img: baseUrl + 'carta4.png'},
        { name: 'melanciafatia', img: baseUrl + 'carta5.png'},
        { name: 'maca', img: baseUrl + 'carta6.png'},
        { name: 'cereja', img: baseUrl + 'carta1.png'},
        { name: 'melancia', img: baseUrl + 'carta2.png'},
        { name: 'tangerina', img: baseUrl + 'carta3.png'},
        { name: 'banana', img: baseUrl + 'carta4.png'},
        { name: 'melanciafatia', img: baseUrl + 'carta5.png'},
        { name: 'maca', img: baseUrl + 'carta6.png'}
    ]

    // embaralhamento de cartas 
    cartas.sort(() => 0.5 - Math.random());

    const painel = $(".board");
    let n = $("#numerotttv");
    
    let cartasEscolhidas = [];      // cartas escolhidas
    let cartasEscolhidasId = [];    // id das cartas escolhidas
    let cartasAcertadas = [];       // cartas acertadas
    let tentativas = 0;
    let tempoInicio;
    let giros = 0;                  // para realizar uma conta mais exata da duracao da partida
    
    function criarPainel(){
        for (let i = 0; i < cartas.length; i++){
            let carta = $("<img>").attr("src", baseUrl + "carta0.png")
                                    .attr("data-id", i)
                                    .click(girarCarta);
            $(".painel").append(carta);
        }
    }

    function girarCarta(){
        giros++;
        let cartaId = $(this).attr("data-id");
        cartasEscolhidas.push(cartas[cartaId].name);
        cartasEscolhidasId.push(cartaId);
        $(this).attr("src", cartas[cartaId].img);

        if (giros == 1){
            tempoInicio = new Date();
        }

        if (cartasEscolhidas.length === 2){
            tentativas++;
            n.html(tentativas);
            setTimeout(checarCombinacao, 300);
        }
    }

    function checarCombinacao() {
        const cartas = $("img");
        const opcao1_id = cartasEscolhidasId[0];
        const opcao2_id = cartasEscolhidasId[1];

        if (opcao1_id == opcao2_id) {
            cartas.eq(opcao1_id).attr("src", baseUrl + "carta0.png");
            cartas.eq(opcao2_id).attr("src", baseUrl + "carta0.png");
            alert("Você clicou na mesma imagem!");
        } else if (cartasEscolhidas[0] === cartasEscolhidas[1]) {
            cartas.eq(opcao1_id).off("click", girarCarta);
            cartas.eq(opcao2_id).off("click", girarCarta);
            cartasAcertadas.push(cartasEscolhidas);

            if (cartasAcertadas.length === cartas.length / 2) {
                alert("Você encontrou o ultimo par que faltava! Jogo Finalizado!")
                setTimeout(solicitarNome, 300);
            } else {
            alert("Você encontrou uma combinação!");
            }
            
        } else {
            cartas.eq(opcao1_id).attr("src", baseUrl + "carta0.png");
            cartas.eq(opcao2_id).attr("src", baseUrl + "carta0.png");
            alert("Não formou par!");
        }

        cartasEscolhidas = [];
        cartasEscolhidasId = [];

    }

    function solicitarNome(){
        const nomeJogador = prompt("Por favor, insira seu nome:")

        if (nomeJogador){
            $('#nome_jogador').val(nomeJogador);
            $('#quant_tentativas').val(tentativas);

            const tempoFim = new Date();
            const tempoDuracao = (tempoFim - tempoInicio) / 1000;
            $('#tempo_duracao').val(tempoDuracao);

            $('#formPartida').submit();
        } else {
            alert("Você precisa inserir um nome para salvar a partida!")
        }

    }

    criarPainel();

});