import utils from './utils'

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;


// Variables
var ball;

// Event Listeners


addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

// Objects
function Ball(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

    this.update = function() {
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



// Implementation
function init() {
    // Creating a new instance of the ball object.
    // I'm passng some paramaters that tells the object where to start at, how big I want the object, and what color.
    ball = new Ball(canvas.width / 2, canvas.height / 2, 45, "blue");

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