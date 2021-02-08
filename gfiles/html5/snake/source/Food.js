class Food{constructor(board,pos,top,left){this.board=board;this.element=document.querySelector(".food");this.body=this.element.querySelector(".foodBody");this.shadow=this.element.querySelector(".foodShadow");this.top=top||0;this.left=left||0;this.foodTime=1000;this.time=this.foodTime;if(top){this.setPosition();}else{this.add(pos);}}
eat(top,left){if(top===this.top&&left===this.left){return true;}
return false;}
add(pos){this.time=this.foodTime;this.top=pos.top;this.left=pos.left;this.setPosition();}
reduceTime(time){if(this.time>0){this.time=Math.max(0,this.time-Math.round(time/4));this.setTransform();}}
setPosition(){this.element.style.top=this.board.getPosition(this.top);this.element.style.left=this.board.getPosition(this.left);}
setTransform(){let time=(1000-this.time)/10,deg;if(time<21){deg=time*360/20;}else if(time<51){deg=time*720/50;}else{deg=time*1080/99;}
this.body.style.transform="rotate("+deg+"deg)";this.shadow.style.transform="rotate("+deg+"deg)";}
getPosition(){return{top:this.top,left:this.left};}
getTimer(){return this.time>0?Math.round(this.time/10):0;}}