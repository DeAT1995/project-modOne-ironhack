
//A SER FEITO

//começar o jogo -- ok
//inserir player na tela -- ok
// criar obstaculos aleatórios na tela
//criar o obstaculo 
//definir velocidade dos obstaculos

//rodar um tempo de cronometro
//rodar um score
//caso colidir 2x game over

//adicionar um evento de mpuse quando passar em cima dos li's para dar info sobre o jogo
//redigir orientações sobre o jogo no READ.me


window.onload = () => {
    document.getElementById("start-game").onclick = () => {
      startGame();
    };

    document.addEventListener("keydown", (event)=>{
        switch(event.key){
            case "ArrowDown":
                player.moveDown();
                break;
            case "ArrowUp":
                player.moveUp();
                break;
        }
    })


    function startGame() {
        player.draw();
        updateCanvas();
        obstacle.draw();
        
    }

    const canvas = document.getElementById("game-box");
    const ctx = canvas.getContext('2d');

    function updateCanvas(){
       clearCanvas();
        //verificar sobre o background , pois no exercicio da aula ele desenha o background , mas aqui eu nao tenho imagem predefinida de background
        player.draw();
        animationId = requestAnimationFrame(updateCanvas);
    }

    function clearCanvas(){
        ctx.clearRect(0,0, canvas.width, canvas.height);
    }

    class Emu {
        constructor(source, x, y, w, h){
            this.posX= x;
            this.posY= y;
            this.width= w;
            this.height=h;
            this.speed = 15;
//adicionei o speed ,velocidade do emu na tela 

            const img = new Image();
            img.src = source;
            img.onload =() => {
            this.img = img;
//            this.draw();
        }
        }
        draw(){
            ctx.drawImage(this.img,this.posX,this.posY,this.width,this.height);
        }
        moveDown(){
            if (this.posY > 10){
            this.posY -= this.speed;
            }
        }
        moveUp() {
            if (this.posY < 280) {
            this.posY += this.speed;
        }
        }
    }
    const player = new Emu('./images/emu.png' , 15,142,110,110);
/*
    class Obstacle {
        constructor(source,x, y, w, h){
            this.posX = x;
            this.posY = y;
            this.width = w;
            this.height = h;
            //this.speed =; //definir velocidade
        }
        draw(){
            ctx.drawImage(this.img,this.posX,this.posY,this.width,this.height);
        
    }

    const obstacle = new Obstacle('./images/pill-game.png', 100, 100, 50, 50);*/
}



//funcções que provavelmente existirão
//function clearCanvas(){} -- ok
//as teclas estão ao contrario, arrow up, ta levando pra baixo e arrow down pra cima 
//criar limite para o emu nao passar a tela -- ok
//updateCanvas(){}
