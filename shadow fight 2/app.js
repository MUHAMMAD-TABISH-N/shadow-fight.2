const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 400;

// Game Settings
const player1 = {
  x: 50,
  y: 300,
  width: 50,
  height: 80,
  color: 'red',
  speed: 5,
  health: 100,
  attacking: false
};

const player2 = {
  x: 700,
  y: 300,
  width: 50,
  height: 80,
  color: 'blue',
  speed: 5,
  health: 100,
  attacking: false
};

// Draw players on canvas
function drawPlayer(player) {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw health bars
function drawHealthBar(player, x, y) {
  ctx.fillStyle = 'black';
  ctx.fillRect(x, y, 100, 10);
  ctx.fillStyle = 'green';
  ctx.fillRect(x, y, player.health, 10);
}

// Handle player movement and actions
function handleInput() {
  if (keys['ArrowLeft']) player1.x -= player1.speed;
  if (keys['ArrowRight']) player1.x += player1.speed;
  if (keys['ArrowUp'] && player1.y > 200) player1.y -= player1.speed;
  if (keys['ArrowDown']) player1.y += player1.speed;
  if (keys['Space'] && !player1.attacking) {
    player1.attacking = true;
    player1.health -= 10; // Example attack on opponent
  }

  if (keys['a']) player2.x -= player2.speed;
  if (keys['d']) player2.x += player2.speed;
  if (keys['w'] && player2.y > 200) player2.y -= player2.speed;
  if (keys['s']) player2.y += player2.speed;
  if (keys['f'] && !player2.attacking) {
    player2.attacking = true;
    player2.health -= 10; // Example attack on opponent
  }
}

// Game Loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  handleInput();

  drawPlayer(player1);
  drawPlayer(player2);

  drawHealthBar(player1, 50, 20);
  drawHealthBar(player2, 650, 20);

  if (player1.attacking) {
    player2.health -= 5; // Example damage to player2
    player1.attacking = false;
  }

  if (player2.attacking) {
    player1.health -= 5; // Example damage to player1
    player2.attacking = false;
  }

  // Check for game over
  if (player1.health <= 0 || player2.health <= 0) {
    alert('Game Over!');
    player1.health = 100;
    player2.health = 100;
  }

  requestAnimationFrame(gameLoop);
}

let keys = {};
window.addEventListener('keydown', (e) => {
  keys[e.key] = true;
});
window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});

// Start the game loop
gameLoop();
