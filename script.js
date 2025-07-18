const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameState = 'start'; // 'start', 'playing', 'gameOver'

const gravity = 0.5;
const flapPower = -8;
const player1Color = 'cyan';
const player2Color = 'magenta';

class Player {
    constructor(x, y, color, controls) {
        this.x = x;
        this.y = y;
        this.vy = 0;
        this.width = 50;
        this.height = 30;
        this.color = color;
        this.health = 100;
        this.shootCooldown = 0;
        this.controls = controls;
    }

    flap() {
        this.vy = flapPower;
    }

    shoot() {
        if (this.shootCooldown === 0) {
            const direction = this.x > canvas.width / 2 ? -1 : 1;
            const projectileX = direction === 1 ? this.x + this.width : this.x;
            const projectileY = this.y + this.height / 2;

            if (this.tripleShot) {
                for (let i = -1; i <= 1; i++) {
                    const angle = i * 0.2;
                    const p = new Projectile(projectileX, projectileY, 10, this.color, direction, this);
                    p.vy = Math.sin(angle) * 10;
                    p.vx = Math.cos(angle) * 10 * direction;
                    projectiles.push(p);
                }
            } else {
                projectiles.push(new Projectile(projectileX, projectileY, 10, this.color, direction, this));
            }

            this.shootCooldown = this.rapidFire ? 15 : 30;

            // Muzzle flash
            for (let i = 0; i < 10; i++) {
                particles.push(new Particle(projectileX, projectileY, 'orange', Math.random() * 3 + 1, 10));
            }
        }
    }

    update() {
        this.vy += gravity;
        this.y += this.vy;

        if (this.y + this.height > canvas.height) {
            this.y = canvas.height - this.height;
            this.vy = 0;
        }

        if (this.y < 0) {
            this.y = 0;
            this.vy = 0;
        }

        if (this.shootCooldown > 0) {
            this.shootCooldown--;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.vy * 0.05);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, -this.height / 2);
        ctx.lineTo(this.width / 2, this.height / 2);
        ctx.lineTo(-this.width / 2, this.height / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}

const player1 = new Player(canvas.width * 0.15, canvas.height / 2, player1Color, {flap: 'KeyW', shoot: 'KeyS'});
const player2 = new Player(canvas.width * 0.85 - 50, canvas.height / 2, player2Color, {flap: 'ArrowUp', shoot: 'ArrowDown'});

const projectiles = [];
const asteroids = [];
const powerUps = [];
const particles = [];
const stars = [];

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speed = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = 0;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

for (let i = 0; i < 100; i++) {
    stars.push(new Star());
}

class Particle {
    constructor(x, y, color, size, life) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = size || Math.random() * 5 + 2;
        this.vx = (Math.random() - 0.5) * 5;
        this.vy = (Math.random() - 0.5) * 5;
        this.life = life || 30;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

const powerUpTypes = {
    HEALTH: 'health',
    SHIELD: 'shield',
    RAPID_FIRE: 'rapid_fire',
    TRIPLE_SHOT: 'triple_shot',
    PIERCING_SHOT: 'piercing_shot',
    SCREEN_BOMB: 'screen_bomb'
};

class PowerUp {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = 30;
        this.height = 30;
        this.speed = 2;
    }

    update() {
        this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(this.type[0].toUpperCase(), this.x + this.width / 2, this.y + this.height / 1.5);
    }
}

class Asteroid {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = 2;
        this.health = size * 25; // Small: 25, Medium: 50
        this.width = size * 25;
        this.height = size * 25;
    }

    update() {
        this.y += this.speed;
    }

