let frames = 0;
let contador = 0;
const sprites = new Image();
sprites.src = "./sprites/sprites.png";

const efeitoSonoroBateu = new Audio();
efeitoSonoroBateu.src = "./sound_effect/efeitos_hit.wav";

const efeitoSonoroPulo = new Audio();
efeitoSonoroPulo.src = "./sound_effect/efeitos_pulo.wav"

const canvas = document.querySelector("canvas");
const contexto = canvas.getContext("2d"); // Criação de um Objeto definindo a Bidimensionaldiade

// [Plano de Fundo]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() { // O próprio objeto irá chamar o desenho do Objeto
        contexto.fillStyle = "#70C5CE"
        contexto.fillRect(0, 0, canvas.width, canvas.height) // Os dois primeiros parâmetros pega a primeira posição, e os outros dois puxa para o tamanho desejado
        
        contexto.drawImage(
            sprites, //imagem
            planoDeFundo.spriteX, planoDeFundo.spriteY, //Distância referente ao Source Image
            planoDeFundo.largura, planoDeFundo.altura, //Tamanho do recorte na sprite
            planoDeFundo.x, planoDeFundo.y, //Posiciona a imagem no canva
            planoDeFundo.largura, planoDeFundo.altura //Tamanho da imagem dentro do canva
        );

        contexto.drawImage(
            sprites, 
            planoDeFundo.spriteX, planoDeFundo.spriteY, 
            planoDeFundo.largura, planoDeFundo.altura, 
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, 
            planoDeFundo.largura, planoDeFundo.altura 
        );
    }
}

// [Chão]
function criaChao() {
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 112,
        x: 0,
        y: canvas.height - 112,
        atualiza() {
            const movimentoChao = 1;
            const repeticao = chao.largura / 2;
            const movimentacao = chao.x - movimentoChao;
            chao.x = movimentacao % repeticao; //Fórmula de repetição
        },
        desenha() {
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY, 
                chao.largura, chao.altura, 
                chao.x, chao.y, 
                chao.largura, chao.altura       
            );
    
            contexto.drawImage(
                sprites, 
                chao.spriteX, chao.spriteY, 
                chao.largura, chao.altura, 
                (chao.x + chao.largura), chao.y, 
                chao.largura, chao.altura       
            );
        }
    };

    return chao;
}

function colide(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;
    
    if(flappyBirdY >= chaoY) {
        return true;
    }

    return false;
}

// [Flappy Bird]
function criaFlappyBird() {
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        pula() {
            flappyBird.velocidade = - flappyBird.pulo
        },
        gravidade: 0.25,
        velocidade: 0,
        atualiza() {
            if(colide(flappyBird, globais.chao)) {
                efeitoSonoroBateu.play();
                setTimeout(() => {
                    mudaDeTela(tela.inicio);
                },500);
                return;
            }
    
            flappyBird.velocidade += flappyBird.gravidade 
            flappyBird.y += flappyBird.velocidade
        },
        movimentos: [
            {spriteX: 0, spriteY: 0},
            {spriteX: 0, spriteY: 26},
            {spriteX: 0, spriteY: 52},
            {spriteX: 0, spriteY: 26}
        ],
        frameAtual: 0,
        atualizaFrameAtual() {
            const intervaloFrame = 10;
            const passouIntervalo = frames % intervaloFrame === 0;

            if(passouIntervalo) {
            const baseIncremento = 1;
            const incremento = baseIncremento + flappyBird.frameAtual;
            const baseRepeticao =  flappyBird.movimentos.length;
            flappyBird.frameAtual = incremento % baseRepeticao;
            }
        },
        desenha() { 
            flappyBird.atualizaFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites, 
                spriteX, spriteY, 
                flappyBird.largura, flappyBird.altura, 
                flappyBird.x, flappyBird.y, 
                flappyBird.largura, flappyBird.altura 
            );
        }
    }

    return flappyBird;
}

