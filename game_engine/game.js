var canvasBg;
var contextBg;

var canvasBall;
var contextBall;

var ball;
var pad;
// var ball = new Ball();
// var x = 10;
// var y = 10;
// var dx = 2;
// var dy = 2;

function Drawable() {
	
	this.initialize = function(x,y) {
		this.x = x;
		this.y = y;
	};
	
	this.draw = function() {
		
	};
}

function Ball() {
	
	this.dx = 2;
	this.dy = 2;
	
	this.draw = function() {
		
		// drawPad();
	
		contextBall.beginPath();
		// contextBall.clearRect(this.x-5-3,this.y-5-3,5*2+6,5*2+6);
		contextBall.clearRect(0,0,canvasBall.width,canvasBall.height);
		contextBall.closePath();

		contextBall.beginPath();
		contextBall.fillStyle = "#0000ff";
		contextBall.arc(this.x, this.y, 5, 0, Math.PI*2, true);
		contextBall.closePath();
		contextBall.fill();
	
		if(this.x<0 || this.x>300)
			this.dx = -this.dx;
		if(this.y<0 || this.y>150)
			this.dy = -this.dy;
			
		// if((this.x+5)>pad.x && (this.x+5)<(pad.x+50) && (this.y+5)>pad.y && (this.y+5)<(pad.y+10)) {
			// // this.dx = -this.dx;
			// this.dy = -this.dy;
		// }
		
		if((this.x+5)>pad.x && (this.x-5)<(pad.x+50) && (this.y+5)>pad.y) {
			// this.dx = -this.dx;
			this.dy = -this.dy;
		}
		
		// if((this.x-5)>pad.x && (this.x-5)<(pad.x+50) && (this.y-5)<(pad.y+10)) {
			// this.dy = -this.dy;
		// }
		
		this.x += this.dx;
		this.y += this.dy;
	};
	
}

KEY_CODES = {
  
	37: 'left',
  	39: 'right',
};

KEY_STATUS = {};

for (code in KEY_CODES) {
  	
  	KEY_STATUS[ KEY_CODES[ code ]] = false;
}

document.onkeydown = function(e) {
  // Firefox and opera use charCode instead of keyCode to
  // return which key was pressed.
  	var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  	if (KEY_CODES[keyCode]) {
    	e.preventDefault();
    	KEY_STATUS[KEY_CODES[keyCode]] = true;
  	}
};

document.onkeyup = function(e) {
  	var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  		if (KEY_CODES[keyCode]) {
    	e.preventDefault();
    	KEY_STATUS[KEY_CODES[keyCode]] = false;
  	}
};

Ball.prototype = new Drawable();


function Pad() {
	
	this.hSpeed = 5;
	
	this.draw = function() {
		
		contextBg.clearRect(0,0,canvasBg.width,canvasBg.height);
		contextBg.fillRect(this.x,this.y,50,10);
	};
	
	this.move = function() {
		if(KEY_STATUS.left || KEY_STATUS.right) {
			contextBg.clearRect(0,0,canvasBg.width,canvasBg.height);
			
			if(KEY_STATUS.left) {
        		this.x -= this.hSpeed;
        	if (this.x <= 0) // Keep player within the screen
          		this.x = 0;
      		} else if (KEY_STATUS.right) {
        		this.x += this.hSpeed;
        	if (this.x >= 300-50)
          		this.x = 300 - 50;
      		}
		}
		this.draw();
	};
}

Pad.prototype = new Drawable();

// function draw() {
// 	
	// // drawPad();
// 	
	// context.beginPath();
	// context.clearRect(x-5-3,y-5-3,5*2+6,5*2+6);
	// context.closePath();
// 
	// context.beginPath();
	// context.fillStyle = "#0000ff";
	// context.arc(x,y,5,0,Math.PI*2,true);
	// context.closePath();
	// context.fill();
// 	
	// if(x<0 || x>300)
		// dx = -dx;
	// if(y<0 || y>150)
		// dy = -dy;
// 	
	// x += dx;
	// y += dy;
// }




function init() {
	
	canvasBg = document.getElementById('display');
	contextBg = canvasBg.getContext('2d');
	
	canvasBall = document.getElementById('ball');
	contextBall = canvasBall.getContext('2d');
	
	// this.ball = new Ball();
	// this.ball.initialize(10,10);
	ball = new Ball();
	ball.initialize(10,10);
	
	pad = new Pad();
	pad.initialize(120,140);

	// setInterval(draw,10);
	
	// setInterval(function(){this.ball.draw();},10);
	setInterval(function(){animate();},20);
}

function animate() {
	
	// this.ball = new Ball();
	// this.ball.initialize(10,10);
	
	ball.draw();
	pad.draw();
	pad.move();
}
// function movePad() {
// 	
// }
