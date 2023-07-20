const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const dinoWidth = 50;
const dinoHeight = 50;
let dinoX = 50;
let dinoY = canvas.height - dinoHeight;
let isJumping = false;
let jumpCount = 0;

const obstacles = [];
let isGameOver = false;
let score = 0;

function drawDino() {
    ctx.beginPath();
    ctx.fillStyle = '#555';
    ctx.fillRect(dinoX, dinoY, dinoWidth, dinoHeight);
    ctx.closePath();
}

function drawObstacles() {
    ctx.fillStyle = '#8B0000';
    for (const obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        jumpCount = 20;
    }
}

function generateObstacle() {
    const minGap = 200;
    const maxGap = 300;
    const obstacleWidth = 30 + Math.random() * 30;
    const obstacleHeight = 50 + Math.random() * 50;
    const lastObstacleX = obstacles.length > 0 ? obstacles[obstacles.length - 1].x : canvas.width;
    const obstacleX = lastObstacleX + minGap + Math.random() * (maxGap - minGap);
    const obstacle = {
        x: obstacleX,
        y: canvas.height - obstacleHeight,
        width: obstacleWidth,
        height: obstacleHeight,
    };
    obstacles.push(obstacle);
}

function checkCollisions() {
    for (const obstacle of obstacles) {
        if (
            dinoX < obstacle.x + obstacle.width &&
            dinoX + dinoWidth > obstacle.x &&
            dinoY < obstacle.y + obstacle.height &&
            dinoY + dinoHeight > obstacle.y
        ) {
            isGameOver = true;
        }
    }
}

function drawScore() {
    ctx.font = '24px Arial';
    ctx.fillStyle = '#000';
    ctx.fillText('Score: ' + score, 10, 30);
}

let highscores = [];

function loadHighscores() {
    const savedHighscores = localStorage.getItem('highscores');
    highscores = savedHighscores ? JSON.parse(savedHighscores) : [];
}

function saveHighscores() {
    localStorage.setItem('highscores', JSON.stringify(highscores));
}

function showHighscores() {
    const highscoreList = document.getElementById('highscore-list');
    highscoreList.innerHTML = '';

    for (const score of highscores) {
        const listItem = document.createElement('li');
        listItem.textContent = `${score.name}: ${score.score}`;
        highscoreList.appendChild(listItem);
    }
}

function gameOver() {
  isGameOver = true;

  const playerName = prompt('Game Over! Enter your name:');
  if (playerName) {
      highscores.push({ name: playerName, score });
      highscores.sort((a, b) => b.score - a.score);
      highscores = highscores.slice(0, 5); // Keep only the top 5 highscores
      saveHighscores();
      showHighscores();
  }
}

function update() {

    // Check for collisions
    checkCollisions();

    // Game over condition
    if (isGameOver) {
      gameOver();
        return;
    }

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate obstacles randomly
    if (Math.random() < 0.02) {
        generateObstacle();
    }

    // Draw the dinosaur
    drawDino();

    // Draw obstacles
    drawObstacles();

    // Move and remove obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= 5;
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++; // Increment the score when the obstacle is avoided
        }
    }

    // Handle jumping
    if (isJumping) {
        dinoY -= jumpCount * 2;
        jumpCount--;
        if (dinoY >= canvas.height - dinoHeight) {
            dinoY = canvas.height - dinoHeight;
            isJumping = false;
        }
    }

    // Check for collisions
    checkCollisions();

    // Draw the score
    drawScore();

    // Request next animation frame
    requestAnimationFrame(update);
}

// Listen for space key press to make the dinosaur jump
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

// Load highscores when the game starts
loadHighscores();
showHighscores();

// Start the game loop
update();
