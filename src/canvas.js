import utils from './utils'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables

// Event Listeners


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
            this.dy += 1;
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
}


var ball;

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
    ball.update();
}

init();
animate();