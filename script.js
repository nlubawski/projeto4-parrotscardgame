let quantidadeCartas = null;
function jogar(){
    
    quantidadeCartas = parseInt(prompt("digite um numero par de cartas(entre 4 e 14) para jogar "))  
    while((quantidadeCartas % 2 !== 0) | (quantidadeCartas < 4) | (quantidadeCartas > 14)){
        quantidadeCartas = parseInt(prompt("digite um numero par de cartas(entre 4 e 14) para jogar "))
    }

    alert(quantidadeCartas)
}

function embaralhar() { 
	return Math.random() - 0.5; 
}

const itensBack = ['back1','back2','back3','back4','back5','back6','back7']
function gerarCartas(){
    const lista = []
    const listaGeradora = []
    itensBack.sort(embaralhar)
    let i = 0
    while(i < quantidadeCartas/2){
        lista.push(itensBack[i])
        i++
    }
    for(let i = 0; i < lista.length; i++){
        listaGeradora.push(lista[i])
        listaGeradora.push(lista[i])
    }

    return listaGeradora.sort(embaralhar)
}

function cartasNaMesa(){
    const listaGeradora = gerarCartas()
    const secao = document.querySelector('.container')
    
    for(let i = 0; i < listaGeradora.length; i++){
        secao.innerHTML +=  `   
            <section class="card " onclick="virarCartas(this)">
                <div class="card__front"></div>
                <div class="card__back ${listaGeradora[i]}"></div>
            </section>
        `
    }
}


function virarCartas(carta) {
    carta.querySelector(".card__front").classList.toggle("turn__front");
    carta.querySelector(".card__back").classList.toggle("turn__back");
}

jogar()
cartasNaMesa()