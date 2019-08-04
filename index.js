var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var collb = 0;
var lifetime = 2;
var CircleArray = [];
var xperc=1;
var yperc=1;
//Button Options
var follow = 0;
var whitestroke = 0;


// Buttons
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



function Circle(x,y,dx,dy,radius,lt,maxlt){
	this.x = x;
	this.y = y;
	this.dx= dx;
	this.dy= dy;
	this.radius = radius;
	this.lt = lt;
	this.maxlt = maxlt;
	
	this.getRadius = function(){
		return this.radius;
	}
	
	this.draw = function(){
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		c.lineWidth = 2;/*
		if(follow==1){
			c.fillStyle = `rgba(200,${0+(250*xperc)},${0+(250*yperc)},${this.lt/this.maxlt})`;
			//c.strokeStyle = `rgba(200,${0+(250*xperc)},${0+(250*yperc)},${this.lt/this.maxlt})`;
			if(this.lt/this.maxlt < 0.99 && whitestroke==1){
				c.strokeStyle = 'white';
			}else{
				c.strokeStyle = `rgba(200,${0+(250*xperc)},${0+(250*yperc)},${this.lt/this.maxlt})`;
			}
		}
		else{
			c.fillStyle = `rgba(200,${0+(250*this.x/window.innerWidth)},${0+(250*this.y/window.innerHeight)},${this.lt/this.maxlt})`;
			//c.strokeStyle = `rgba(200,${0+(250*this.x/window.innerWidth)},${0+(250*this.y/window.innerHeight)},${this.lt/this.maxlt})`;	
		
			if(this.lt/this.maxlt < 0.99 && whitestroke==1){
				c.strokeStyle = 'white';
			}else{
				c.strokeStyle = `rgba(200,${0+(250*this.x/window.innerWidth)},${0+(250*this.y/window.innerHeight)},${this.lt/this.maxlt})`;
			}
		}
		c.stroke();
		c.fill();*/
		
		var red = document.getElementById("rvar").value;
		var green = document.getElementById("gvar").value;
		var blue = document.getElementById("bvar").value;
		if(follow==1){
			c.fillStyle = `rgba(${red},${green+((255-green)*xperc)},${blue+((255-blue)*yperc)},${this.lt/this.maxlt})`;
			//c.strokeStyle = `rgba(200,${0+(250*xperc)},${0+(250*yperc)},${this.lt/this.maxlt})`;
			if(this.lt/this.maxlt < 0.99 && whitestroke==1){
				c.strokeStyle = 'white';
			}else{
				c.strokeStyle = `rgba(${red},${green+((255-green)*xperc)},${blue+((255-blue)*yperc)},${this.lt/this.maxlt})`;
			}
		}
		else{
			c.fillStyle = `rgba(${red},${green+((255-green)*this.x/window.innerWidth)},${blue+((255-blue)*this.y/window.innerHeight)},${this.lt/this.maxlt})`;
			//c.strokeStyle = `rgba(200,${0+(250*this.x/window.innerWidth)},${0+(250*this.y/window.innerHeight)},${this.lt/this.maxlt})`;	
		
			if(this.lt/this.maxlt < 0.99 && whitestroke==1){
				c.strokeStyle = 'white';
			}else{
				c.strokeStyle = `rgba(${red},${green+((255-green)*this.x/window.innerWidth)},${blue+((255-blue)*this.y/window.innerHeight)},${this.lt/this.maxlt})`;
			}
		}
		c.stroke();
		c.fill();
		
	}
	this.update = function(){
			
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

function animate(){
	requestAnimationFrame(animate);
	
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var i=0;i < CircleArray.length; i++){
		CircleArray[i].update();
	}
	var el = document.getElementById('whitestroke');
	if(el){
		el.addEventListener('click', ws, false);
	}
	var el = document.getElementById('follow');
	if(el){
		el.addEventListener('click', foll, false);
	}
}



window.addEventListener('mousemove', function(e){
	for(var i=0;i<5;i++){
var radius = (Math.random() * 20) + 2;
var x= Math.random() * (innerWidth - radius * 2 ) + radius;
var y= Math.random() * (innerHeight - radius * 2 ) + radius;
var dy= (Math.random() *10) - 5;
var dx= (Math.random() *10) - 5;
var lt= Math.random() * lifetime;
var maxlt= lt;
CircleArray.push(new Circle(e.x,e.y,dx,dy, radius, lt, maxlt));
xperc = (e.x/window.innerWidth);
yperc = (e.y/window.innerHeight);
	}
	/*
c.fillStyle = `rgba(125,${0+(250*xperc)},${0+(250*yperc)},1)`;
c.strokeStyle = `rgba(125,${0+(250*xperc)},${0+(250*yperc)},1)`;*/
}
);

animate();

setInterval(dcrlt, 100);
function dcrlt(){
	for(var i=0;i<CircleArray.length;i++){
		try{
			CircleArray[i].lt -= 0.1;
		}catch{}
	}
}



/*
function animate(){
	requestAnimationFrame(animate);
	c.clearRect(0,0,innerWidth,innerHeight);
	for(var i=0;i < CircleArray.length; i++){
		CircleArray[i].update();
		collision(i);
	}
}
function collision(i){
		for(var j= i+1;j<=CircleArray.length;j++){
			try{
				a = CircleArray[i].radius + CircleArray[j].radius;
				x = CircleArray[i].x - CircleArray[j].x;
				y = CircleArray[i].y - CircleArray[j].y;
			if (a > Math.sqrt((x*x) + (y*y))){
				
				if(collb == 0){
					console.log("COLLISION");
					dx1 = CircleArray[i].dx;
					dy1 = CircleArray[i].dy;
					CircleArray[i].dx = CircleArray[j].dx;
					CircleArray[i].dy = CircleArray[j].dy;
					CircleArray[j].dx = dx1;
					CircleArray[j].dy = dy1;
				/*
				dx1 = (CircleArray[i].dx *(CircleArray[i].radius - CircleArray[j].radius) + (2 * CircleArray[j].radius * CircleArray[j].dx) )/(CircleArray[i].radius+CircleArray[j].radius);
				dy1 = (CircleArray[i].dy *(CircleArray[i].radius - CircleArray[j].radius) + (2 * CircleArray[j].radius * CircleArray[j].dy) )/(CircleArray[i].radius+CircleArray[j].radius);
				CircleArray[i].dx = dx1;
				CircleArray[i].dy = dy1;
				dx2 = (CircleArray[j].dx *(CircleArray[j].radius - CircleArray[i].radius) + (2 * CircleArray[i].radius * CircleArray[i].dx) )/(CircleArray[j].radius+CircleArray[i].radius);
				dy2 = (CircleArray[j].dy *(CircleArray[j].radius - CircleArray[i].radius) + (2 * CircleArray[i].radius * CircleArray[i].dy) )/(CircleArray[j].radius+CircleArray[i].radius);
				CircleArray[j].dx = dx2;
				CircleArray[j].dy = dy2;*/
				/*
				nx = (a-x)/2;
				ny = (a-y)/2;
				
				CircleArray[i].x += nx;
				CircleArray[j].x += ny;
				CircleArray[i].y += nx;
				CircleArray[j].y += ny;
			
				collb = 1;
				}else{
					collb = 0;
				}
			}else{
			}
			}catch{}
		}
	}

animate();
*/