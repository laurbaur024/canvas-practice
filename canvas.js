

//makes canvas cover entire window
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//ability to draw - c stands for context
var c = canvas.getContext('2d');


// //makes a filled rectangle, (x,y,w,h)
// c.fillStyle = "yellow"; //fill the rectangle
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "green"; //color will fill with first style that is above it
// c.fillRect(400, 100, 100, 100);


// //line
// c.beginPath();
// c.moveTo(100, 300); //start point
// c.lineTo(100, 400); //end point
// c.lineTo(500, 400); // next end point
// c.lineTo(500, 300);
// c.strokeStyle = "red" //color the line
// c.stroke(); //makes the line draw

// //arc (circles)
// //(x: Int, y: Int, startAngle: Float, endAngle: Float, drawCounterClockwise: Bool (false))
// c.beginPath(); //always proceeds a new shape/line or else it will connect
// c.strokeStyle = 'orange';
// c.arc(300,300,30,0 , Math.PI * 2, false);
// c.stroke();

// for (var i = 0; i < 100; i++) {
//       var x = Math.random() * window.innerWidth;
//       var y = Math.random() * window.innerHeight;
//       c.beginPath(); 
//       c.strokeStyle = 'orange';
//       c.arc(x,y,30,0 , Math.PI * 2, false);
//       c.stroke();
// }
var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 40;
// var minRadius = 5;

var colorArray = [
  '#efba93',
  '#b6667d',
  '#995c8c',
  '#80256d',
];

//tracks mouse movement
window.addEventListener('mousemove', 
function (event){
  mouse.x = event.x;
  mouse.y = event.y;
 
})

//resizes and refreshes page automatically
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init()
})

//how to draw the circle
function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)]
  
  this.draw = function() {
    c.beginPath(); 
    c.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy
    }
    this.x += this.dx;
    this.y += this.dy;
    
    //interactivty conditional statements
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
        && mouse.y - this.y < 50 && mouse.y - this.y > -50 ) {
        
    if (this.radius < maxRadius) {
        this.radius += 1;
    }
        }
    else if (this.radius > this.minRadius) {
        this.radius -= 1;
      }

    this.draw();
  }
  
}

var circleArray = []

function init() {
 
  circleArray = []
  for (var i= 0; i < 800; i++) {
    var x = Math.random() * (window.innerWidth - radius * 2) + radius;
    var y = Math.random() * (window.innerHeight - radius * 2) + radius;
    var dx = (Math.random() -0.5) * 2//speed/velocity at which object moves (how many pixels) neg to get neg. results
    var dy = (Math.random() -0.5) * 2
    var radius = Math.random () * 3 + 1
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}

//animates the objects
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight); //clear frames (x,y,w,h)

    for (var i = 0; i < circleArray.length; i++){
      circleArray[i].update()
    }
  }

animate()
init()