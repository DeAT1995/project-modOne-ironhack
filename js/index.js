
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
            if (this.posY < 290) {
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


       
    function takeVacine(){
        let taked = obstacleVacina.some(function(vacine){
            return player.crashWith(vacine);
        });

        if (taked){
            obstacleVacina.forEach((element,index) =>{
                obstacleVacina.splice(index, 1);
                //points += 1; // como faço para essa pontuação sair desse escopo e poder acessar o scopo do score e aparecer na tela ????
                }) // verificar o pq as vezes some mais de uma vacina no canvas, quando era pra sumir apenas a da colisao
        }
    }


    function score(points){ 
        ctx.beginPath();
        ctx.fillStyle= 'rgb(0, 0, 0)';
        ctx.rect(425,355,130,35);
        ctx.fill();
        ctx.font = "15px serif";
        ctx.fillStyle = "rgba(0, 245, 33, 0.6)";
        ctx.fillText("SCORE:" + points, 435, 377); //como faço pra definir esse points como o score do game ???
        // como deixar o score com o borderradius ?? ctx.fillStyle.border
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
        
        //fazer o restart funcionar 
        /* clickRestart(restart){
            restart.addEventListener("click", ()=>{
                console.log("ta funcinando o click")
                //aqui deve executar uma função para reiniciar o jogo
                // como faço para o jogo executar do inicio como no f5 ?
            })
        }*/
        //posso colocar um addEventListener dentro dessa imagem, para ao click o jogo começar novamente ?

    

    }
     
    const gameOverImg = new GameOver('../images/game-over-trans.png' , 400,75,200,200);
    const restartImg = new GameOver('../images/restart.png' , 480,270,40,40);
    

    function checkGameOver(){
        const crashed = obstacles.some(function(obstacle){
            return player.crashWith(obstacle);
        });
        if (crashed){
            cancelAnimationFrame(animationId);
            clearCanvas();
            gameOverImg.draw();
            restartImg.draw();
        }
    
    }

}

   

//funcções que provavelmente existirão
//function clearCanvas(){} -- ok
//as teclas estão ao contrario, arrow up, ta levando pra baixo e arrow down pra cima  --OK
//criar limite para o emu nao passar a tela -- ok
//updateCanvas(){} -- OK
//colidir com um obstaculo -- ok
//pontuação de acordo com o obstaculo vacina
//score do jogo --ok 
//game over -- ok