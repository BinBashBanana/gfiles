class HighScores{constructor(){this.input=document.querySelector(".input input");this.scores=document.querySelector(".scores");this.none=document.querySelector(".none");this.level="";this.data=null;this.total=0;this.maxScores=5;this.focused=false;this.input.onfocus=()=>this.focused=true;this.input.onblur=()=>this.focused=false;}
create(level){this.level=level;this.data=new Storage("snake.hs."+this.level);this.total=this.data.get("total")||0;}
show(level){this.scores.innerHTML="";this.create(level);this.showHideNone(this.total===0);if(this.total>0){this.displayScores();}}
displayScores(){for(let i=1;i<=this.total;i+=1){let data=this.data.get(i),div=document.createElement("DIV");div.className="highScore";div.innerHTML="<div class='hsName'>"+data.name+"</div>"+
"<div class='hsScore'>"+Utils.formatNumber(data.score,",")+"</div>";this.scores.appendChild(div);}}
save(level,score){if(this.input.value){this.create(level);this.saveData(score);this.show(this.level);return true;}
return false;}
saveData(score){let data=[],saved=false,actual={name:this.input.value,score:score};for(let i=1;i<=this.total;i+=1){let hs=this.data.get(i);if(!saved&&hs.score<actual.score){data.push(actual);saved=true;}
if(data.length<=this.maxScores){data.push(hs);}}
if(!saved&&data.length<=this.maxScores){data.push(actual);}
this.data.set("total",data.length);data.forEach((element,index)=>{this.data.set(index+1,element);});}
showHideNone(show){this.none.style.display=show?"block":"none";}
setInput(){this.input.value="";this.input.focus();}
isFocused(){return this.focused;}}