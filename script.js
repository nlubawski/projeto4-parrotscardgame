let quantidadeCartas = null;
const itensBack = ['back1','back2','back3','back4','back5','back6','back7']
let conferirCartas = []
let acertos = null
let primeiraCarta = null
let segundaCarta = null
let jogadas = 0


function jogar(){
    
    quantidadeCartas = parseInt(prompt("digite um numero par de cartas(entre 4 e 14) para jogar "))  
    while((quantidadeCartas % 2 !== 0) | (quantidadeCartas < 4) | (quantidadeCartas > 14)){
        quantidadeCartas = parseInt(prompt("digite um numero par de cartas(entre 4 e 14) para jogar "))
    }
    acertos = quantidadeCartas/2
    alert(quantidadeCartas)
}

function embaralhar() { 
	return Math.random() - 0.5; 
}


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
            <section class="card " onclick="virarCartas(this)" data-card="${listaGeradora[i]}">
                <div class="card__front"></div>
                <div class="card__back ${listaGeradora[i]}"></div>
            </section>
        `
    }
}

function virarCartas(carta) {
    carta.querySelector(".card__front").classList.toggle("turn__front")
    carta.querySelector(".card__back").classList.toggle("turn__back")
    
    if(!primeiraCarta){
        primeiraCarta = carta 
        return false
    }

    segundaCarta = carta
    correspondencia(primeiraCarta, segundaCarta)
}

function correspondencia(){
    let ehCorrespondente = primeiraCarta.dataset.card === segundaCarta.dataset.card

    if (!ehCorrespondente){
        setTimeout(()=>{
            desvirar(primeiraCarta)
            desvirar(segundaCarta) 
            primeiraCarta = null
            segundaCarta = null
        }, 2000)
        
        
        jogadas += 2
    }else{
        primeiraCarta.classList.add("fixed")
        segundaCarta.classList.add("fixed")

        primeiraCarta = null
        segundaCarta = null
        jogadas +=2
        acertos -= 1
        conferirSeGanhou()

    }
}

function desvirar(carta){
    const primeiraFrente = carta.querySelector(".card__front")
    primeiraFrente.classList.remove("turn__front")

    const primeiraVerso = carta.querySelector(".card__back")
    primeiraVerso.classList.remove("turn__back")
}

function conferirSeGanhou(){
    if (acertos === 0){
        setTimeout( () => {alert(`Você ganhou em ${jogadas} jogadas!`)}, 1000)
    }
}

jogar()
cartasNaMesa()