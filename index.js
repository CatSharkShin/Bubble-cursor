//Making the canvas, and resizing it to match the users screen
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');


var lifetime = 2;	//Max lifetime of the bubbles
var CircleArray = [];	
var xperc=1;	//Pre declaring so that its global | These are gonna be percentages generated from the X pos of the mouse
var yperc=1;
var bubblenum = 5;	//Number of bubbles per move
var minrad = 2;
var maxrad = 30;
//Button Options
var follow = 0;
var whitestroke = 0;


// Button functions
function ws(){
	if(whitestroke == 0)whitestroke=1;
	else whitestroke=0;
	console.log("WS PUSHED");
}
function foll(){
	if(follow == 0)follow=1;
	else follow=0;
	console.log("F PUSHED");
}
function whitebg(){
	document.body.style.backgroundColor = 'white';
	document.body.style.color = "black";
}
function blackbg(){
	document.body.style.backgroundColor = 'black';
	document.body.style.color = "white";
}
function setbg(){	//BG and Text Color (text is backgrounds invert)
	document.body.style.backgroundColor = document.getElementById('bgcolor').value;
	document.body.style.color = invertColor(document.getElementById('bgcolor').value);
}


	//Color inverter for the text to match the bgcolor
function invertColor(hex) {		
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    // invert color components
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    // pad each with zeros and return
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}


function Circle(x,y,dx,dy,radius,lt,maxlt){ // DX and DX are the steps the bubbles take
	this.x = x;							
	this.y = y;							
	this.dx= dx;
	this.dy= dy;
	this.radius = radius;
	this.lt = lt;	//the current lifetime
	this.maxlt = maxlt; //the object's spawn lifetime
	
	this.draw = function(){		//Draws out the circle
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.lineWidth = 2;
		
		var red = document.getElementById("rvar").value;	//reading values from the inputs
		var green = document.getElementById("gvar").value;
		var blue = document.getElementById("bvar").value;
		if(follow==1){	//Gets the color from the mouse's position
			c.fillStyle = `rgba(${red},${green+((255-green)*xperc)},${blue+((255-blue)*yperc)},${this.lt/this.maxlt})`;
			if(this.lt/this.maxlt < 0.99 && whitestroke==1){	//The top circle won't have a white outline
				c.strokeStyle = 'white';
			}else{											//The top circle's outline
				c.strokeStyle = `rgba(${red},${green+((255-green)*xperc)},${blue+((255-blue)*yperc)},${this.lt/this.maxlt})`;
			}
		}				
		else{	//Gets the color from its position
			c.fillStyle = `rgba(${red},${green+((255-green)*this.x/window.innerWidth)},${blue+((255-blue)*this.y/window.innerHeight)},${this.lt/this.maxlt})`;
		
			if(this.lt/this.maxlt < 0.99 && whitestroke==1){	//The top circle won't have a white outline
				c.strokeStyle = 'white';
			}else{
				c.strokeStyle = `rgba(${red},${green+((255-green)*this.x/window.innerWidth)},${blue+((255-blue)*this.y/window.innerHeight)},${this.lt/this.maxlt})`;
			}
		}
		c.stroke();
		c.fill();
		
	}
	this.update = function(){	//Updates the circles' position and draws them
			
		if(this.lt >= 0){
			
		if(this.x > innerWidth-this.radius || this.x < this.radius){
			this.dx = -this.dx;
		}
		if(this.y > innerHeight-this.radius || this.y < this.radius){
			this.dy = -this.dy;
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
		}
		}
}

function animate(){		//Loop that updates and reads buttons
	requestAnimationFrame(animate);
	
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var i=0;i < CircleArray.length; i++){		//Update
		CircleArray[i].update();
	}
	var el = document.getElementById('whitestroke');	//White stroke button
	if(el){
		el.addEventListener('click', ws, false);
	}
	var el = document.getElementById('follow');			//Color fading button
	if(el){
		el.addEventListener('click', foll, false);
	}
	var el = document.getElementById('white');			//White background button
	if(el){
		el.addEventListener('click', whitebg, false);
	}
	var el = document.getElementById('black');			//Black background button
	if(el){
		el.addEventListener('click', blackbg, false);
	}
	var el = document.getElementById('set');			//Set button
	if(el){
		el.addEventListener('click', setbg, false);
	}
	
}



window.addEventListener('mousemove', function(e){	//Creating a circle when the mouse moves
if(document.getElementById('bubblenum'))
	bubblenum = document.getElementById('bubblenum').value;		//Reading the number of bubbles to create
if(document.getElementById('minrad'))
	minrad = document.getElementById('minrad').value;
if(document.getElementById('maxrad'))
	maxrad = document.getElementById('maxrad').value;
	for(var i=0;i<bubblenum;i++){
var radius = Math.random() * (maxrad-minrad) + minrad;
var x= Math.random() * (innerWidth - radius * 2 ) + radius;
var y= Math.random() * (innerHeight - radius * 2 ) + radius;
var dy= (Math.random() *10) - 5;
var dx= (Math.random() *10) - 5;
var lt= Math.random() * lifetime;
var maxlt= lt;
CircleArray.push(new Circle(e.x,e.y,dx,dy, radius, lt, maxlt));		//Creating the circle
xperc = (e.x/window.innerWidth);		//xperc and yperc are "percentages": 0 - 1(the maximum window height/width)
yperc = (e.y/window.innerHeight);
	}
}
);

animate();

setInterval(dcrlt, 100);	//Runs dcrlt every 100 milisecs~~
function dcrlt(){
	for(var i=0;i<CircleArray.length;i++){
		try{
			CircleArray[i].lt -= 0.1;			//Decreasing the circles
		}catch{}								//lifetimes so they decay over time
	}
}