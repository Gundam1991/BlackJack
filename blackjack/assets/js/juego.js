// 2c =  Two of Clubs (Treboles)
// 2D = Two of Daimonds (Diamantes)
// 2H = Two of Hearts(Corazones)
// 2S = Two of Spades (Espadas)


//Funcion Anonima
(()=>{
    'use strict'
    
    let deck = [];
    const tipos = ["C", "D", "H", "S"];
    const especiales = ["A", "K", "Q","J"];

    // let puntosJugador = 0;
    // let puntosComputadora = 0;
    let puntosJugadores =[];

    //Referencias HTML
    const btnNuevo = document.querySelector('#btnNuevo');
    const btnPedir = document.querySelector('#btnPedir');
    const btnDetener = document.querySelector('#btnDetener');
    const puntosHTML= document.querySelectorAll('small');
    const divCartasJugador1 = document.querySelector('#jugador-cartas');
    const divCartasCompu = document.querySelector('#computador-cartas')
    
    //Funcion Inicia juego
    const inicializarJuego = (numJugadores= 2)=>{
        deck = crearDeck();
        for (let i = 0; i<numJugadores; i++){
            puntosJugadores.push(0);
        }
    }
    
    //Creacion Deck
    const crearDeck =()=>{
        deck =[];
        for(let i = 2; i <=10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }
        return deck=_.shuffle(deck);
    }  

    const pedirCarta = () =>{
        if( deck.length === 0 ){
            throw "No hay cartas";
        }
        return deck.pop();
    }

    const valorCarta = (carta) =>{
        const valor = carta.substring(0, carta.length -1);
        return (isNaN(valor)) ? 
            (valor==='A')  ? 11 : 10 
            : valor * 1;
    }

    //Turno 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos=(carta,turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //Turno computadora
    const turnoComputadora = (puntosMinimos) => {
        do{
            const carta = pedirCarta();
            acumularPuntos(carta,puntosJugadores.length-1);

            const imgCarta = document.createElement('img');
            imgCarta.src=`assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');

            divCartasCompu.append(imgCarta);
            if(puntosMinimos > 21){
                break;
            }
            

        }while((puntosJugadores[1] < puntosMinimos) && (puntosMinimos <= 21));
        
        setTimeout(()=>{   
        if(puntosJugadores[1] === puntosMinimos){
            alert('Nadie gana :( ');
        }else if(puntosMinimos > 21){
            alert('Computadora gana');
        }else if(puntosComputadora > 21){
            alert('Jugador Gana');
        }else{
            alert('Computadora Gana');
        }
        }, 20);
        

    }


    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);

        const imgCarta = document.createElement('img');
        imgCarta.src=`assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasJugador1.append(imgCarta);

        if(puntosJugador > 21){
            // alert('Lo siento, perdiste');
            btnPedir.disabled= true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);

        }else if(puntosJugador === 21){
            // alert('21, Genial!');
            btnPedir.disabled=true;
            btnDetener.disabled=true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener ('click', () => {
        btnPedir.disabled=true;
        btnDetener.disabled=true;
        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {
        console.clear();
        inicializarJuego();

        // deck=[];
        // deck = crearDeck();

        // puntosJugador = 0;
        // puntosComputadora=0;

        puntosHTML[0].innerText='0';
        puntosHTML[1].innerText='0';
        divCartasJugador1.innerHTML='';
        divCartasCompu.innerHTML='';
        btnPedir.disabled=false;
        btnDetener.disabled=false;

    });
    
})();



