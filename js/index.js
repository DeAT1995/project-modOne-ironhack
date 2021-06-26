
//A SER FEITO

//começar o jogo -- ok
//inserir player na tela -- ok
//criar o obstaculo 
// criar obstaculos aleatórios na tela
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
            case "ArrowUp":
                player.moveDown();
                break;
            case "ArrowDown":
                player.moveUp();
                break;
        }
    })


    function startGame() {
        player.draw();
        updateCanvas();
       // createObstacle.draw();
       //obstacleCloroquina.draw();
        //obstacleVirus.draw(); 
        updateObstacles();

    }

    const canvas = document.getElementById("game-box");
    const ctx = canvas.getContext('2d');
    let frames = 0;


    function updateCanvas(){
        frames += 1;
       clearCanvas();
        player.draw();
        //obstacleCloroquina.draw();
        //obstacleVirus.draw();
        updateObstacles();

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

    /*class Obstacle {
        constructor(x){
            this.x = 900;
            this.y = y;
            this.width = w;
            this.height = h;
        }

        createObstacle(){
            this.imgPill = new Image();
            this.imgPill.src = './images/pill-game.png';
            context.drawImage(this.imgPill, this.x, this.y, this.width, this.height);
        }


    }*/


    class Obstacle {
        constructor(source, x, y, w, h){
            this.posX= x;
            this.posY= y;
            this.width= w;
            this.height=h;
            this.speed = 10;

            const img = new Image();
            img.src = source;
            img.onload =() => {
            this.img = img;
            }
        }

        draw(){
            ctx.drawImage(this.img,this.posX,this.posY,this.width,this.height);
        }
        
        move(){
            //como passar mais de uma coordenada (x e y) para o obstacle ??
            this.posX -= this.speed;
        }
    }

    const obstacles = [];

    const obstacleCloroquina = new Obstacle('./images/medicini-icon-pill.png' , 900, 0, 100, 100);
    const obstacleVirus = new Obstacle('./images/virus-icon.png' , 900, 200, 50, 50);
    //const obstacleVacina = new Obstacle('./images/vaccine-icon.png' , 700, 200, 100, 100);

    function createObstacle(){
        const eixoX = 1000;//final do canvas
        let eixoY = Math.floor(Math.random() * 400); //variável, número aleatorio multiplicado pelo tamanho do canvas no eixo y

        obstacles.push(new Obstacle('./images/medicini-icon-pill.png' , eixoX, eixoY, 100, 100)); // ver como criar para mais de um obstaculo, pois na atividade do car ele tinha apenas um tipo de obstaculo
        obstacles.push(new Obstacle('./images/virus-icon.png' , eixoX, eixoY, 50, 50));
        obstacles.push(new Obstacle('./images/vaccine-icon.png' , eixoX, eixoY, 100, 100));    
    }

    function updateObstacles(){
        obstacles.forEach((obstacle) =>{
            console.log(obstacle)
        obstacle.move();
        obstacle.draw([0]);
        })

        if (frames % 80 === 0){ //parece que mesmo eu editando o valor continua a mesma velocidade
            createObstacle();
        }
    }
}



//funcções que provavelmente existirão
//function clearCanvas(){} -- ok
//as teclas estão ao contrario, arrow up, ta levando pra baixo e arrow down pra cima  --OK
//criar limite para o emu nao passar a tela -- ok
//updateCanvas(){} -- OK
//colidir com um obstaculo
//pontuação de acordo com o obstaculo
//score do jogo
