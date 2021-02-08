class Score{constructor(display){this.levelNames=["Easy","Medium","Hard","Super"];this.speedTimes=[300,200,100,50];this.countTime=500;this.initialCount=4;this.display=display;this.scorer=document.querySelector(".score");this.timer=document.querySelector(".time");this.leveler=document.querySelector(".level");this._count=0;this._level=1;this._score=0;this._time=0;}
get count(){return this._count;}
get level(){return this._level;}
get score(){return this._score;}
get time(){return this._time;}
set(level,score){this._count=this.initialCount;this._level=level;this._score=score||0;this.resetTime();return this;}
show(){this.showLevel();this.showScore();this.showFoodTimer();}
showLevel(){this.leveler.innerHTML="Level: "+this.levelNames[this.level-1];}
showScore(){this.scorer.innerHTML="Score: "+Utils.formatNumber(this.score,",");}
showFoodTimer(time){this.timer.innerHTML=time||"";}
decCount(){this._count-=1;}
incScore(score){this._score+=score;this.showScore();}
decTime(time){this._time-=time;}
resetTime(){if(this.display.isStarting()){this._time=this.countTime;}else{this._time=this.speedTimes[this.level-1];}}}