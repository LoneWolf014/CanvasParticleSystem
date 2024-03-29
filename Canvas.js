
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x : undefined,
    y : undefined
};

var maxRadius = 40;

var ColorArray = [
    '#F2668B',
    '#025E73',
    '#011F26',
    '#026873',
    '#03A688'
]

window.addEventListener("mousemove", function(event){
    mouse.x = event.x,
    mouse.y = event.y,
    console.log(mouse);
})

window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = ColorArray[Math.floor(Math.random() * ColorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = "blue";
        // c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;
        
        if ((mouse.x - this.x < 50 && mouse.x - this.x > -50) &&
         (mouse.y - this.y < 50 && mouse.y - this.y > -50)) {
            
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        }
        else if(this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }
}


var CircleArray = [];

function init() {
    CircleArray = [];
    for(var i = 0; i<1000; i++){
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius ;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        CircleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate(){
    // Clears window everytime it refresh / the loop starts
    c.clearRect(0, 0, innerWidth, innerHeight);

    requestAnimationFrame(animate); //tells the browser that it wants to perform animation

    for (let i = 0; i < CircleArray.length; i++) {
        CircleArray[i].update();
    }
}

init();
animate();

/*
    Event listeners are the key concept that use in interactivity.
    Basically it's a function that run over and over as long as the
    Event is occuring...
 */