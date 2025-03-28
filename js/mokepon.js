const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
let botonFuego;
let botonAgua;
let botonTierra;
const botonReiniciar = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')

let ataquesEnemigo = []
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3
let vidasEnemigo = 3
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let mascotaJugador;
let personajeJugador;
let personajeEnemigo;
let ataquesJugador = [];
let ataquesMokeponEnemigo = []
let intervalo;

let mapaBackground = new Image();
mapaBackground.src = './assets/mokemap.png'

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa');


const anchoMaximoMapa = 892;

let lienzo = mapa.getContext("2d");


let mokepones = []
let botones;
let indexAtaqueJugador
let indexAtaqueEnemigo

class Mokepon {

    constructor(nombre, foto, vida, fotoMapa) {
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = [];
        this.ancho = 80;
        this.alto = 80;
        this.x = aleatorio(0, mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto); 
        this.urlFoto = fotoMapa;
        this.mapaFoto = new Image()
        this.mapaFoto.src = this.urlFoto;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMokepon() {

        lienzo.drawImage(
            this.mapaFoto, 
            this.x, 
            this.y, 
            this.ancho, this.alto);

    }

}

let hipodoge = new Mokepon('Hipodoge', 
    './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png');

hipodoge.ataques.push(
  {
    nombre: 'Cañon de agua 💧',
    type: 'agua'
  },
  {
    nombre: 'Corte de agua 💧',
    type: 'agua'
  },
  {
    nombre: 'Remolino de agua 💧',
    type: 'agua'
  },
  {
    nombre: 'Remolino de fuego🔥',
    type: 'fuego'
  },
  {
    nombre: 'Barrera de tierra 🌱',
    type: 'tierra'
  }
);

let capipepo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.webp');

capipepo.ataques.push(
    {
      nombre: 'Arena movediza🌱',
      type: 'tierra'
    },
    {
      nombre: 'Metoros 🌱',
       type: 'tierra'
    },
    {
        nombre: 'Terremoto 🌱',
        type: 'tierra'
    },
    {
      nombre: 'Latigo de agua 💧',
      type: 'agua'
    },
    {
      nombre: 'Cañon de fuego 🔥',
      type: 'fuego'
    }
  );

let ratigueya = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png');

ratigueya.ataques.push(
    {
      nombre: 'Prisión de agua 💧',
      type: 'agua'
    },
    {
        nombre: 'Llamarada 🔥',
        type: 'fuego'
    },
    {
        nombre: 'Cola de fuego 🔥',
        type: 'fuego'
    },
    {
      nombre: 'Tornado de fuego 🔥',
      type: 'fuego'
    },
    {
      nombre: 'Prisión de tierra 🌱',
      type: 'tierra'
    }
  );

mokepones.push(hipodoge, capipepo, ratigueya);

/*
let hipodogeEnemigo = new Mokepon('Hipodoge', 
    './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png', 80, 120);

let capipepoEnemigo = new Mokepon('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png', 5, './assets/capipepo.webp', 80, 120);

let ratigueyaEnemigo = new Mokepon('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png', 80, 120);
 */

function iniciarJuego() {

    sectionSeleccionarAtaque.style.display = 'none'
    sectionReiniciar.style.display = 'none'    
    sectionVerMapa.style.display = 'none'

    const cardContainer = document.getElementById('contenedor-tarjetas');
    let opcionMokepones;

    mokepones.forEach((mokepon) => {
        opcionMokepones = `
          <div>
             <input type="radio" name="mascota" id="${mokepon.nombre.toLowerCase()}" />
             <label class="tarjeta-de-mokepon" for="${mokepon.nombre.toLowerCase()}">
             <p>${mokepon.nombre}</p>
            <img
              src="${mokepon.foto}"
              alt="${mokepon.nombre}"
            />
          </label>
          </div>
        `;
        cardContainer.innerHTML += opcionMokepones;
    })

    inputHipodoge = document.getElementById('hipodoge')
    inputCapipepo = document.getElementById('capipepo')
    inputRatigueya = document.getElementById('ratigueya')
    
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener('click', reiniciarJuego)


}

function seleccionarMascotaJugador() {
    
    let seleccionaMascota = false;

    if (inputHipodoge.checked) {

        seleccionaMascota = true;
        spanMascotaJugador.innerHTML = 'Jugador: ';
        spanMascotaJugador.innerHTML += inputHipodoge.id
        mascotaJugador = inputHipodoge.id;

    } else if (inputCapipepo.checked) {

        seleccionaMascota = true;
        spanMascotaJugador.innerHTML = 'Jugador: ';
        spanMascotaJugador.innerHTML += inputCapipepo.id
        mascotaJugador = inputCapipepo.id;

    } else if (inputRatigueya.checked) {

        seleccionaMascota = true;
        spanMascotaJugador.innerHTML = 'Jugador: ';
        spanMascotaJugador.innerHTML += inputRatigueya.id
        mascotaJugador = inputRatigueya.id;

    }

    if(seleccionaMascota === true) {

        personajeJugador = mokepones.find((item) => {
            return item.nombre.toLowerCase() === mascotaJugador;
        });

        sectionSeleccionarMascota.style.display = 'none'
    
        sectionVerMapa.style.display = 'flex';

        iniciarMapa();
    
        // lienzo.fillRect(5, 15, 20, 40);
    
        spanVidasEnemigo.innerHTML = victoriasEnemigo;
        spanVidasJugador.innerHTML = victoriasJugador;
    
        extraerAtaques(mascotaJugador)
        seleccionarMascotaEnemigo()
    }
    else {
        alert('Selecciona una mascota')
    }

 
}

function iniciarMapa() {

    // mapa.width = 800;
    // mapa.height = 600;


    intervalo = setInterval(pintarCanvas, 50);

    window.addEventListener('keydown', manejarTeclaPresionada)
    window.addEventListener('keyup', detenerMovimiento)
    
}

function manejarTeclaPresionada(event) {

    // Valida que las coordenadas del mokepon no se salga del mapa

        switch(event.key) {
            case 'ArrowUp' :

                   if( (personajeJugador.y - personajeJugador.alto + 10) > 0) {
                    moverArriba();
                   } else {
                      detenerMovimiento();
                   }
                
              break;
            case 'ArrowDown' :

                  if( (personajeJugador.y + personajeJugador.alto + 10) < mapa.height ) {
                      moverAbajo();
                  } else {
                    detenerMovimiento();
                  }

              break;
            case 'ArrowLeft' :
                if((personajeJugador.x - personajeJugador.ancho + 10) > 0) {
                    moverIzquierda();
                } else {
                    detenerMovimiento();
                }
                   
              break;
            case 'ArrowRight' :
                   if((personajeJugador.x + personajeJugador.ancho + 10) < mapa.width) {
                       moverDerecha();
                   } else {
                    detenerMovimiento();
                   }
              break;
    
        }

    
    

}

function extraerAtaques(nombreMascota) {

    let mokeponJugador = mokepones.find((item) => {
        return item.nombre.toLowerCase() === nombreMascota;
    });

    mostrarAtaques(mokeponJugador.ataques);

}

function mostrarAtaques(ataques) {
    
    let opcionAtaques = '';

    const accionesContainer = document.getElementById('acciones-container');

    ataques.forEach((item) => {

        opcionAtaques = `
          <button class="btn-attack">${item.nombre}</button>
        `;

        accionesContainer.innerHTML += opcionAtaques;

    })

    botones = document.querySelectorAll('.btn-attack');
    secuenciaAtaque();


}

function secuenciaAtaque() {
    botones.forEach((item) => {
        item.addEventListener('click', (e) => {

            let textContent = e.target.textContent;
            textContent = textContent.substring(textContent.length - 2, textContent.length);

            if(textContent === '💧'){
                ataquesJugador.push('AGUA');
                item.style.background = '#112f58';
            }
            else if(e.target.textContent === '🌱'){
                ataquesJugador.push('TIERRA');
                item.style.background = '#112f58';
            } else {
                ataquesJugador.push('FUEGO');
                item.style.background = '#112f58';
            }

            item.disabled = true;

            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo() {
    let mascotaAleatoria = aleatorio(1, mokepones.length) - 1
    let mascotaAleatoriaItem = mokepones[mascotaAleatoria];
    
    spanMascotaEnemigo.innerHTML = 'PC: ' + mokepones[mascotaAleatoria].nombre;

    personajeEnemigo = new Mokepon(
        mascotaAleatoriaItem.nombre,
        mascotaAleatoriaItem.foto,
        mascotaAleatoriaItem.vida,
        mascotaAleatoriaItem.urlFoto,
        mascotaAleatoriaItem.x,
        mascotaAleatoriaItem.y
    );

    personajeEnemigo.x = 350;
    personajeEnemigo.y = 120;

    console.log('Enemigo:', personajeEnemigo)
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    // secuenciaAtaque()

}

function ataqueAleatorioEnemigo() {
    let ataqueAleatorio = aleatorio(1, ataquesMokeponEnemigo.length) - 1
    
    if (ataqueAleatorio === 0 || ataqueAleatorio === 1) {
        ataquesEnemigo.push('FUEGO');
    } else if (ataqueAleatorio === 2 || ataqueAleatorio === 3) {
        ataquesEnemigo.push('AGUA')
    } else {
        ataquesEnemigo.push('TIERRA')
    }

    iniciarPelea();
   // combate()
}

function iniciarPelea() {
    
    if(ataquesJugador.length === 5) {
        combate();
    }


}

function indexAmbosOponentes(posicion) {
    indexAtaqueJugador = ataquesJugador[posicion];
    indexAtaqueEnemigo = ataquesEnemigo[posicion];
    console.log('Index jugador', indexAtaqueJugador)
    console.log('Index enemigo', indexAtaqueEnemigo)
}

function combate() {

    // Pendiente ya que ahora son arreglos
    for(let k=0; k < ataquesJugador.length; k++) {

        if(ataquesEnemigo[k] === ataquesJugador[k]) {

            indexAmbosOponentes(k);
            crearMensaje("EMPATE");

        } else if(ataquesEnemigo[k] == 'FUEGO' && ataquesJugador[k] == 'TIERRA') {
            indexAmbosOponentes(k);
            crearMensaje("GANASTE")
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador

        } 

        else if(ataquesJugador[k] == 'AGUA' && ataquesEnemigo[k] == 'FUEGO') {
            indexAmbosOponentes(k);
            crearMensaje("GANASTE")
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador;
        }

        else if(ataquesJugador[k] == 'TIERRA' && ataquesEnemigo[k] == 'AGUA') {
            indexAmbosOponentes(k);
            crearMensaje("GANASTE")
            victoriasJugador++;
            spanVidasJugador.innerHTML = victoriasJugador

        } else {
            indexAmbosOponentes(k);
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }

    }

    revisarVictorias()
}

function revisarVictorias() {
    if(victoriasEnemigo === victoriasJugador) {
        crearMensajeFinal("Empataron!")
    } else if (victoriasEnemigo > victoriasJugador) {
        crearMensajeFinal('Lo siento, perdiste :(')
    } else {
        crearMensajeFinal("FELICITACIONES! Ganaste :)")
    }
}


function crearMensaje(resultado) {
    

    
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;
    
    // sectionMensajes.appendChild(notificacion);
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
    
    
    sectionMensajes.innerHTML = resultadoFinal

    /* botones.forEach((item) => {
        item.disabled = true;
    }) */

    
    sectionReiniciar.style.display = 'block'
}

function reiniciarJuego() {
    location.reload()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarCanvas() {

    let anchoMapa = sectionVerMapa.getBoundingClientRect().width  - 20;
    

    if(anchoMapa > anchoMaximoMapa) {
      anchoMapa = anchoMaximoMapa - 20;
    } 

    let alturaMapa = (anchoMapa * 600) / 800;

    mapa.width = anchoMapa;
    mapa.height = alturaMapa;

    personajeJugador.x += personajeJugador.velocidadX;
    personajeJugador.y += personajeJugador.velocidadY;
    
    lienzo.clearRect(0, 0, mapa.width, mapa.height);

    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )

    personajeJugador.pintarMokepon();

    // Pintar enemigo
    personajeEnemigo.pintarMokepon();

    if(personajeJugador.velocidadX !== 0 || personajeJugador.velocidadY !== 0) {
        revisarColision(personajeEnemigo);
    }


}

function moverArriba() {
 
    personajeJugador.velocidadY = -5;
    // personajeJugador.y -= 5;

    // pintarCanvas();

}


function moverAbajo() {
    personajeJugador.velocidadY = 5;
    // personajeJugador.y += 5;

   // pintarCanvas();

}

function moverDerecha() {

    personajeJugador.velocidadX = 5;    
    // personajeJugador.x += 5;

    // pintarCanvas();

}

function moverIzquierda() {

    personajeJugador.velocidadX = -5;
   // personajeJugador.x -= 5;

   // pintarCanvas();

}

function detenerMovimiento() {
    personajeJugador.velocidadX = 0;
    personajeJugador.velocidadY = 0;
}

function revisarColision(enemigo) {

    const arribaEnemigo = enemigo.y;
    const abajoEnemigo = enemigo.y + enemigo.alto;
    const derechaEnemigo = enemigo.x + enemigo.ancho;
    const izquierdaEnemigo = enemigo.x;
    
    const arribaMascota = personajeJugador.y;
    const abajoMascota = personajeJugador.y + personajeJugador.alto;
    const derechaMascota = personajeJugador.x + personajeJugador.ancho;
    const izquierdaMascota = personajeJugador.x;
    

    if(abajoMascota < arribaEnemigo ||
       arribaMascota > abajoEnemigo ||
       derechaMascota < izquierdaEnemigo || 
       izquierdaMascota > derechaEnemigo
    ) {

        return;

    } else {
        // Si hubo una colisión
        detenerMovimiento();
        clearInterval(intervalo);
        sectionSeleccionarAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'none';

        
    }

  
    

}

window.addEventListener('load', iniciarJuego)