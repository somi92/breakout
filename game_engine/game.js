var game = new GamePlay();

function Drawable() {
	
	this.initialize = function(x,y) {
		this.x = x;
		this.y = y;
	};
	
	this.draw = function() {
		
	};
}

function Ball() {
	
	var dx = 2;
	var dy = 2;
	
	var radius = 5;
	
	this.draw = function() {

		// contextBall.beginPath();
		// contextBall.clearRect(0,0,canvasBall.width,canvasBall.height);
		// contextBall.closePath();
// 
		// contextBall.beginPath();
		// contextBall.fillStyle = "#0000ff";
		// contextBall.arc(this.x, this.y, radius, 0, Math.PI*2, true);
		// contextBall.closePath();
		// contextBall.fill();
		
		this.context.beginPath();
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.context.closePath();

		this.context.beginPath();
		this.context.fillStyle = "#0000ff";
		this.context.arc(this.x, this.y, radius, 0, Math.PI*2, true);
		this.context.closePath();
		this.context.fill();
		
		// alert("!");
		
		if(this.x<0 || this.x>300)
			dx = -dx;
		if(this.y<0 || this.y>150)
			dy = -dy;
		
		if((this.x+radius)>pad.x && (this.x-radius)<(pad.x+50) && (this.y+radius)>pad.y && (this.y-radius)<(pad.y+10)) {
			// // this.dx = -this.dx;
			dy = -dy;
		} 
		
		if(this.y>(pad.y-2) && this.y<(pad.y+12) && (this.x+radius)>pad.x && (this.x-radius)<(pad.x+50)) {
			dx = -dx;
		}
		
		// alert("!");
		
		
		// this.ballTop = this.y-radius;
		// this.ballBottom = this.y+radius;
		// this.ballLeft = this.x-radius;
		// this.ballRight = this.x+radius;
// 		
		// this.padTop = pad.y;
		// this.padBottom = pad.y+10;
		// this.padLeft = pad.x;
		// this.padRight = pad.x+50;
		
		this.x += dx;
		this.y += dy;
		// alert("!");
	};
	
}

Ball.prototype = new Drawable();

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

function Pad() {
	
	var hSpeed = 5;
	this.padWidth = 50;
	this.padHeight = 10;
	
	this.draw = function() {
		
		// alert("!");
		
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.context.fillStyle = "#ffffff";
		this.context.fillRect(this.x,this.y,this.padWidth,this.padHeight);
		
	};
	
	this.move = function() {
		if(KEY_STATUS.left || KEY_STATUS.right) {
			this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
			
			if(KEY_STATUS.left) {
        		this.x -= hSpeed;
        	if (this.x <= 0)
          		this.x = 0;
      		} else if (KEY_STATUS.right) {
        		this.x += hSpeed;
        	if (this.x >= 300-this.padWidth)
          		this.x = 300 - this.padWidth;
      		}
      		this.draw();
		}
	};
}

Pad.prototype = new Drawable();

// function animate() {
// 	
	// ball.draw();
	// pad.draw();
	// pad.move();
// }

function GamePlay() {

	var ball;
	var pad;

	this.setUpGame = function() {
		
		this.canvasBg = document.getElementById('display');
		this.contextBg = this.canvasBg.getContext('2d');
	
		this.canvasBall = document.getElementById('ball');
		this.contextBall = this.canvasBall.getContext('2d');
		
		Ball.prototype.canvas = this.canvasBall;
		Ball.prototype.context = this.contextBall;
		
		Pad.prototype.canvas = this.canvasBg;
		Pad.prototype.context = this.contextBg;
	
		ball = new Ball();
		ball.initialize(10,10);
	
		pad = new Pad();
		pad.initialize(120,80);
		
		// alert("!");
		
	};
	
	
	var animate = function() {
		ball.draw();
		// alert("!");
		pad.draw();
		// alert("!");
		pad.move();
		// alert("!");
	};
	
	this.startGame = function() {
		setInterval(function(){animate();},2000);
		// setInterval(animate(),30);
	};
	
}

function init() {
	
	// canvasBg = document.getElementById('display');
	// contextBg = canvasBg.getContext('2d');
// 	
	// canvasBall = document.getElementById('ball');
	// contextBall = canvasBall.getContext('2d');
// 	
	// ball = new Ball();
	// ball.initialize(10,10);
// 	
	// pad = new Pad();
	// pad.initialize(120,80);
	
	// setInterval(function(){animate();},30);
	game.setUpGame();
	game.startGame();
}
