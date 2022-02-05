let quantidadeCartas = null;
const itensBack = ['back1','back2','back3','back4','back5','back6','back7']
let conferirCartas = []
let acertos = null
let primeiraCarta = null
let segundaCarta = null


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
    carta.classList.add('fixed')

    if(!primeiraCarta){
        primeiraCarta = carta 
        return false
    }

    segundaCarta = carta
    correspondencia()
}

function correspondencia(){
    let ehCorrespondente = primeiraCarta.dataset.card === segundaCarta.dataset.card
    console.log(ehCorrespondente)
}



// function verificaIgualdade(carta){
    
//     for(let i=0;i < itensBack.length ;i++){
//         if (carta.querySelector('.' + itensBack[i]) !== null){
//             conferirCartas.push(itensBack[i])
//         }
//     }
//     if (conferirCartas.length == 2){
//         if (conferirCartas[0] !== conferirCartas[1]){
//             const card1 = document.querySelector(' .'+ conferirCartas[0]).parentNode
//             card2.classList.remove("fixed")
            
//             const card2 = carta.querySelector(' .'+ conferirCartas[1]).parentNode
//             card2.classList.remove("fixed")
//             acertos -= 1
//             //conferirSeGanhou()
            
            
//         }
//         conferirCartas = []    
            
//     }
    
//     else{
//         setTimeout(() => {
//             let card1 = document.querySelector(' .'+ conferirCartas[0] + '.turn__back')
//             if (card1 !== null){
//                 card1 = card1.parentNode
//                 virarCartas(card1)
//             }
//             let card2 = document.querySelector(' .'+ conferirCartas[1] + '.turn__back')
//             if (card2 !== null){
//                 card2 = card2.parentNode
//                 virarCartas(card2)
//             }
//         },1000)
//         //setTimeout(()=>{conferirCartas=[]}, 2000)


//     }
// }

function conferirSeGanhou(){
    if (acertos === 0){
        setTimeout( () => {alert('Você ganhou em X jogadas!')}, 1000)
    }

}

jogar()
cartasNaMesa()