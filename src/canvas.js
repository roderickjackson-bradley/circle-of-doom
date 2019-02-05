import utils from './utils'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];


// Variables
var squareGravity = 4;
var gravity = 1;
var friction = 0.9;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;

// Event Listeners

/* Adding event listners for left, right, and up arrow keys.
 * I have to include what happens when a key is pushed and 
 * what happens when a key is not pushed(up)
 */
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
            rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if (e.key == "Up" || e.key == "ArrowUp") {
        upPressed = false;
    }
}


addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

// Objects

function Ball(x, y, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    // Update function
    this.update = function() {
        
        /* If Ball object's "y" vector plus the Ball object's radius
         * is Greater than the height of the canvas
         */
        if (this.y + this.radius > canvas.height) {
        
        /* Make "y's" change of position equal the inverse of it's self.
         * The inverse represents the change of direction the ball will go once it hits the floor
         */ 
            this.dy = -this.dy * 0.9;
        } else {
            this.dy += gravity;
        }

        // if (this.x + this.radius > canvas.width) {
        //     this.dx = -this.dx * 0.2;
        // } else {
        //     this.dx -= 1;
        // }

        //Gives adds a unit everytime the ball moves on y-axis
        this.y += this.dy;
        this.draw();
    }

    // Draw function
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }
    // I'm placing this here so that the ball obect can have the ability to move
    // I want all ball obects to have the ability to move or be user controlled
    this.move = function() {
        if (rightPressed) {
            this.x += 7;
        }
        else if (leftPressed) {
            this.x -= 7;
        }
        else if (upPressed) {
            this.y -= 7;
        }
    }

}

function Square(x, y, dy, swidth, sheight) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.swidth = swidth;
    this.sheight = sheight;

    this.update = function() {
        if (this.y + this.swidth + this.sheight > canvas.height) {
            this.dy = -this.dy;
        } else {
            this.dy++;
        }      
       //Gives adds a unit everytime the ball moves on y-axis
        this.y += this.dy;
        this.draw();
    }

    this.draw = function() {
        c.beginPath();
        c.fillRect(this.x, this.y, this.dy, this.swidth, this.sheight);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

}



var ball = new Ball(canvas.width / 2, canvas.height/ 2, 2, 40, 'blue');
var squares = new Square(canvas.width / 5, canvas.height/ 10, 1, 55, 55);

// Implementation
function init() {

    ball;
    squares;
}


// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    squares.update();

    ball.move();
    ball.update();
}

init();
animate();