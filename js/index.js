//A SER FEITO

//começar o jogo -- ok
//inserir player na tela -- ok
//criar o obstaculo --ok
// criar obstaculos aleatórios na tela -- ok
//definir velocidade dos obstaculos --ok

    //arrumar os obstaculos --ok
    //fazer um score --ok
    //vacina soma ponto --------------
    //fazer a img da vacina sumir quando bater na ema --ok
    //cloroquina GAME OVER --ok
    //restart criado --ok 
    //rodar um score --ok
    //fazer o score aparecer a pontuação do player ----------
    //fazer a tela voltar do inicio no restart -------------


//adicionar um evento de mouse quando passar em cima dos li's para dar info sobre o jogo
//redigir orientações sobre o jogo no README.md
//fazer a apresentação em slides do jogo 



//funcções que provavelmente existirão
//function clearCanvas(){} -- ok
//as teclas estão ao contrario, arrow up, ta levando pra baixo e arrow down pra cima  --OK
//criar limite para o emu nao passar a tela -- ok
//updateCanvas(){} -- OK
//colidir com um obstaculo -- ok
//pontuação de acordo com o obstaculo vacina ---ok
//score do jogo --ok 
//game over -- ok

//coloquei a vacina pra sumir quando colide com o player --ok
//criei o game over --ok
//coloquei o refresh ---ok
//averifguar o pq as vezes buga e some mais de uma vacina as vezes
// transformar o botão do start game em restart :D
// verificar como faço para a tela reinicar quando clicar no restart
// fazer as informações do jogo aoarecerem quando passar o mouse em cima 
//função para fazer um texto ser exibido quando o mouse entrar nos links do navbar

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
        restartGame()
    }

    function restartGame() {
        let hideButton = document.getElementById("start-game");
        hideButton.innerHTML="RESTART";
        hideButton.addEventListener("click", () =>{
            points = 0;
            obstacles = [];
            obstacleVacina = [];
            clearCanvas();
            player.draw();
            updateCanvas();
            updateObstacles();
            // //fazer uma função para o botão restart
            

            console.log(obstacles);
            console.log(obstacleVacina);
        })
    }

    const canvas = document.getElementById("game-box");
    const ctx = canvas.getContext('2d');
    let frames = 0;
    let animationId = null; 

    function updateCanvas(){
        frames += 1;
        clearCanvas();
        player.draw();
        updateObstacles();
        score();
        animationId = requestAnimationFrame(updateCanvas);
        checkGameOver();
        takeVacine();
        

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
            this.speed = 20;
    

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
            if (this.posY < 260) {
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
            this.height= h;
            this.speed = 2;

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

    let obstacleVacina = [];
    let obstacles = [];

    
    function createObstacle(){
        const eixoX = 1000;//final do canvas
        let eixoY = Math.floor(Math.random() * 300); //variável, número aleatorio multiplicado pelo tamanho do canvas no eixo y

        let numberVar = Math.floor(Math.random()*400); // variável para criar um número aleatório para poder revesar os obstaculos a serem apresnetados na tela 
        
        if ( numberVar % 2) {
         return obstacleVacina.push(new Obstacle('./images/vaccine-icon.png' , eixoX, eixoY, 60, 60));
        } else {
        return obstacles.push(new Obstacle('./images/cloroquina-trans.png' , eixoX, eixoY, 50, 80));}  
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
        if (frames % 150 === 0){ 
            createObstacle();
        }
    }

    let points = 0;
       
    function takeVacine(){
            for ( let i=0; i < obstacleVacina.length ; i += 1){ // loop para passar por cada indice do array de vacina
            let taken = player.crashWith(obstacleVacina[i]) // cofnere a colisao com o obstaculo
            
            if (taken){ // se colidiu ele vai somar o points e remover o determinado obstaculo que colidiu 
                points += 1
                obstacleVacina.splice(i, 1);
                
            }
        }
    }

    
    function score(){ 
        ctx.beginPath();
        ctx.fillStyle= 'rgb(0, 0, 0)';
        ctx.rect(430,325,125,30);
        ctx.fill();
        ctx.font = "15px serif";
        ctx.fillStyle = "rgba(0, 255, 33, 0.6)";
        ctx.fillText("SCORE: " + points, 455, 343); //como faço pra definir esse points como o score do game ???

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
   
    const gameOverImg = new GameOver('../images/game-over-trans.png' , 400,80,200,200);

    function checkGameOver(){
        const crashed = obstacles.some(function(obstacle){
            return player.crashWith(obstacle);
        });
        if (crashed){
            cancelAnimationFrame(animationId);
            clearCanvas();
            gameOverImg.draw();
            score();
        }
    
    }

    
}

   