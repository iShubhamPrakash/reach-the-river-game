// Enemies our player must avoid
var Enemy = function (xPosition, yPosition, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = xPosition;
    this.y = yPosition;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -200;
    }

    // checkCollision();

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (xPosition, yPosition) {
    this.x = xPosition;
    this.y = yPosition;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.update = function (dt) {

}
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

var player = new Player(201, 404);

Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= 100;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'right':
            this.x += 100;
            break;
        case 'down':
            this.y += 83;
            break;
    }
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