    draw() {
        ctx.fillStyle = 'gray';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Projectile {
    constructor(x, y, speed, color, direction, owner) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.color = color;
        this.direction = direction; // 1 for right, -1 for left
        this.width = 20;
        this.height = 10;
        this.owner = owner;
    }

    update() {
        this.x += this.speed * this.direction;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}


function spawnAsteroid() {
    const size = Math.random() < 0.5 ? 1 : 2; // 1 for small, 2 for medium
    const x = Math.random() * (canvas.width * 0.6) + (canvas.width * 0.2);
    const y = -50;
    asteroids.push(new Asteroid(x, y, size));
}

function spawnPowerUp() {
    const typeValues = Object.values(powerUpTypes);
    const type = typeValues[Math.floor(Math.random() * typeValues.length)];
    const x = Math.random() * (canvas.width * 0.6) + (canvas.width * 0.2);
    const y = -50;
    powerUps.push(new PowerUp(x, y, type));
}

let asteroidSpawnTimer = 0;
let powerUpSpawnTimer = 0;

function update() {
    if (gameState !== 'playing') return;

    player1.update();
    player2.update();

    projectiles.forEach((p, pIndex) => {
        p.update();
        if (p.x < 0 || p.x > canvas.width) {
            projectiles.splice(pIndex, 1);
            return;
        }

        const opponent = p.owner === player1 ? player2 : player1;
        if (checkCollision(p, opponent)) {
            if (!opponent.shield) {
                opponent.health -= 10;
                if (opponent.health <= 0) {
                    gameState = 'gameOver';
                }
            }
            projectiles.splice(pIndex, 1);
            return;
        }

        asteroids.forEach((a, aIndex) => {
            if (checkCollision(p, a)) {
                if (!p.owner.piercingShot) {
                    projectiles.splice(pIndex, 1);
                }
                a.health -= 10;
                if (a.health <= 0) {
                    for (let i = 0; i < a.size * 10; i++) {
                        particles.push(new Particle(a.x + a.width / 2, a.y + a.height / 2, 'gray'));
                    }
                    asteroids.splice(aIndex, 1);
                }
            }
        });

        powerUps.forEach((pw, pwIndex) => {
            if (checkCollision(p, pw)) {
                applyPowerUp(p.owner, pw.type);
                powerUps.splice(pwIndex, 1);
                projectiles.splice(pIndex, 1);
            }
        });
    });

    asteroids.forEach((a, index) => {
        a.update();
        if (a.y > canvas.height) {
            asteroids.splice(index, 1);
        }
        if(checkCollision(player1, a)) {
            if (!player1.shield) {
                player1.health -= 10;
                if (player1.health <= 0) {
                    gameState = 'gameOver';
                }
            }
            asteroids.splice(index, 1);
        }
        if(checkCollision(player2, a)) {
            if (!player2.shield) {
                player2.health -= 10;
                if (player2.health <= 0) {
                    gameState = 'gameOver';
                }
            }
            asteroids.splice(index, 1);
        }
    });

    powerUps.forEach((p, index) => {
        p.update();
        if (p.y > canvas.height) {
            powerUps.splice(index, 1);
        }
    });

    asteroidSpawnTimer++;
    if (asteroidSpawnTimer > 100) {
        spawnAsteroid();
        asteroidSpawnTimer = 0;
    }

    powerUpSpawnTimer++;
    if (powerUpSpawnTimer > 500) {
        spawnPowerUp();
        powerUpSpawnTimer = 0;
    }

    particles.forEach((p, index) => {
        p.update();
        if (p.life <= 0) {
            particles.splice(index, 1);
        }
    });

    stars.forEach(s => s.update());
}

function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
}

function applyPowerUp(player, type) {
    switch (type) {
        case powerUpTypes.HEALTH:
            player.health += 25;
            if (player.health > 100) player.health = 100;
            break;
        case powerUpTypes.SHIELD:
            player.shield = true;
            setTimeout(() => player.shield = false, 5000);
            break;
        case powerUpTypes.RAPID_FIRE:
            player.rapidFire = true;
            setTimeout(() => player.rapidFire = false, 5000);
            break;
        case powerUpTypes.TRIPLE_SHOT:
            player.tripleShot = true;
            setTimeout(() => player.tripleShot = false, 7000);
            break;
        case powerUpTypes.PIERCING_SHOT:
            player.piercingShot = true;
            setTimeout(() => player.piercingShot = false, 7000);
            break;
        case powerUpTypes.SCREEN_BOMB:
            asteroids.length = 0;
            break;
    }
}

function draw() {
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => s.draw());

