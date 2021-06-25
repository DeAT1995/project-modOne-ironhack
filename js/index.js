
//A SER FEITO

//começar o jogo
//inserir player na tela
// criar metodo para pular o obstaculo
//criar metodo para retornar ao chão após pular o obstaculo
//criar o obstaculo 
//definir velocidade dos obstaculos

//rodar um tempo de cronometro
//rodar um score
//caso colidir 2x game over

//adicionar um evento de mpuse quando passar em cima dos li's para dar info sobre o jogo
//redigir orientações sobre o jogo no READ.me



/*window.onload = () => {

    function startGame(){
        player.draw();
    }

    let canvas = document.getElementById('canvas');
    let context = canvas.getContext("2d");


    class emu {
        constructor(source, x, y , w, h){
            this.posX = x;
            this.posY = y;
            this.width = w;
            this.height = h;

            const img = new Image();
            img.src = source;
            img.onload = () => {
                this.img = img;
            }
        }
    draw() {
        context.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
    }
    const player = new Emu('/images/emu-icon edited.png', 200,100, 30, 30); 
}
*/

window.onload = () => {
    document.getElementById("start-game").onclick = () => {
                startGame();
        
    };

    function startGame() {
        console.log(player.img);
        player.draw();
        
    }

    const canvas = document.getElementById("game-box");
    const ctx = canvas.getContext('2d');

    class Emu {
        constructor(source, x, y, w, h){
            this.posX= x;
            this.posY= y;
            this.width= w;
            this.height=h;

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
    }
    const player = new Emu('../images/emu.png' , 200,100,30,30);
}

//funcções que provavelmente existirão
//function clearCanvas(){}
//updateCanvas(){}
//jump (){}