import utils from './utils'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
var ball;
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

        //Gives adds a unit everytime the ball moves on y-axis
        this.y += this.dy;
        this.draw();
    }

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



// Implementation
function init() {
    // Creating a new instance of the ball object.
    // I'm passng some paramaters that tells the object where to start at, how big I want the object, and what color.
    ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 45, "blue");

}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    // objects.forEach(object => {
    //  object.update();
    // });

    // I'm calling my ball.move function here in the game loop and before ball.update() 
    // So that my movements can be updated after I've called them.
    ball.move();
    ball.update();
}

init();
animate();