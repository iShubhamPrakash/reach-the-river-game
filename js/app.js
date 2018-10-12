let score = 0;
let life = 3;
let crossedRiver = true; //to check if player has crossed the river
const playerStartXposition = 201;
const playerStartYposition = 404;

// Sound for different events
// I have used HTML5 Audio object which might not be supported in older browser, i.e IE ;)
const clickSound = new Audio('sound/click.ogg');
const collideSound = new Audio('sound/collide.ogg');
const gameEndSound = new Audio('sound/game-end.wav');
const moveSound = new Audio('sound/move.oga');
const riverSound = new Audio('sound/river.ogg');


// Enemies our player must avoid
var Enemy = function (xPosition, yPosition, speed) {
    // Variables applied to each of our instances go here,
    this.x = xPosition;
    this.y = yPosition;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper in engine.js to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Updating the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // Multiplying any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -200;
    }

    // Check collision with the player
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class using which we will instanciate player objects
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (xPosition, yPosition, playerImage) {
    this.x = xPosition;
    this.y = yPosition;
    this.sprite = playerImage;
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.update = function (dt) {

}

// Life of each player
Player.prototype.life = 3;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var randomSpeed, randomX;
// 60,145 and 230 is y location to put the bug aligned at the center of three horizontal road
// Math.random()*191+50 generate random no between 50 and 240 which put the them y position between the road
var bugYpositions = [60, 145, 230, 145, 60, 60]
bugYpositions.forEach(function (bugYposition) {
    randomSpeed = Math.random() * 150 + 50;
    randomX = Math.random() * 400 * (-1); // generates random no between -400 and 0
    allEnemies.push(new Enemy(randomX, bugYposition, randomSpeed));
});

var player = new Player(playerStartXposition, playerStartYposition, 'images/char-boy.png');

Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'left':
            if (this.x > 10)
                this.x -= 100;
            else
                this.x = 1;

            break;

        case 'right':
            if (this.x < 390)
                this.x += 100;
            else
                this.x = 401;

            break;

        case 'down':
            if (this.y < 400)
                this.y += 83;
            else
                this.y = 404;

            break;

        case 'up':
            if (this.y > 10)
                this.y -= 83;

            // The player wins if he enters the river
            if (this.y == -11) {
                riverReached(this);
            }

    }
    // Plays a sound on player move
    moveSound.play();
    moveSound.currentTime = 0;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left', // left arrow key
        65: 'left', // 'A' key
        38: 'up', //  up arrow key
        87: 'up', // 'W' key
        39: 'right', // right arrow key
        68: 'right', // 'D' key
        40: 'down', // Down arrow key
        83: 'down' // 'S' Key
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

// On screen button functionality for mobile device
const controlButtons = document.querySelectorAll('.control-btn');
controlButtons.forEach(function (controlButton) {
    controlButton.addEventListener("click", function (e) {
        switch (this.id) {
            case 'up-btn':
                player.handleInput('up');
                break;
            case 'down-btn':
                player.handleInput('down');
                break;

            case 'left-btn':
                player.handleInput('left');
                break;

            case 'right-btn':
                player.handleInput('right');
                break;
        }
    });
});


const scoreValue = document.querySelector('.score');

function riverReached(ref) {
    // Play the sound
    riverSound.play();
    riverSound.currentTime = 0;
    // reset the player position and update score after 500ms
    setTimeout(function () {
        resetPlayerPosition(ref);
        crossedRiver = true;
    }, 500);

    if (crossedRiver)
        scoreUpdate();

}


function resetPlayerPosition(ref) {
    ref.x = playerStartXposition;
    ref.y = playerStartYposition;
}

function scoreUpdate() {
    // score increase
    score += 10;
    // update score value on the display
    scoreValue.innerHTML = score;
    // setting back crossRiver to false
    crossedRiver = false;
}

function checkCollision(ref) {
    // Here ref is Reference to the enemy object from where this function is called
    if (player.x < ref.x + 60 &&
        player.x + 37 > ref.x &&
        player.y < ref.y + 25 &&
        30 + player.y > ref.y) {
        console.log("collision");
        if (life == 0) {
            // GameOver
        } else {
            // Life decrease
            life--;
            collideSound.play();
            collideSound.currentTime = 0;
        }

        // Call resetPlayerPosition to reset the player position
        resetPlayerPosition(player);
    }
}