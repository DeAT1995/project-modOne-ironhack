// starts canvas access inside HTML
window.onload = () => {
  document.getElementById("start-game").onclick = () => {
    startGame();
  };

  //allows movement with the arrows
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        player.moveDown();
        break;
      case "ArrowDown":
        player.moveUp();
        break;
    }
  });

  //var at the game
  const canvas = document.getElementById("game-box");
  const ctx = canvas.getContext("2d");
  let frames = 0;
  let animationId = null;
  let obstacleVacina = [];
  let obstacles = [];
  let points = 0;



  //starts the game
  function startGame() {
    player.draw();
    updateCanvas();
    updateObstacles();
    restartGame();
  };

  //reset the game
  function restartGame() {
    let hideButton = document.getElementById("start-game");
    hideButton.innerHTML = "RESTART";
    hideButton.addEventListener("click", () => {
      points = 0;
      obstacles = [];
      obstacleVacina = [];
      clearCanvas();
      player.draw();
      updateCanvas();
      updateObstacles();
    });
  };

  //update the canvas tag
  function updateCanvas() {
    frames += 1;
    clearCanvas();
    player.draw();
    updateObstacles();
    score();
    animationId = requestAnimationFrame(updateCanvas);
    checkGameOver();
    takeVacine();
  };

  //clean the canvas tag
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  //create the player
  class Emu {
    constructor(source, x, y, w, h) {
      this.posX = x;
      this.posY = y;
      this.width = w;
      this.height = h;
      this.speed = 20;

      const img = new Image();
      img.src = source;
      this.img = img;
    }
    draw() {
      ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
    moveDown() {
      if (this.posY > 10) {
        this.posY -= this.speed;
      }
    }
    moveUp() {
      if (this.posY < 260) {
        this.posY += this.speed;
      }
    }

    top() {
      return this.posY;
    }

    bottom() {
      return this.posY + this.height;
    }

    left() {
      return this.posX;
    }

    right() {
      return this.posX + this.width;
    }

    crashWith(obstacle) {
      return !(
        this.bottom() < obstacle.top() ||
        this.top() > obstacle.bottom() ||
        this.right() < obstacle.left() ||
        this.left() > obstacle.right()
      );
    }
  };

  //draw the player
  const player = new Emu("./images/emu.png", 15, 142, 90, 90);

  //create the obstacles
  class Obstacle {
    constructor(source, x, y, w, h) {
      this.posX = x;
      this.posY = y;
      this.width = w;
      this.height = h;
      this.speed = 3;

      const img = new Image();
      img.src = source;
      this.img = img;
    }

    draw() {
      ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }

    move() {
      this.posX -= this.speed;
    }
    top() {
      return this.posY;
    }

    bottom() {
      return this.posY + this.height;
    }

    left() {
      return this.posX;
    }

    right() {
      return this.posX + this.width;
    }
  };

  //create the obstacles
  function createObstacle() {
    const eixoX = 1000; 
    let eixoY = Math.floor(Math.random() * 300);
    let numberVar = Math.floor(Math.random() * 400);

    if (numberVar % 2) {
      return obstacleVacina.push(
        new Obstacle("./images/vaccine-icon.png", eixoX, eixoY, 60, 60)
      );
    } else {
      return obstacles.push(
        new Obstacle("./images/cloroquina-trans.png", eixoX, eixoY, 50, 80)
      );
    }
  };

  //draw the obstacles
  function updateObstacles() {
    obstacles.forEach((obstacle) => {
      obstacle.move();
      obstacle.draw();
    });
    obstacleVacina.forEach((obstacle) => {
      obstacle.move();
      obstacle.draw();
    });
    if (frames % 150 === 0) {
      createObstacle();
    }
  };

  //create the player collision with the vaccine
  function takeVacine() {
    for (let i = 0; i < obstacleVacina.length; i += 1) {
      let taken = player.crashWith(obstacleVacina[i]); 

      if (taken) {
        points += 1;
        obstacleVacina.splice(i, 1);
      }
    }
  };

  //draw at canvas the score
  function score() {
    ctx.beginPath();
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.rect(430, 325, 125, 30);
    ctx.fill();
    ctx.font = "15px serif";
    ctx.fillStyle = "rgba(0, 255, 33, 0.6)";
    ctx.fillText("SCORE: " + points, 455, 343); //como faço pra definir esse points como o score do game ???
  };

  //create the game over
  class GameOver {
    constructor(source, x, y, w, h) {
      this.posX = x;
      this.posY = y;
      this.width = w;
      this.height = h;

      const img = new Image();
      img.src = source;
      this.img = img;
    }
    draw() {
      ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
    }
  };

  //draw the game over image
  const gameOverImg = new GameOver(
    "./images/game-over-trans.png",
    400,
    80,
    200,
    200
  );

  //check if are the player collision with the cloroquina obstacle
  function checkGameOver() {
    const crashed = obstacles.some(function (obstacle) {
      return player.crashWith(obstacle);
    });
    if (crashed) {
      cancelAnimationFrame(animationId);
      clearCanvas();
      gameOverImg.draw();
      score();
    }
  }
};
