
//A SER FEITO

//começar o jogo -- ok
//inserir player na tela -- ok
//criar o obstaculo --ok
// criar obstaculos aleatórios na tela -- ok
//definir velocidade dos obstaculos --ok

//arrumar os obstaculos --ok
    //vacina soma ponto
    //cloroquina GAME OVER --ok
//rodar um score


//adicionar um evento de mpuse quando passar em cima dos li's para dar info sobre o jogo
//redigir orientações sobre o jogo no README.md


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
        updateObstacles();
        score();
    }

    const canvas = document.getElementById("game-box");
    const ctx = canvas.getContext('2d');
    let frames = 0;
    let animationId = null; 

    function updateCanvas(){
        frames += 1;
        clearCanvas();
        player.draw();
       // score();
        updateObstacles();
        //score();
        animationId = requestAnimationFrame(updateCanvas);
        checkGameOver();
        checkVacine();
        

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

            const img = new Image();
            img.src = source;
            this.img = img;

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

        top(){
            return this.posY;
        }

        bottom(){
            return this.posY+ this.height;
        }

        left(){
            return this.posX;
        }

        right(){
            return this.posX + this.width;
        }
        
       
        crashWith(obstacle) {
            return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstacle.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right());
          }
    }
    const player = new Emu('./images/emu.png' , 15,142,90,90);


    class Obstacle {
        constructor(source, x, y, w, h){
            this.posX= x;
            this.posY= y;
            this.width= w;
            this.height=h;
            this.speed = 3;

            const img = new Image();
            img.src = source;
            this.img = img;
            
        }

        draw(){
            ctx.drawImage(this.img,this.posX,this.posY,this.width,this.height);
        }
        
        move(){
            this.posX -= this.speed;
        }
        top(){
            return this.posY;
        }

        bottom(){
            return this.posY+ this.height;
        }

        left(){
            return this.posX;
        }

        right(){
            return this.posX + this.width;
        }
    }

    const obstacleCloroquina = [];
    const obstacleVacina = [];
    const obstacles = [];

    
    function createObstacle(){
        const eixoX = 1000;//final do canvas
        let eixoY = Math.floor(Math.random() * 400); //variável, número aleatorio multiplicado pelo tamanho do canvas no eixo y

        let numberVar = Math.floor(Math.random()*400); // variável para criar um número aleatório para poder revesar os obstaculos a serem apresnetados na tela 
        
        if ( numberVar % 2) {
         return obstacleVacina.push(new Obstacle('./images/vaccine-icon.png' , eixoX, eixoY, 70, 70));
        } else {
        return obstacles.push(new Obstacle('./images/medicini-icon-pill.png' , eixoX, eixoY, 70, 70));}  
       }

    function updateObstacles(){
        obstacles.forEach((obstacle) =>{
        obstacle.move();
        obstacle.draw();
        });
        obstacleVacina.forEach((obstacle) =>{
            obstacle.move();
            obstacle.draw();
            });
        if (frames % 80 === 0){ 
            createObstacle();
        }
    }

    function checkVacine(){
        const taked = obstacleVacina.some(function(obstacle){
            return player.crashWith(obstacle);
        });
        if (taked){
            console.log("vacinado");
            //fazer um score e conectalo com  o checkVacine para 
            //aparecer no window a quantidade de pontuação feita ate o momento
        }   
    }

    class GameOver {
        constructor(source, x, y, w, h){
            this.posX= x;
            this.posY= y;
            this.width= w;
            this.height=h;

            const img = new Image();
            img.src = source;
            this.img = img;

        }
        draw(){
            ctx.drawImage(this.img,this.posX,this.posY,this.width,this.height);
        }
        
      
    }
     
    const gameOver = new GameOver('../images/game-over-trans.png' , 400,90,200,200);


    class Restart {
        constructor(source, x, y, w, h){
            this.posX= x;
            this.posY= y;
            this.width= w;
            this.height=h;

            const img = new Image();
            img.src = source;
            this.img = img;

        }
        draw(){
            ctx.drawImage(this.img,this.posX,this.posY,this.width,this.height);
        }
        
      
    }
     
    const restart = new Restart('../images/restart.png' , 480,275,40,40);
    
    function checkGameOver(){
        const crashed = obstacles.some(function(obstacle){
            return player.crashWith(obstacle);
        });
        if (crashed){
            console.log("crashed")
            cancelAnimationFrame(animationId);
            clearCanvas();
            gameOver.draw();
            restart.draw();
        }
    
    }



    /*function score(){
        const points = Math.floor(this.frames / 5);
        this.ctx.font = '18px serif';
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Score: ${points}`, 350, 50);
    }*/
    

}

   

//funcções que provavelmente existirão
//function clearCanvas(){} -- ok
//as teclas estão ao contrario, arrow up, ta levando pra baixo e arrow down pra cima  --OK
//criar limite para o emu nao passar a tela -- ok
//updateCanvas(){} -- OK
//colidir com um obstaculo
//pontuação de acordo com o obstaculo
//score do jogo
//game over