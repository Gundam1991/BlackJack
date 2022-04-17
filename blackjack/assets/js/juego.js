//Funcion Anonima
const miModulo=(()=>{
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
    const divCartasJugadores = document.querySelectorAll('.divCartas');
    const puntosHTML= document.querySelectorAll('small');
    // const divCartasJugador1 = document.querySelector('#jugador-cartas');
    // const divCartasCompu = document.querySelector('#computador-cartas')
    
    //Funcion Inicia juego
    const inicializarJuego = (numJugadores= 2)=>{
        deck = crearDeck();
        puntosJugadores = [];

        for (let i = 0; i<numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '')
        btnPedir.disabled=false;
        btnDetener.disabled=false;
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
    const acumularPuntos = (carta, turno)=>{
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    //Turno computadora

    const crearCarta = (carta, turno) =>{
        const imgCarta = document.createElement('img');
            imgCarta.src=`assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append(imgCarta);
    }

    const determinarGanador = () =>{
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        setTimeout(()=>{   
            if(puntosComputadora === puntosMinimos){
                alert('Nadie gana :( ');
            }else if(puntosMinimos > 21){
                alert('Computadora gana');
            }else if(puntosComputadora > 21){
                alert('Jugador Gana');
            }else{
                alert('Computadora Gana');
            }
            }, 100);
    }

    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do{
            const carta = pedirCarta();
            puntosComputadora =  acumularPuntos(carta, puntosJugadores.length -1);
            crearCarta(carta, puntosJugadores.length -1);

        }while( puntosComputadora < puntosMinimos && puntosMinimos <= 21);

        determinarGanador();
         
    }


    //Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta,0);
        crearCarta(carta,0);

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
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return{
        nuevoJuego: inicializarJuego
    }
    
})();