// [Canos]
function criaCanos() {
    const canos = {
        largura: 52,
        altura: 400,
        chao: {
            spriteX: 0,
            spriteY: 169
        },
        ceu: {
            spriteX: 52,
            spriteY: 169
        },
        espaco: 80,
        desenha() {
            canos.pares.forEach( function(par) {
                const yRandom = par.y;
                const espacamento = 90;

                // [Cano Céu]
                const canoCeuX = par.x;
                const canoCeuY = yRandom;
                contexto.drawImage(
                    sprites,
                    canos.ceu.spriteX, canos.ceu.spriteY,
                    canos.largura, canos.altura,
                    canoCeuX, canoCeuY,
                    canos.largura, canos.altura
                )
                
                // [Cano Chão]
                const canoChaoX = par.x;
                const canoChaoY = canos.altura + espacamento + yRandom;
                contexto.drawImage(
                    sprites,
                    canos.chao.spriteX, canos.chao.spriteY,
                    canos.largura, canos.altura,
                    canoChaoX, canoChaoY,
                    canos.largura, canos.altura
                )

                par.canoCeu = {
                    x:canoCeuX,
                    y:canos.altura + canoCeuY
                }
                par.canoChao = {
                    x:canoChaoX,
                    y:canoChaoY
                }
            })
        },
        colisao(par) {
            if(globais.flappyBird.x >= par.x) {
                const cabecaDoFlappy = globais.flappyBird.y;
                const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura 

                if(cabecaDoFlappy <= par.canoCeu.y) {
                    contador = 0;
                    return true;
                }

                if(peDoFlappy >= par.canoChao.y) {
                    contador = 0;
                    return true;
                }             
            } 

            if(globais.flappyBird.x === par.x) {
                contador++;
            }
        },
        pares: [],
        atualiza() {
            const passou100Frames = frames % 100 === 0
            if (passou100Frames) {
                canos.pares.push({
                    x: canvas.width,
                    y: -150 * (Math.random() + 1)
                })
            }

            canos.pares.forEach( function(par) {
                par.x = par.x - 2;

                if(canos.colisao(par)) {
                    efeitoSonoroBateu.play();
                    mudaDeTela(tela.inicio);
                }

                if(par.x + canos.largura <= 0) {
                    canos.pares.shift() //Exclui o primeiro elemento da lista para não lotar a memória do usuário
                }
            })
        }
    }

    return canos;
}

// [Começar o Game]
const telaReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width/2) - 174/2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites, 
            telaReady.spriteX, telaReady.spriteY, 
            telaReady.largura, telaReady.altura, 
            telaReady.x, telaReady.y, 
            telaReady.largura, telaReady.altura    
        );
    }
}

// [Placar]
function criaPlacar() {
    const placar = {
        pontuacao: 0,
        desenha() {
            contexto.font = '55px "VT323"';
            contexto.fillStyle = 'white';
            contexto.fillText(`${placar.pontuacao}`, canvas.width/2 - 10, 100);
        },
        atualiza() {
            placar.pontuacao = parseInt(contador);
        }
    }
    return placar;
}

// [Telas]
const globais = {};
let telaAtiva = {};

function mudaDeTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa) {
        telaAtiva.inicializa();
    }
}

const tela = {
    inicio: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
            globais.canos = criaCanos();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            globais.chao.desenha();
            telaReady.desenha();
        },
        click() {
            mudaDeTela(tela.jogo);
        },
        atualiza() {
            globais.chao.atualiza();
        }
    },
    jogo: {
        inicializa() {
            globais.placar = criaPlacar();
        },
        desenha() {
            planoDeFundo.desenha();
            globais.canos.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha();
            globais.placar.desenha();
        },
        click() {
            efeitoSonoroPulo.play();
            globais.flappyBird.pula();
        },
        atualiza() {
            globais.canos.atualiza();
            globais.flappyBird.atualiza();
            globais.chao.atualiza();
            globais.placar.atualiza();
        }
    }
}

// [FPS] 
function loop() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    frames++;
    requestAnimationFrame(loop); //Desenha os quadros na tela
}

window.addEventListener("click", function() {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaDeTela(tela.inicio)
loop();


