let quantidadeCartas = null;
const itensBack = ['back1','back2','back3','back4','back5','back6','back7']
let conferirCartas = []
let acertos = null
let primeiraCarta = null
let segundaCarta = null
let jogadas = 0
let bloqueiaCartas = false


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
            <section class="card " onclick="virarCartas(this)" data-card="${listaGeradora[i]} data-identifier="card"">
                <div class="card__front" data-identifier="front-face"></div>
                <div class="card__back ${listaGeradora[i]}" data-identifier="back-face"></div>
            </section>
        `
    }
}

function virarCartas(carta) {
    if (bloqueiaCartas === true){
        return false

    }
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
    bloqueiaCartas = true
    let ehCorrespondente = primeiraCarta.dataset.card === segundaCarta.dataset.card

    if (!ehCorrespondente){
        setTimeout(()=>{
            desvirar(primeiraCarta)
            desvirar(segundaCarta) 
            primeiraCarta = null
            segundaCarta = null
            bloqueiaCartas= false
        }, 2000)
        
        
        jogadas += 2
    }else{
        primeiraCarta.classList.add("fixed")
        segundaCarta.classList.add("fixed")

        primeiraCarta = null
        segundaCarta = null
        bloqueiaCartas = false
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
        setTimeout( () => 
            {let jogarNovamente = prompt('Quer jogar novamente? Se quiser digite sim')
            if (jogarNovamente.toUpperCase() === 'SIM'){
                reiniciarJogo()
            }

        }, 2000)

    }
}

function reiniciarJogo(){
    // const resetarCartas  = document.querySelectorAll(".fixed")
    // for (let i = 0; i < resetarCartas.length; i++){
    //     resetarCartas[i].classList.remove('fixed')

    // }

    const secaoResetar = document.querySelector('.container')
    secaoResetar.innerHTML = ""
    
    // for(let i = 0; i < listaGeradora.length; i++){
    //     secao.innerHTML +=  `   
    //         <section class="card " onclick="virarCartas(this)" data-card="${listaGeradora[i]} data-identifier="card"">
    //             <div class="card__front" data-identifier="front-face"></div>
    //             <div class="card__back ${listaGeradora[i]}" data-identifier="back-face"></div>
    //         </section>
    //     `
    // }



    quantidadeCartas = null;
    let conferirCartas = []
    acertos = null
    primeiraCarta = null
    segundaCarta = null
    jogadas = 0
    bloqueiaCartas = false
    jogar()
    cartasNaMesa()
}

jogar()
cartasNaMesa()