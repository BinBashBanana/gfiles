/*-------------------------------------------------------------------

	___________    ____   _____ _____    ____  
	\____ \__  \ _/ ___\ /     \\__  \  /    \ 
	|  |_> > __ \\  \___|  Y Y  \/ __ \|   |  \
	|   __(____  /\___  >__|_|  (____  /___|  /
	|__|       \/     \/      \/     \/     \/ .platzh1rsch.ch
	
	author: platzh1rsch		(www.platzh1rsch.ch)
	
-------------------------------------------------------------------*/

"use strict";

function geronimo() {
/* ----- Global Variables ---------------------------------------- */
	var canvas;
	var joystick;
	var context;
	var game;
	var canvas_walls, context_walls;
	var inky, blinky, clyde, pinky;

	var mapConfig = "data/map.json";


	/* AJAX stuff */
	function getHighscore() {
		setTimeout(ajax_get,30);
	}
	function ajax_get() {
		var date = new Date().getTime();
		$.ajax({
		   datatype: "json",
		   type: "GET",
		   url: "data/db-handler.php",
		   data: {
			 timestamp: date,
			 action: "get"
			 },
		   success: function(msg){
			 $("#highscore-list").text("");
			 for (var i = 0; i < msg.length; i++) {
				$("#highscore-list").append("<li>"+msg[i]['name']+"<span id='score'>"+msg[i]['score']+"</span></li>");
			 }
		   } 
		});
	}
	function ajax_add(n, s, l) {

		$.ajax({
		   type: 'POST',
		   url: 'data/db-handler.php',
		   data: {
			 action: 'add',
			 name: n,
			 score: s,
			 level: l
			 },
		   dataType: 'json',
		   success: function(data) {
				console.log('Highscore added: ' + data);
				$('#highscore-form').html('<span class="button" id="show-highscore">View Highscore List</span>');
			},
			error: function(errorThrown) {
				console.log(errorThrown);
			}
		});
	}

	function addHighscore() {
			var name = $("input[type=text]").val();
            $("#highscore-form").html("Saving highscore...");
            ajax_add(name ,game.score.score, game.level);
	}
	
	function buildWall(context,gridX,gridY,width,height) {
		console.log("BuildWall");
		width = width*2-1;
		height = height*2-1;
		context.fillRect(pacman.radius/2+gridX*2*pacman.radius,pacman.radius/2+gridY*2*pacman.radius, width*pacman.radius, height*pacman.radius);
	}
	
	function between(x, min, max) {
		return x >= min && x <= max;
	}


	// Logger
	var logger = function() {
	    var oldConsoleLog = null;
	    var pub = {};

	    pub.enableLogger =  function enableLogger() 
	                        {
	                            if(oldConsoleLog === null)
	                                return;

	                            window['console']['log'] = oldConsoleLog;
	                        };

	    pub.disableLogger = function disableLogger()
	                        {
	                            oldConsoleLog = console.log;
	                            window['console']['log'] = function() {};
	                        };

	    return pub;
	}();

	// stop watch to measure the time
	function Timer() {
		this.time_diff = 0;
		this.time_start = 0;
		this.time_stop = 0;
		this.start = function() {
			this.time_start = new Date().getTime();
		}
		this.stop = function() {
			this.time_stop = new Date().getTime();
			this.time_diff += this.time_stop - this.time_start;
			this.time_stop = 0;
			this.time_start = 0;
		}
		this.reset = function() {
			this.time_diff = 0;
			this.time_start = 0;
			this.time_stop = 0;
		}
		this.get_time_diff = function() {
			return this.time_diff;
		}
	}
	
	// Manages the whole game ("God Object")
	function Game() {
		this.timer = new Timer();
		this.refreshRate = 33;		// speed of the game, will increase in higher levels
		this.running = false;
		this.pause = true;
		this.score = new Score();
		this.soundfx = 0;
		this.map;
		this.pillCount;				// number of pills
		this.monsters;
		this.level = 1;
		this.refreshLevel = function(h) {
			$(h).html("Lvl: "+this.level);
		};
		this.gameOver = false;
		this.canvas = $("#myCanvas").get(0);
		this.wallColor = "Blue";
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.pillSize = 3;
		this.powerpillSizeMin = 2;
		this.powerpillSizeMax = 6;
		this.powerpillSizeCurrent = this.powerpillSizeMax;
		this.powerPillAnimationCounter = 0;
		this.nextPowerPillSize = function() {
			/*if (this.powerPillAnimationCounter === 3) {
				this.powerPillAnimationCounter = 0;
				this.powerpillSizeCurrent = this.powerpillSizeMin + this.powerpillSizeCurrent % (this.powerpillSizeMax-this.powerpillSizeMin);
			} else {
				this.powerPillAnimationCounter++;
			}*/
			return this.powerpillSizeCurrent;
		};
		
		this.ghostFrightened = false;
		this.ghostFrightenedTimer = 240;
		this.ghostMode = 0;			// 0 = Scatter, 1 = Chase
		this.ghostModeTimer = 200;	// decrements each animationLoop execution
		this.ghostSpeedNormal = (this.level > 4 ? 3 : 2);	// global default for ghost speed
		this.ghostSpeedDazzled = 2; // global default for ghost speed when dazzled
		
		/* Game Functions */
		this.startGhostFrightened = function() {
			console.log("ghost frigthened");
			this.ghostFrightened = true;
			this.ghostFrightenedTimer = 240;
			inky.dazzle();	
			pinky.dazzle();	
			blinky.dazzle();	
			clyde.dazzle();
		};

		this.endGhostFrightened = function() {
			console.log("ghost frigthened end");		
			this.ghostFrightened = false;
			inky.undazzle();
			pinky.undazzle();
			blinky.undazzle();
			clyde.undazzle();
			};
		
			
		this.checkGhostMode = function() {
			if (this.ghostFrightened) {
				
				this.ghostFrightenedTimer--;
				if (this.ghostFrightenedTimer === 0) {
					this.endGhostFrightened();
					this.ghostFrigthenedTimer = 240;
					/*inky.reverseDirection();
					pinky.reverseDirection();
					clyde.reverseDirection();
					blinky.reverseDirection();*/
				}
			}
			// always decrement ghostMode timer
			this.ghostModeTimer--;
			if (this.ghostModeTimer === 0 && game.level > 1) {
				this.ghostMode ^= 1;
				this.ghostModeTimer = 200 + this.ghostMode * 450;
				console.log("ghostMode=" + this.ghostMode);

				game.buildWalls();

				inky.reverseDirection();
				pinky.reverseDirection();
				clyde.reverseDirection();
				blinky.reverseDirection();
				}
		};
		
		this.getMapContent = function (x, y) {
			var maxX = game.width / 30 -1;
			var maxY = game.height / 30 -1;
			if (x < 0) x = maxX + x;
			if (x > maxX) x = x-maxX;
			if (y < 0) y = maxY + y;
			if (y > maxY) y = y-maxY;
			return this.map.posY[y].posX[x].type;
		};

		this.setMapContent = function (x,y,val) {
			this.map.posY[y].posX[x].type = val;
		};
		
		this.toggleSound = function() { 
			this.soundfx === 0 ? this.soundfx = 1 : this.soundfx = 0; 
			$('#mute').toggle();
			};

		this.reset = function() {
			};

		this.newGame = function() {
		    var r = confirm("Are you sure you want to restart?");
            if (r) {
        	    console.log("new Game");
                this.init(0);
                this.pauseResume();
            }
		};

		this.nextLevel = function() {
			this.level++;
            console.log("Level "+game.level);
			game.showMessage("Level "+game.level, this.getLevelTitle() + "<br/>(Click to continue!)");
			game.refreshLevel(".level");
			this.init(1);
		};

		this.drawHearts = function (count) {
			var html = "";
			for (var i = 0; i<count; i++) {
				html += " <img src='img/heart.png'>";
				}
			$(".lives").html("Lives: "+html);
			
		};

		this.showContent = function (id) {
			$('.content').hide();
			$('#'+id).show();
		};

		this.getLevelTitle = function() {
			switch(this.level) {
				case 2:
					return '"The chase begins"';
                    // activate chase / scatter switching
				case 3:
					return '"Inky\s awakening"';
                    // Inky starts leaving the ghost house
				case 4:
					return '"Clyde\s awakening"';
                    // Clyde starts leaving the ghost house
				case 5:
					return '"need for speed"';
                    // All the ghosts get faster from now on
                case 6:
                    return '"hunting season 1"';
                    // TODO: No scatter mood this time
                case 7:
                    return '"the big calm"';
                    // TODO: Only scatter mood this time
                case 8:
                    return '"hunting season 2"';
                    // TODO: No scatter mood and all ghosts leave instantly
                case 9:
                    return '"ghosts on speed"';
                    // TODO: Ghosts get even faster for this level
				default:
					return '"nothing new"';
			}
		}

		this.showMessage = function(title, text) {
			this.timer.stop();
			this.pause = true;
			$('#canvas-overlay-container').fadeIn(200);
			if ($('.controls').css('display') != "none") $('.controls').slideToggle(200);
			$('#canvas-overlay-content #title').text(title);
			$('#canvas-overlay-content #text').html(text);
		};

		this.closeMessage = function() {
			$('#canvas-overlay-container').fadeOut(200);
			$('.controls').slideToggle(200);
		};

		this.pauseResume = function () {
			if (!this.running) {
				// start timer
				this.timer.start();

				this.pause = false;
				this.running = true;
				this.closeMessage();
				animationLoop();
			}
			else if (this.pause) {
				// stop timer
				this.timer.stop();

				this.pause = false;
				this.closeMessage();
				}
			else {
				this.showMessage("Pause","Click to Resume");
				}
			};

		this.init = function (state) {
			
			console.log("init game "+state);

			// reset timer if restart
			if( state === 0 ) {
                this.timer.reset();
			}
			
			// get Level Map
			$.ajax({
				url: mapConfig,
				async: false,
				 beforeSend: function(xhr){
					if (xhr.overrideMimeType) xhr.overrideMimeType("application/json"); 
				},
				dataType: "json",
				success: function (data) {
					game.map =  data;
				}
			});
		
			var temp = 0;
			$.each(this.map.posY, function(i, item) {
			   $.each(this.posX, function() { 
				   if (this.type == "pill") {
					temp++;
					//console.log("Pill Count++. temp="+temp+". PillCount="+this.pillCount+".");
					}
				});
			});
			
			this.pillCount = temp;
	
			if (state === 0) {
				this.score.set(0);
				this.score.refresh(".score");
				pacman.lives = 3;
				game.level = 1;
				this.refreshLevel(".level");
				game.gameOver = false;
				}
			pacman.reset();
			
			game.drawHearts(pacman.lives);	
			
			this.ghostFrightened = false;
			this.ghostFrightenedTimer = 240;
			this.ghostMode = 0;			// 0 = Scatter, 1 = Chase
			this.ghostModeTimer = 200;	// decrements each animationLoop execution
			
			// initalize Ghosts, avoid memory flooding
			if (pinky === null || pinky === undefined) {
				pinky = new Ghost("pinky",7,5,'img/pinky.svg',2,2);
				inky = new Ghost("inky",8,5,'img/inky.svg',13,11);
				blinky = new Ghost("blinky",9,5,'img/blinky.svg',13,0);
				clyde = new Ghost("clyde",10,5,'img/clyde.svg',2,11);
			}
			else {
				//console.log("ghosts reset");
				pinky.reset();
				inky.reset();
				blinky.reset();
				clyde.reset();
			}
			blinky.start();	// blinky is the first to leave ghostHouse
			inky.start();
			pinky.start();
			clyde.start();
		};

		this.check = function() {
		if ((this.pillCount === 0) && game.running) {
				this.nextLevel();
			}
		};

		this.win = function () {};
		this.gameover = function () {};

		this.toPixelPos = function (gridPos) {
			return gridPos*30;
		};

		this.toGridPos = function (pixelPos) {
			return ((pixelPos % 30)/30);
		};

		/* ------------ Start Pre-Build Walls  ------------ */
		this.buildWalls = function() {
			if (this.ghostMode === 0) game.wallColor = "Blue";
			else game.wallColor = "Red";
			canvas_walls = document.createElement('canvas');
			canvas_walls.width = game.canvas.width;
			canvas_walls.height = game.canvas.height;
			context_walls = canvas_walls.getContext("2d");

			context_walls.fillStyle = game.wallColor;
			context_walls.strokeStyle = game.wallColor;
			
			//horizontal outer
			buildWall(context_walls,0,0,18,1);
			buildWall(context_walls,0,12,18,1);
			
			// vertical outer
			buildWall(context_walls,0,0,1,6);
			buildWall(context_walls,0,7,1,6);
			buildWall(context_walls,17,0,1,6);
			buildWall(context_walls,17,7,1,6);
			
			// ghost base
			buildWall(context_walls,7,4,1,1);
			buildWall(context_walls,6,5,1,2);
			buildWall(context_walls,10,4,1,1);
			buildWall(context_walls,11,5,1,2);
			buildWall(context_walls,6,6,6,1);
			
			// ghost base door
			context_walls.fillRect(8*2*pacman.radius,pacman.radius/2+4*2*pacman.radius+5, 4*pacman.radius, 1);
			
			// single blocks
			buildWall(context_walls,4,0,1,2);
			buildWall(context_walls,13,0,1,2);
			
			buildWall(context_walls,2,2,1,2);
			buildWall(context_walls,6,2,2,1);
			buildWall(context_walls,15,2,1,2);
			buildWall(context_walls,10,2,2,1);
			
			buildWall(context_walls,2,3,2,1);
			buildWall(context_walls,14,3,2,1);
			buildWall(context_walls,5,3,1,1);
			buildWall(context_walls,12,3,1,1);
			buildWall(context_walls,3,3,1,3);
			buildWall(context_walls,14,3,1,3);
			
			buildWall(context_walls,3,4,1,1);
			buildWall(context_walls,14,4,1,1);
			
			buildWall(context_walls,0,5,2,1);
			buildWall(context_walls,3,5,2,1);
			buildWall(context_walls,16,5,2,1);
			buildWall(context_walls,13,5,2,1);
			
			buildWall(context_walls,0,7,2,2);
			buildWall(context_walls,16,7,2,2);
			buildWall(context_walls,3,7,2,2);
			buildWall(context_walls,13,7,2,2);
			
			buildWall(context_walls,4,8,2,2);
			buildWall(context_walls,12,8,2,2);
			buildWall(context_walls,5,8,3,1);
			buildWall(context_walls,10,8,3,1);
			
			buildWall(context_walls,2,10,1,1);
			buildWall(context_walls,15,10,1,1);
			buildWall(context_walls,7,10,4,1);
			buildWall(context_walls,4,11,2,2);
			buildWall(context_walls,12,11,2,2);
			/* ------------ End Pre-Build Walls  ------------ */
		};

	}

	game = new Game();



	function Score() {
		this.score = 0;
		this.set = function(i) {
			this.score = i;
		};
		this.add = function(i) {
			this.score += i;
		};
		this.refresh = function(h) {
			$(h).html("Score: "+this.score);
		};
		
	}
	
	
	
	// used to play sounds during the game
	var Sound = {};
	Sound.play = function (sound) {
		if (game.soundfx == 1) {
			var audio = document.getElementById(sound);
			(audio !== null) ? audio.play() : console.log(sound+" not found");
			}
	};
	
	
	// Direction object in Constructor notation
	function Direction(name,angle1,angle2,dirX,dirY) {
		this.name = name;
		this.angle1 = angle1;
		this.angle2 = angle2;
		this.dirX = dirX;
		this.dirY = dirY;
		this.equals = function(dir) {
			return  JSON.stringify(this) ==  JSON.stringify(dir);
		};
	}
	
	// Direction Objects
	var up = new Direction("up",1.75,1.25,0,-1);		// UP
	var left = new Direction("left",1.25,0.75,-1,0);	// LEFT
	var down = new Direction("down",0.75,0.25,0,1);		// DOWN
	var right = new Direction("right",0.25,1.75,1,0);	// 
	/*var directions = [{},{},{},{}];
	directions[0] = up;
	directions[1] = down;
	directions[2] = right;
	directions[3] = left;*/
	
	
	// DirectionWatcher
	function directionWatcher() {
		this.dir = null;
		this.set = function(dir) {
			this.dir = dir;
		};
		this.get = function() {
			return this.dir;
		};
	}
		
	//var directionWatcher = new directionWatcher();
	
	// Ghost object in Constructor notation
	function Ghost(name, gridPosX, gridPosY, image, gridBaseX, gridBaseY) {
		this.name = name;
		this.posX = gridPosX * 30;
		this.posY = gridPosY * 30;
		this.startPosX = gridPosX * 30;
		this.startPosY = gridPosY * 30;
		this.gridBaseX = gridBaseX;
		this.gridBaseY = gridBaseY;
		this.speed = game.ghostSpeedNormal;
		this.images = JSON.parse(
			'{"normal" : {'
				+ '"inky" : "0",'
				+ '"pinky" : "1",'
				+ '"blinky" : "2",'
				+ '"clyde" : "3"'
				+ '},'
			+
			'"frightened1" : {'
				+
				'"left" : "", "up": "", "right" : "", "down": ""},'
			+
			'"frightened2" : {'
				+
				'"left" : "", "up": "", "right" : "", "down": ""},'
			+
			'"dead" : {'
				+
				'"left" : "", "up": "", "right" : "", "down": ""}}'
			);
		this.image = new Image();
		this.image.src = image;
		this.ghostHouse = true;
		this.dazzled = false;
        this.dead = false;
		this.dazzle = function() {
			this.changeSpeed(game.ghostSpeedDazzled);
			// ensure ghost doesnt leave grid
			if (this.posX > 0) this.posX = this.posX - this.posX % this.speed;
			if (this.posY > 0) this.posY = this.posY - this.posY % this.speed;
			this.dazzled = true;
		}
		this.undazzle = function() {
			// only change speed if ghost is not "dead"
			if (!this.dead) this.changeSpeed(game.ghostSpeedNormal);
			// ensure ghost doesnt leave grid
			if (this.posX > 0) this.posX = this.posX - this.posX % this.speed;
			if (this.posY > 0) this.posY = this.posY - this.posY % this.speed;
			this.dazzled = false;
		}
		this.dazzleImg = new Image();
		this.dazzleImg.src = 'img/dazzled.svg';
		this.dazzleImg2 = new Image();
		this.dazzleImg2.src = 'img/dazzled2.svg';
		this.deadImg = new Image();
		this.deadImg.src = 'img/dead.svg';
		this.direction = right;
		this.radius = pacman.radius;
		this.draw = function (context) {					
			if (this.dead) {
				context.drawImage(this.deadImg, this.posX, this.posY, 2*this.radius, 2*this.radius);
			}
			else if (this.dazzled) {
				if (pacman.beastModeTimer < 50 && pacman.beastModeTimer % 8 > 1) {
					context.drawImage(this.dazzleImg2, this.posX, this.posY, 2*this.radius, 2*this.radius);
				} else {
					context.drawImage(this.dazzleImg, this.posX, this.posY, 2*this.radius, 2*this.radius);
				}
			}
			else context.drawImage(this.image, this.posX, this.posY, 2*this.radius, 2*this.radius);
		}
		this.getCenterX = function () {
			return this.posX+this.radius;
		}
		this.getCenterY = function () {
			return this.posY+this.radius;
		}
		
		this.reset = function() {
			this.dead = false;
			this.posX = this.startPosX;
			this.posY = this.startPosY;
			this.ghostHouse = true;
			this.undazzle();
		}
		
		this.die = function() {
            if (!this.dead) {
                game.score.add(100);
                //this.reset();
                this.dead = true;
                this.changeSpeed(game.ghostSpeedNormal);
            }
		}
		this.changeSpeed = function(s) {
			// adjust gridPosition to new speed
			this.posX = Math.round(this.posX / s) * s;
			this.posY = Math.round(this.posY / s) * s;
			this.speed = s;
		}
		
		this.move = function() {
		
			this.checkDirectionChange();
			this.checkCollision();
		
			// leave Ghost House
			if (this.ghostHouse == true) {
			
				// Clyde does not start chasing before 2/3 of all pills are eaten and if level is < 4
				if (this.name == "clyde") {
					if ((game.level < 4) || ((game.pillCount > 104/3))) this.stop = true;
					else this.stop = false;
				}
				// Inky starts after 30 pills and only from the third level on
				if (this.name == "inky") {
					if ((game.level < 3) || ((game.pillCount > 104-30))) this.stop = true;
					else this.stop = false;
				}
				
				if ((this.getGridPosY() == 5) && this.inGrid()) {
					if ((this.getGridPosX() == 7)) this.setDirection(right);
					if ((this.getGridPosX() == 8) || this.getGridPosX() == 9) this.setDirection(up);
					if ((this.getGridPosX() == 10)) this.setDirection(left);
				}
				if ((this.getGridPosY() == 4) && ((this.getGridPosX() == 8) || (this.getGridPosX() == 9)) && this.inGrid()) { 
					console.log("ghosthouse -> false");
					this.ghostHouse = false;
					}
			}
			
			if (!this.stop) {
			// Move
				this.posX += this.speed * this.dirX;
				this.posY += this.speed * this.dirY;
				
				// Check if out of canvas
				if (this.posX >= game.width-this.radius) this.posX = this.speed-this.radius;
				if (this.posX <= 0-this.radius) this.posX = game.width-this.speed-this.radius;
				if (this.posY >= game.height-this.radius) this.posY = this.speed-this.radius;
				if (this.posY <= 0-this.radius) this.posY = game.height-this.speed-this.radius;
			}
		}
			
		this.checkCollision = function() {
		  
			/* Check Back to Home */
			if (this.dead && (this.getGridPosX() == this.startPosX /30) && (this.getGridPosY() == this.startPosY / 30)) this.reset();
			else {

				/* Check Ghost / Pacman Collision			*/
				if ((between(pacman.getCenterX(), this.getCenterX()-10, this.getCenterX()+10)) 
					&& (between(pacman.getCenterY(), this.getCenterY()-10, this.getCenterY()+10)))
				{
					if ((!this.dazzled) && (!this.dead)) {
						pacman.die();
						}
					else {                            
                        this.die();
					}
				}
			}
		}
		
		/* Pathfinding */
		this.getNextDirection = function() {
			// get next field
			var pX = this.getGridPosX();
			var pY= this.getGridPosY();
			game.getMapContent(pX,pY);
			var u, d, r, l; 			// option up, down, right, left
			
			// get target
			if (this.dead) {			// go Home
				var tX = this.startPosX / 30;
				var tY = this.startPosY / 30;
				}
			else if (game.ghostMode == 0) {			// Scatter Mode
				var tX = this.gridBaseX;
				var tY = this.gridBaseY;
			} else if (game.ghostMode == 1) {			// Chase Mode
				
				switch (this.name) {
				
				// target: 4 ahead and 4 left of pacman
				case "pinky":
					var pdir = pacman.direction;
					var pdirX = pdir.dirX == 0 ? - pdir.dirY : pdir.dirX;
					var pdirY = pdir.dirY == 0 ? - pdir.dirX : pdir.dirY;
					
					var tX = (pacman.getGridPosX() + pdirX*4) % (game.width / pacman.radius +1);
					var tY = (pacman.getGridPosY() + pdirY*4) % (game.height / pacman.radius +1);
					break;
				
				// target: pacman
				case "blinky":
					var tX = pacman.getGridPosX();
					var tY = pacman.getGridPosY();
					break;
				
				// target: 
				case "inky":
					var tX = pacman.getGridPosX() + 2*pacman.direction.dirX;
					var tY = pacman.getGridPosY() + 2*pacman.direction.dirY;
					var vX = tX - blinky.getGridPosX();
					var vY = tY - blinky.getGridPosY();
					tX = Math.abs(blinky.getGridPosX() + vX*2);
					tY = Math.abs(blinky.getGridPosY() + vY*2);
					break;
				
				// target: pacman, until pacman is closer than 5 grid fields, then back to scatter
				case "clyde":
					var tX = pacman.getGridPosX();
					var tY = pacman.getGridPosY();
					var dist = Math.sqrt(Math.pow((pX-tX),2) + Math.pow((pY - tY),2));
					
					if (dist < 5) {
						tX = this.gridBaseX;
						tY = this.gridBaseY;
					}
					break;
				
				}
			}	
			
			
			var oppDir = this.getOppositeDirection();	// ghosts are not allowed to change direction 180�
			
			var dirs = [{},{},{},{}];		
			dirs[0].field = game.getMapContent(pX,pY-1);
			dirs[0].dir = up;
			dirs[0].distance = Math.sqrt(Math.pow((pX-tX),2) + Math.pow((pY -1 - tY),2));
			
			dirs[1].field = game.getMapContent(pX,pY+1);
			dirs[1].dir = down;
			dirs[1].distance = Math.sqrt(Math.pow((pX-tX),2) + Math.pow((pY+1 - tY),2));
			
			dirs[2].field = game.getMapContent(pX+1,pY);
			dirs[2].dir = right;
			dirs[2].distance = Math.sqrt(Math.pow((pX+1-tX),2) + Math.pow((pY - tY),2));
			
			dirs[3].field = game.getMapContent(pX-1,pY);
			dirs[3].dir = left;
			dirs[3].distance = Math.sqrt(Math.pow((pX-1-tX),2) + Math.pow((pY - tY),2));
			
			// Sort possible directions by distance
			function compare(a,b) {
			  if (a.distance < b.distance)
				 return -1;
			  if (a.distance > b.distance)
				return 1;
			  return 0;
			}
			var dirs2 = dirs.sort(compare);
			
			var r = this.dir;
			var j;
			
			if (this.dead) {
				for (var i = dirs2.length-1; i >= 0; i--) {
					if ((dirs2[i].field != "wall") && !(dirs2[i].dir.equals(this.getOppositeDirection()))) {
					r = dirs2[i].dir;
					}
				}
			}
			else {
				for (var i = dirs2.length-1; i >= 0; i--) {
					if ((dirs2[i].field != "wall") && (dirs2[i].field != "door") && !(dirs2[i].dir.equals(this.getOppositeDirection()))) {
						r = dirs2[i].dir;
						}
				}		
			}
			this.directionWatcher.set(r);
			return r;
		}
		this.setRandomDirection = function() {
			 var dir = Math.floor((Math.random()*10)+1)%5;
				
			 switch(dir) {
				case 1:	
					if (this.getOppositeDirection().equals(up)) this.setDirection(down);
					else this.setDirection(up);
					break;
				case 2:	
					if (this.getOppositeDirection().equals(down)) this.setDirection(up);
					else this.setDirection(down);
					break;
				case 3: 
					if (this.getOppositeDirection().equals(right)) this.setDirection(left);				
					else this.setDirection(right);
					break;
				case 4:		
					if (this.getOppositeDirection().equals(left)) this.setDirection(right);				
					else this.setDirection(left);
					break;
			 }
		}
		this.reverseDirection = function() {
			console.log("reverseDirection: "+this.direction.name+" to "+this.getOppositeDirection().name);
			this.directionWatcher.set(this.getOppositeDirection());
		}
		
	}
	
	Ghost.prototype = new Figure();
	
	// Super Class for Pacman & Ghosts
	function Figure() {
		this.posX;
		this.posY;
		this.speed;
		this.dirX = right.dirX;
		this.dirY = right.dirY;
		this.direction;
		this.stop = true;
		this.directionWatcher = new directionWatcher();
		this.getNextDirection = function() { console.log("Figure getNextDirection");};
		this.checkDirectionChange = function() {
			if (this.inGrid() && (this.directionWatcher.get() == null)) this.getNextDirection();
			if ((this.directionWatcher.get() != null) && this.inGrid()) {
				//console.log("changeDirection to "+this.directionWatcher.get().name);
				this.setDirection(this.directionWatcher.get());
				this.directionWatcher.set(null);
			}
			
		}
	
		
		this.inGrid = function() {
			if((this.posX % (2*this.radius) === 0) && (this.posY % (2*this.radius) === 0)) return true;
			return false;
		}
		this.getOppositeDirection = function() {
			if (this.direction.equals(up)) return down;
			else if (this.direction.equals(down)) return up;
			else if (this.direction.equals(right)) return left;
			else if (this.direction.equals(left)) return right;
		}
		this.move = function() {
		
			if (!this.stop) {
				this.posX += this.speed * this.dirX;
				this.posY += this.speed * this.dirY;
				
				// Check if out of canvas
				if (this.posX >= game.width-this.radius) this.posX = this.speed-this.radius;
				if (this.posX <= 0-this.radius) this.posX = game.width-this.speed-this.radius;
				if (this.posY >= game.height-this.radius) this.posY = this.speed-this.radius;
				if (this.posY <= 0-this.radius) this.posY = game.height-this.speed-this.radius;
				}
			}
		this.stop = function() { this.stop = true;}
		this.start = function() { this.stop = false;}
		
		this.getGridPosX = function() {
			return (this.posX - (this.posX % 30))/30;
		}
		this.getGridPosY = function() {
			return (this.posY - (this.posY % 30))/30;
		}
		this.setDirection = function(dir) {			
			this.dirX = dir.dirX;
			this.dirY = dir.dirY;
			this.angle1 = dir.angle1;
			this.angle2 = dir.angle2;
			this.direction = dir;
		}
		this.setPosition = function(x, y) {
			this.posX = x;
			this.posY = y;
		}
	}
	
	function pacman() {
		this.radius = 15;
		this.posX = 0;
		this.posY = 6*2*this.radius;
		this.speed = 5;
		this.angle1 = 0.25;
		this.angle2 = 1.75;
		this.mouth = 1; /* Switches between 1 and -1, depending on mouth closing / opening */
		this.dirX = right.dirX;
		this.dirY = right.dirY;
		this.lives = 3;
		this.stuckX = 0;
		this.stuckY = 0;
		this.frozen = false;		// used to play die Animation
		this.freeze = function () {
			this.frozen = true;
		}
		this.unfreeze = function() {
			this.frozen = false;
		}
		this.getCenterX = function () {
			return this.posX+this.radius;
		}
		this.getCenterY = function () {
			return this.posY+this.radius;
		}
		this.directionWatcher = new directionWatcher();
		
		this.direction = right;
		
		this.beastMode = false;
		this.beastModeTimer = 0;
		
		this.checkCollisions = function () {
			
			if ((this.stuckX == 0) && (this.stuckY == 0) && this.frozen == false) {
				
				// Get the Grid Position of Pac
				var gridX = this.getGridPosX();
				var gridY = this.getGridPosY();
				var gridAheadX = gridX;
				var gridAheadY = gridY;
				
				var field = game.getMapContent(gridX, gridY);

				// get the field 1 ahead to check wall collisions
				if ((this.dirX == 1) && (gridAheadX < 17)) gridAheadX += 1;
				if ((this.dirY == 1) && (gridAheadY < 12)) gridAheadY += 1;
				var fieldAhead = game.getMapContent(gridAheadX, gridAheadY);

				
				/*	Check Pill Collision			*/
				if ((field === "pill") || (field === "powerpill")) {
					//console.log("Pill found at ("+gridX+"/"+gridY+"). Pacman at ("+this.posX+"/"+this.posY+")");
					if (
						((this.dirX == 1) && (between(this.posX, game.toPixelPos(gridX)+this.radius-5, game.toPixelPos(gridX+1))))
						|| ((this.dirX == -1) && (between(this.posX, game.toPixelPos(gridX), game.toPixelPos(gridX)+5)))
						|| ((this.dirY == 1) && (between(this.posY, game.toPixelPos(gridY)+this.radius-5, game.toPixelPos(gridY+1))))
						|| ((this.dirY == -1) && (between(this.posY, game.toPixelPos(gridY), game.toPixelPos(gridY)+5)))
						|| (fieldAhead === "wall")
						)
						{	var s;
							if (field === "powerpill") {
								Sound.play("powerpill");
								s = 50;
								this.enableBeastMode();
								game.startGhostFrightened();
								}
							else {
								Sound.play("waka");
								s = 10;
								game.pillCount--;
								}
							game.map.posY[gridY].posX[gridX].type = "null";
							game.score.add(s);
						}
				}
				
				/*	Check Wall Collision			*/
				if ((fieldAhead === "wall") || (fieldAhead === "door")) {
					this.stuckX = this.dirX;
					this.stuckY = this.dirY;
					pacman.stop();
					// get out of the wall
					if ((this.stuckX == 1) && ((this.posX % 2*this.radius) != 0)) this.posX -= 5;
					if ((this.stuckY == 1) && ((this.posY % 2*this.radius) != 0)) this.posY -= 5;
					if (this.stuckX == -1) this.posX += 5;
					if (this.stuckY == -1) this.posY += 5;
				}
				
			}
		}
		this.checkDirectionChange = function() {
			if (this.directionWatcher.get() != null) {
				//console.log("next Direction: "+directionWatcher.get().name);

				if ((this.stuckX == 1) && this.directionWatcher.get() == right) this.directionWatcher.set(null);
				else {
					// reset stuck events
					this.stuckX = 0;
					this.stuckY = 0;
					

					// only allow direction changes inside the grid
					if ((this.inGrid())) {
						//console.log("changeDirection to "+directionWatcher.get().name);
						
						// check if possible to change direction without getting stuck
						console.log("x: "+this.getGridPosX()+" + "+this.directionWatcher.get().dirX);
						console.log("y: "+this.getGridPosY()+" + "+this.directionWatcher.get().dirY);
						var x = this.getGridPosX()+this.directionWatcher.get().dirX;
						var y = this.getGridPosY()+this.directionWatcher.get().dirY;
						if (x <= -1) x = game.width/(this.radius*2)-1;
						if (x >= game.width/(this.radius*2)) x = 0;
						if (y <= -1) x = game.height/(this.radius*2)-1;
						if (y >= game.heigth/(this.radius*2)) y = 0;

						console.log("x: "+x);
						console.log("y: "+y);
						var nextTile = game.map.posY[y].posX[x].type;
						console.log("checkNextTile: "+nextTile);

						if (nextTile != "wall") {
							this.setDirection(this.directionWatcher.get());
							this.directionWatcher.set(null);
						}
					}
				}
			}
		}
		this.setDirection = function(dir) {
			if (!this.frozen) {
				this.dirX = dir.dirX;
				this.dirY = dir.dirY;
				this.angle1 = dir.angle1;
				this.angle2 = dir.angle2;
				this.direction = dir;
			}
		}
		this.enableBeastMode = function() {
			this.beastMode = true;
			this.beastModeTimer = 240;
			//console.log("Beast Mode activated!");
			inky.dazzle();
			pinky.dazzle();
			blinky.dazzle();
			clyde.dazzle();
		};
		this.disableBeastMode = function() { 
			this.beastMode = false; 
			//console.log("Beast Mode is over!");
			inky.undazzle();
			pinky.undazzle();
			blinky.undazzle();
			clyde.undazzle();
			};
		this.move = function() {
		
			if (!this.frozen) {
				if (this.beastModeTimer > 0) {
					this.beastModeTimer--;
					//console.log("Beast Mode: "+this.beastModeTimer);
					}
				if ((this.beastModeTimer == 0) && (this.beastMode == true)) this.disableBeastMode();
				
				this.posX += this.speed * this.dirX;
				this.posY += this.speed * this.dirY;
				
				// Check if out of canvas
				if (this.posX >= game.width-this.radius) this.posX = 5-this.radius;
				if (this.posX <= 0-this.radius) this.posX = game.width-5-this.radius;
				if (this.posY >= game.height-this.radius) this.posY = 5-this.radius;
				if (this.posY <= 0-this.radius) this.posY = game.height-5-this.radius;
			}
			else this.dieAnimation();
		}
		
		this.eat = function () {
		
			if (!this.frozen) {
				if (this.dirX == this.dirY == 0) {
				
					this.angle1 -= this.mouth*0.07;
					this.angle2 += this.mouth*0.07;
					
					var limitMax1 = this.direction.angle1;
					var limitMax2 = this.direction.angle2;
					var limitMin1 = this.direction.angle1 - 0.21;
					var limitMin2 = this.direction.angle2 + 0.21;
						
					if (this.angle1 < limitMin1 || this.angle2 > limitMin2)
					{
						this.mouth = -1;
					}
					if (this.angle1 >= limitMax1 || this.angle2 <= limitMax2)
					{
						this.mouth = 1;
					}
				}
			}
		}
		this.stop = function() {
			this.dirX = 0;
			this.dirY = 0;
		}
		this.reset = function() {
			this.unfreeze();
			this.posX = 0;
			this.posY = 6*2*this.radius;
			this.setDirection(right);
			this.stop();
			this.stuckX = 0;
			this.stuckY = 0;
			//console.log("reset pacman");
		}
		this.dieAnimation = function() {
			this.angle1 += 0.05;
			this.angle2 -= 0.05;
			if (this.angle1 >= this.direction.angle1+0.7 || this.angle2 <= this.direction.angle2-0.7) {
				this.dieFinal();
				}
		}
		this.die = function() {
			Sound.play("die");
			this.freeze();
			this.dieAnimation();
			}
		this.dieFinal = function() {
			this.reset();
			pinky.reset();
			inky.reset();
			blinky.reset();
			clyde.reset();
    		this.lives--;
	        console.log("pacman died, "+this.lives+" lives left");
	    	if (this.lives <= 0) {
				var input = "<div id='highscore-form'><span id='form-validater'></span><input type='text' id='playerName'/><span class='button' id='score-submit'>save</span></div>";
				game.showMessage("Game over","Total Score: "+game.score.score+input);
				game.gameOver = true;
				$('#playerName').focus();
				}
			game.drawHearts(this.lives);
		}
		this.getGridPosX = function() {
			return (this.posX - (this.posX % 30))/30;
		}
		this.getGridPosY = function() {
			return (this.posY - (this.posY % 30))/30;
		}
	}
	pacman.prototype = new Figure();
	var pacman = new pacman();
	game.buildWalls();

	
// Check if a new cache is available on page load.	 
function checkAppCache() {
	console.log('check AppCache');
	window.applicationCache.addEventListener('updateready', function(e) 
	{
		console.log("AppCache: updateready");
		if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {

			// Browser downloaded a new app cache.
			// Swap it in and reload the page to get the new hotness.
			window.applicationCache.swapCache();
			if (confirm('A new version of this site is available. Load it?')) {
				window.location.reload();
			}

		} else {
		// Manifest didn't change. Nothing new to server.
		}
	}, false);
	
	window.applicationCache.addEventListener('cached', function(e) 
	{
		console.log("AppCache: cached");
	}, false);
    
}

	
	// Action starts here:
	
	function hideAdressbar() {
		console.log("hide adressbar");
		$("html").scrollTop(1);
		$("body").scrollTop(1);
	}
	
	$(document).ready(function() {	
	
		$.ajaxSetup({ mimeType: "application/json" });
		
		$.ajaxSetup({beforeSend: function(xhr){
			if (xhr.overrideMimeType){
				xhr.overrideMimeType("application/json");
				//console.log("mimetype set to json");
				}
			}
		});
		
		// Hide address bar
		hideAdressbar();
		
		if (window.applicationCache != null) checkAppCache();
		
		/* -------------------- EVENT LISTENERS -------------------------- */
		
		// Listen for resize changes
		/*window.addEventListener("resize", function() {
			// Get screen size (inner/outerWidth, inner/outerHeight)
			// deactivated because of problems
			if ((window.outerHeight < window.outerWidth) && (window.outerHeight < 720)) {
			game.showMessage("Rotate Device","Your screen is too small to play in landscape view.");
			console.log("rotate your device to portrait!");
			}
		}, false);*/
		
		
		// --------------- Controls
		
		
		// Keyboard
		window.addEventListener('keydown',doKeyDown,true);
		
		$('#canvas-container').click(function() {
			if (!(game.gameOver == true))	game.pauseResume();
		});

		$('body').on('click', '#score-submit', function(){
			console.log("submit highscore pressed");
			if ($('#playerName').val() === "" || $('#playerName').val() === undefined) {
				$('#form-validater').html("Please enter a name<br/>");
			} else {
				$('#form-validater').html("");
				addHighscore();
			}
		});

		$('body').on('click', '#show-highscore', function(){
			game.showContent('highscore-content');
			getHighscore();
		});
		
		// Hammerjs Touch Events
		/*Hammer('#canvas-container').on("tap", function(event) {
			if (!(game.gameOver == true))	game.pauseResume();
		});*/
		Hammer('.container').on("swiperight", function(event) {
			if ($('#game-content').is(":visible")) {
				event.gesture.preventDefault();
				pacman.directionWatcher.set(right);
				}
		});
		Hammer('.container').on("swipeleft", function(event) {
			if ($('#game-content').is(":visible")) {
				event.gesture.preventDefault();
				pacman.directionWatcher.set(left);
			}
		});
		Hammer('.container').on("swipeup", function(event) {
			if ($('#game-content').is(":visible")) {
				event.gesture.preventDefault();
				pacman.directionWatcher.set(up);
			}
		});
		Hammer('.container').on("swipedown", function(event) {
			if ($('#game-content').is(":visible")) {
				event.gesture.preventDefault();
				pacman.directionWatcher.set(down);
			}
		});
		
		// Mobile Control Buttons
		$(document).on('touchend mousedown','#up',function(event) {
		    event.preventDefault();
			pacman.directionWatcher.set(up);
		});
		$(document).on('touchend mousedown','#down',function(event) {
		    event.preventDefault();
			pacman.directionWatcher.set(down);
		});
		$(document).on('touchend mousedown','#left',function(event) {
		    event.preventDefault();
			pacman.directionWatcher.set(left);
		});
		$(document).on('touchend mousedown','#right',function(event) {
		    event.preventDefault();
			pacman.directionWatcher.set(right);
		});
		
		// Menu
		$(document).on('click','.button#newGame',function(event) {
			game.newGame();
		});
		$(document).on('click','.button#highscore',function(event) {
		    game.showContent('highscore-content'); 
			getHighscore();
		});
		$(document).on('click','.button#instructions',function(event) {
		    game.showContent('instructions-content');
		});
		$(document).on('click','.button#info',function(event) {
		    game.showContent('info-content'); 
		});
		// back button
		$(document).on('click','.button#back',function(event) {
			game.showContent('game-content');
		});
		// toggleSound
		$(document).on('click','.controlSound',function(event) {
			game.toggleSound();
		});
		// get latest
		$(document).on('click', '#updateCode', function(event) {
			console.log('check for new version');
			event.preventDefault();
			window.applicationCache.update(); 
		});
		
		// checkAppCache();
		
		canvas = $("#myCanvas").get(0);
		context = canvas.getContext("2d");
        
            
 
		/* --------------- GAME INITIALISATION ------------------------------------
		
			TODO: put this into Game object and change code to accept different setups / levels
		
		-------------------------------------------------------------------------- */
		
		game.init(0);
		logger.disableLogger();
		
		renderContent();
		});
		
		function renderContent()
		{
			//context.save()

			// Refresh Score
			game.score.refresh(".score");
						
			// Pills
			context.beginPath();
			context.fillStyle = "White";
			context.strokeStyle = "White";
			
			var dotPosY;
			$.each(game.map.posY, function(i, item) {
				dotPosY = this.row;
			   $.each(this.posX, function() { 
				   if (this.type == "pill") {
					context.arc(game.toPixelPos(this.col-1)+pacman.radius,game.toPixelPos(dotPosY-1)+pacman.radius,game.pillSize,0*Math.PI,2*Math.PI);
					context.moveTo(game.toPixelPos(this.col-1), game.toPixelPos(dotPosY-1));
				   }
				   else if (this.type == "powerpill") {
					context.arc(game.toPixelPos(this.col-1)+pacman.radius,game.toPixelPos(dotPosY-1)+pacman.radius,game.powerpillSizeCurrent,0*Math.PI,2*Math.PI);
					context.moveTo(game.toPixelPos(this.col-1), game.toPixelPos(dotPosY-1));
				   }
			   }); 
			});
			console.log("pps: " + game.nextPowerPillSize());
			context.fill();
			
			// Walls
			context.drawImage(canvas_walls, 0, 0);
			
			
			if (game.running == true) {
				// Ghosts
				pinky.draw(context);
				blinky.draw(context);
				inky.draw(context);
				clyde.draw(context);
				
				
				// Pac Man
				context.beginPath();
				context.fillStyle = "Yellow";
				context.strokeStyle = "Yellow";
				context.arc(pacman.posX+pacman.radius,pacman.posY+pacman.radius,pacman.radius,pacman.angle1*Math.PI,pacman.angle2*Math.PI);
				context.lineTo(pacman.posX+pacman.radius, pacman.posY+pacman.radius);
				context.stroke();
				context.fill();
			}
			
		}
		
		function renderGrid(gridPixelSize, color)
		{
			context.save();
			context.lineWidth = 0.5;
			context.strokeStyle = color;
			
			// horizontal grid lines
			for(var i = 0; i <= canvas.height; i = i + gridPixelSize)
			{
				context.beginPath();
				context.moveTo(0, i);
				context.lineTo(canvas.width, i);
				context.closePath();
				context.stroke();
			}
			
			// vertical grid lines
			for(var i = 0; i <= canvas.width; i = i + gridPixelSize)
			{
				context.beginPath();
				context.moveTo(i, 0);
				context.lineTo(i, canvas.height);
				context.closePath();
				context.stroke();
			}
			
			context.restore();
		}
		
		function animationLoop()
		{
			canvas.width = canvas.width;
			//renderGrid(pacman.radius, "red");
			renderContent();
			
			if (game.dieAnimation == 1) pacman.dieAnimation();
			if (game.pause != true){
				// Make changes before next loop
				pacman.move();
				pacman.eat();
				pacman.checkDirectionChange();
				pacman.checkCollisions();		// has to be the LAST method called on pacman

				
				
				blinky.move();
				inky.move();
				pinky.move();
				clyde.move();

				game.checkGhostMode();
			}
			
			// All dots collected?
			game.check();
			
			
			//requestAnimationFrame(animationLoop);
			setTimeout(animationLoop, game.refreshRate);
			
			
		}


	
	function doKeyDown(evt){
	
		switch (evt.keyCode)
			{
			case 38:	// UP Arrow Key pressed
				evt.preventDefault();
			case 87:	// W pressed
				pacman.directionWatcher.set(up);
				break;
			case 40:	// DOWN Arrow Key pressed
				evt.preventDefault();
			case 83:	// S pressed 
				pacman.directionWatcher.set(down);
				break;
			case 37:	// LEFT Arrow Key pressed
				evt.preventDefault();
			case 65:	// A pressed
				pacman.directionWatcher.set(left);
				break;
			case 39:	// RIGHT Arrow Key pressed
				evt.preventDefault();
			case 68:	// D pressed
				pacman.directionWatcher.set(right);
				break;
			case 78:	// N pressed
			if (!$('#playerName').is(':focus')) {
				game.pause = 1;
				game.newGame();
				}
				break;
			case 77:	// M pressed
				game.toggleSound();
				break;
			case 8:		// Backspace pressed -> show Game Content
			case 27:	// ESC pressed -> show Game Content
				if (!$('#playerName').is(':focus')) {
					evt.preventDefault();
					game.showContent('game-content');
					}
				break;
			case 32:	// SPACE pressed -> pause Game
                evt.preventDefault();
				if (!(game.gameOver == true) 
					&& $('#game-content').is(':visible')
					)	game.pauseResume();
				break;
			}
		}
}

geronimo();