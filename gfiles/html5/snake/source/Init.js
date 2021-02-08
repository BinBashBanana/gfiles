(function(){"use strict";let display,demo,board,sound,keyboard,score,matrix,snake,food,scores,instance,navigator,starter,animation,startTime,soundFiles=["start","eat","end"];function destroyGame(){matrix=null;snake=null;food=null;instance.destroyGame();}
function nextCount(){let content="";score.decCount();if(score.count>0){content=score.count;sound.start();}else if(score.count===0){content="Go!";sound.eat();window.setTimeout(()=>sound.eat(),200);}else{display.set("playing").setClass();}
starter.innerHTML=content;}
function requestAnimation(){startTime=new Date().getTime();animation=window.requestAnimationFrame(()=>{let time=new Date().getTime()-startTime,speed=time/16;score.decTime(time);if(speed<=0||speed>5){return requestAnimation();}
if(score.time<0){if(display.isDemoing()){demo.move();}
if(display.isStarting()){nextCount();}else if(display.isPlaying()){let res=snake.move();if(res==="crashed"){sound.end();gameOver();}else if(res==="ate"){sound.eat();score.incScore(food.getTimer());instance.saveScore(score.score);food.add(matrix.addFood());}}
score.resetTime();}
if(display.isPlaying()){food.reduceTime(time);score.showFoodTimer(food.getTimer());}
if(display.isDemoing()||display.isStarting()||display.isPlaying()){requestAnimation();}});}
function cancelAnimation(){window.cancelAnimationFrame(animation);}
function showMainScreen(){display.set("mainScreen").show();}
function startPause(){display.set("paused").show();cancelAnimation();}
function endPause(){display.set("playing").setClass();requestAnimation();}
function finishGame(){display.set("mainScreen").show();destroyGame();cancelAnimation();instance.destroyGame();}
function gameOver(){cancelAnimation();display.set("gameOver").show();scores.setInput();instance.destroyGame();}
function endGameOver(save){destroyGame();if(save){saveHighScore();}else{showMainScreen();}}
function startDemo(level){display.set("demo");score.set(level,0);demo.start(level);requestAnimation();}
function endDemo(){if(display.isDemoing()){display.set("mainScreen");cancelAnimation();}
demo.end();}
function showHighScores(){display.set("highScores").show();}
function saveHighScore(){if(scores.save(score.level,score.score)){showHighScores();}}
function showHelp(){display.set("help").show();}
function restoreGame(){if(instance.hasGame()){let data=instance.getData();display.set("continuing").show();score.set(data.level,data.score).show();matrix=new Matrix(board,instance,data.matrix,data.head,data.tail);snake=new Snake(board,matrix,data.links,data.dirTop,data.dirLeft);food=new Food(board,null,data.foodTop,data.foodLeft);}}
function newGame(level){display.set("starting").setClass();score.set(level).show();matrix=new Matrix(board,instance);snake=new Snake(board,matrix);food=new Food(board,matrix.addFood());instance.newGame(level);requestAnimation();}
function getShortcuts(){let turnSnake=(dirTop,dirLeft)=>{if(snake.turn(dirTop,dirLeft)){instance.saveDirection(snake.getDirection());}};return{mainScreen:{O:()=>newGame(score.level),Y:()=>newGame(1),E:()=>newGame(2),R:()=>newGame(3),U:()=>newGame(4),I:()=>showHighScores(),H:()=>showHelp(),T:()=>restoreGame(),M:()=>sound.toggle()},paused:{P:()=>endPause(),B:()=>finishGame()},gameOver:{O:()=>endGameOver(true),B:()=>endGameOver(false)},highScores:{Y:()=>scores.show(1),E:()=>scores.show(2),R:()=>scores.show(3),U:()=>scores.show(4),B:()=>showMainScreen()},help:{B:()=>showMainScreen()},playing:{W:()=>turnSnake(-1,0),A:()=>turnSnake(0,-1),S:()=>turnSnake(1,0),D:()=>turnSnake(0,1),P:()=>startPause(),M:()=>sound.toggle()},saveHighScore:()=>saveHighScore()};}
function initDomListeners(){navigator=document.querySelector(".main ul");starter=document.querySelector(".start");document.body.addEventListener("click",(e)=>{let element=Utils.getTarget(e),actions={play:()=>newGame(element.dataset.level),mainScreen:()=>showMainScreen(),highScores:()=>showHighScores(),help:()=>showHelp(),restore:()=>restoreGame(),endPause:()=>endPause(),finishGame:()=>finishGame(),save:()=>endGameOver(true),newGame:()=>endGameOver(false),showScores:()=>scores.show(element.dataset.level),sound:()=>sound.toggle()};if(actions[element.dataset.action]){actions[element.dataset.action]();}});navigator.addEventListener("mouseover",(e)=>{let element=e.target.dataset.action?e.target:e.target.parentElement;if(element.dataset.action==="play"){startDemo(element.dataset.level);}});navigator.addEventListener("mouseout",(e)=>{let element=e.target.dataset.action?e.target:e.target.parentElement;if(element.dataset.action==="play"){endDemo();}});document.querySelector(".snake").addEventListener("click",(e)=>{if(display.isPlaying()){if(snake.mouseTurn(e)){instance.saveDirection(snake.getDirection());}}});}
function main(){initDomListeners();display=new Display();score=new Score(display);board=new Board();demo=new Demo(board);instance=new Instance(board);sound=new Sounds(soundFiles,"snake.sound",true);scores=new HighScores();keyboard=new Keyboard(display,scores,getShortcuts());}
window.addEventListener("load",main,false);}());