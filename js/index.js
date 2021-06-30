
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
        updateObstacles();

    }

    const canvas = document.getElementById("game-box");
    const ctx = canvas.getContext('2d');
    let frames = 0;
    let animationId = null; //criado

    function updateCanvas(){
        frames += 1;
        clearCanvas();
        player.draw();
        updateObstacles();
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
            img.onload =() => {
            this.img = img;

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
    const player = new Emu('./images/emu.png' , 15,142,100,100);


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

    //const obstacleCloroquina = new Obstacle('./images/medicini-icon-pill.png' , 900, 0, 100, 100);
    //const obstacleVacina = new Obstacle('./images/vaccine-icon.png' , 700, 200, 100, 100);

    function createObstacle(){
        const eixoX = 1000;//final do canvas
        let eixoY = Math.floor(Math.random() * 400); //variável, número aleatorio multiplicado pelo tamanho do canvas no eixo y

        let numberVar = Math.floor(Math.random()*400); // variável para criar um número aleatório para poder revesar os obstaculos a serem apresnetados na tela 
        
        if ( numberVar % 2) {
            //pq nao posso criar uma variavel dentro de um elemento do if??
         return obstacleVacina.push(new Obstacle('./images/vaccine-icon.png' , eixoX, eixoY, 70, 70));
        } else {
        return obstacleCloroquina.push(new Obstacle('./images/medicini-icon-pill.png' , eixoX, eixoY, 80, 80));}  
       }

    function updateObstacles(){
        obstacles.forEach((obstacle) =>{
        obstacle.move();
        obstacle.draw();
        });
        if (frames % 80 === 0){ 
            createObstacle();
        }
    }

    function checkVacine(){
        /*const taked = obstacleVacina.some(function(obstacle){
            return player.crashWith(obstacle);
        });
        if (taked){
            console.log("vacinado")
            //fazer um score e conectalo com  o checkVacine para 
            //aparecer no window a quantidade de pontuação feita ate o momento
            */
    }
    function checkGameOver(){
        const crashed = obstacles.some(function(obstacle){
            return player.crashWith(obstacle);
        });
        if (crashed){
            console.log("crashed")
            cancelAnimationFrame(animationId);
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
//game over