    if (gameState === 'start') {
        drawStartScreen();
        return;
    }

    if (gameState === 'gameOver') {
        drawEndScreen();
        return;
    }

    player1.draw();
    player2.draw();

    projectiles.forEach(p => p.draw());
    asteroids.forEach(a => a.draw());
    powerUps.forEach(p => p.draw());
    particles.forEach(p => p.draw());

    drawHUD();
}

function drawHUD() {
    // Player 1 Health
    ctx.fillStyle = 'red';
    ctx.fillRect(20, 20, 200, 20);
    ctx.fillStyle = 'green';
    ctx.fillRect(20, 20, player1.health * 2, 20);
    ctx.fillStyle = 'white';
    ctx.font = '20px sans-serif';
    ctx.fillText('Player 1', 20, 60);

    // Player 2 Health
    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width - 220, 20, 200, 20);
    ctx.fillStyle = 'green';
    ctx.fillRect(canvas.width - 220, 20, player2.health * 2, 20);
    ctx.fillStyle = 'white';
    ctx.fillText('Player 2', canvas.width - 90, 60);

    // Power-up indicators
    ctx.textAlign = 'left';
    drawPowerUpIndicator(player1, 20, 80);
    ctx.textAlign = 'right';
    drawPowerUpIndicator(player2, canvas.width - 20, 80);
}

function drawPowerUpIndicator(player, x, y) {
    let powerUpY = y;
    ctx.font = '16px sans-serif';
    if (player.shield) {
        ctx.fillStyle = 'blue';
        ctx.fillText('Shield', x, powerUpY);
        powerUpY += 20;
    }
    if (player.rapidFire) {
        ctx.fillStyle = 'yellow';
        ctx.fillText('Rapid Fire', x, powerUpY);
        powerUpY += 20;
    }
    if (player.tripleShot) {
        ctx.fillStyle = 'purple';
        ctx.fillText('Triple Shot', x, powerUpY);
        powerUpY += 20;
    }
    if (player.piercingShot) {
        ctx.fillStyle = 'cyan';
        ctx.fillText('Piercing Shot', x, powerUpY);
    }
}

function drawStartScreen() {
    ctx.fillStyle = 'white';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Pixel Wing Duel', canvas.width / 2, canvas.height / 3);
    ctx.font = '24px sans-serif';
    ctx.fillText('Player 1: W (Flap) / S (Shoot)', canvas.width / 2, canvas.height / 2);
    ctx.fillText('Player 2: Up Arrow (Flap) / Down Arrow (Shoot)', canvas.width / 2, canvas.height / 2 + 40);
    ctx.fillText('Press Space to Start', canvas.width / 2, canvas.height / 2 + 100);
}

function drawEndScreen() {
    const winner = player1.health > 0 ? 'Player 1' : 'Player 2';
    ctx.fillStyle = 'white';
    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${winner} Wins!`, canvas.width / 2, canvas.height / 2);
    ctx.font = '24px sans-serif';
    ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 50);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function resetGame() {
    player1.health = 100;
    player2.health = 100;
    player1.y = canvas.height / 2;
    player2.y = canvas.height / 2;
    projectiles.length = 0;
    asteroids.length = 0;
    powerUps.length = 0;
    gameState = 'playing';
}

window.addEventListener('keydown', (e) => {
    if (gameState === 'start' && e.code === 'Space') {
        gameState = 'playing';
    } else if (gameState === 'gameOver' && e.code === 'KeyR') {
        resetGame();
    }

    if (gameState === 'playing') {
        if (e.code === player1.controls.flap) {
            player1.flap();
        }
        if (e.code === player1.controls.shoot) {
            player1.shoot();
        }
        if (e.code === player2.controls.flap) {
            player2.flap();
        }
        if (e.code === player2.controls.shoot) {
            player2.shoot();
        }
    }
});

gameLoop();
