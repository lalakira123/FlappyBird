const sprites = new Image();
sprites.src = "./sprites/sprites.png";

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
            sprites, //imagem
            planoDeFundo.spriteX, planoDeFundo.spriteY, //Distância referente ao Source Image
            planoDeFundo.largura, planoDeFundo.altura, //Tamanho do recorte na sprite
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y, //Posiciona a imagem no canva
            planoDeFundo.largura, planoDeFundo.altura //Tamanho da imagem dentro do canva
        );
    }
}

// [Chão]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites, //imagem
            chao.spriteX, chao.spriteY, //Distância referente ao Source Image
            chao.largura, chao.altura, //Tamanho do recorte na sprite
            chao.x, chao.y, //Posiciona a imagem no canva
            chao.largura, chao.altura //Tamanho da imagem dentro do can      
        );

        contexto.drawImage(
            sprites, //imagem
            chao.spriteX, chao.spriteY, //Distância referente ao Source Image
            chao.largura, chao.altura, //Tamanho do recorte na sprite
            (chao.x + chao.largura), chao.y, //Posiciona a imagem no canva
            chao.largura, chao.altura //Tamanho da imagem dentro do can      
        );
    }
}

// [Flappy Bird]
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    desenha() { // O próprio objeto irá chamar o desenho do Objeto
        contexto.drawImage(
            sprites, //imagem
            flappyBird.spriteX, flappyBird.spriteY, //Distância referente ao Source Image
            flappyBird.largura, flappyBird.altura, //Tamanho do recorte na sprite
            flappyBird.x, flappyBird.y, //Posiciona a imagem no canva
            flappyBird.largura, flappyBird.altura //Tamanho da imagem dentro do canva
        );
    }
}

// FPS 
function loop() {
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();

    requestAnimationFrame(loop); //Desenha os quadros na tela
}

loop();


