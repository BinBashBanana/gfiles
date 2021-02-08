class Display{constructor(){this.display="mainScreen";this.container=document.querySelector("#container");this.header=document.querySelector(".messages h2");this.paragraph=document.querySelector(".messages p");this.messages={mainScreen:["Snake","Select a level"],paused:["Pause","Continue the game?"],continuing:["Continue","Continue the game?"],gameOver:["Game Over","Write your name"],highScores:["HighScores","Select a level"],help:["Help","Game controlls"]};}
get(){return this.display;}
set(display){this.display=display;return this;}
setClass(){this.container.className=this.display;}
show(){this.header.innerHTML=this.messages[this.display][0];this.paragraph.innerHTML=this.messages[this.display][1];this.setClass();}
hide(){this.container.className="playing";}
isStarting(){return this.display==="starting";}
isPlaying(){return this.display==="playing";}
isDemoing(){return this.display==="demo";}}