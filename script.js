let quantidadeCartas = null;
function jogar(){
    
    quantidadeCartas = parseInt(prompt("digite um numero par de cartas(entre 4 e 14) para jogar "))  
    while((quantidadeCartas % 2 !== 0) | (quantidadeCartas < 4) | (quantidadeCartas > 14)){
        quantidadeCartas = parseInt(prompt("digite um numero par de cartas(entre 4 e 14) para jogar "))
    }

    alert(quantidadeCartas)
}