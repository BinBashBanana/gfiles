class Instance{constructor(board){this.board=board;this.data=new Storage("snake.game");this.main=document.querySelector(".main");if(this.hasGame()){this.main.classList.remove("help");this.main.classList.add("continue");}}
newGame(level){this.destroyGame();this.data.set("playing",1);this.data.set("level",level);this.data.set("dirTop",1);this.data.set("dirLeft",0);this.data.set("matrix.head",0);this.data.set("matrix.tail",0);}
destroyGame(){for(let i=0;i<this.board.matrixRows;i+=1){for(let j=0;j<this.board.matrixColumns;j+=1){let name="matrix."+i+"."+j;if(this.data.get(name)){this.data.remove(name);}}}
this.data.set("playing",0);this.data.remove("matrix.head");this.data.remove("matrix.tail");this.data.remove("dirTop");this.data.remove("dirLeft");this.data.remove("score");this.data.remove("level");this.main.classList.add("help");this.main.classList.remove("continue");}
getData(){let head=this.data.get("matrix.head"),matrix=[],links=[],foodPos={};for(let i=0;i<this.board.matrixRows;i+=1){matrix[i]=[];for(let j=0;j<this.board.matrixColumns;j+=1){let value=this.data.get("matrix."+i+"."+j);if(value){matrix[i][j]=value;if(value>=0){let pointer;if(value-head>=0){pointer=value-head;}else{pointer=this.board.totalCells+value-head;}
links[pointer]={top:i,left:j};}else{foodPos={top:i,left:j};}}else{matrix[i][j]=this.board.getDefault(i,j);}}}
return{level:this.data.get("level"),score:this.data.get("score"),matrix:matrix,head:head,tail:this.data.get("matrix.tail")+1,links:links,dirTop:this.data.get("dirTop"),dirLeft:this.data.get("dirLeft"),foodTop:foodPos.top,foodLeft:foodPos.left};}
addToMatrix(top,left,value){this.data.set("matrix."+top+"."+left,value);if(value>0){this.data.set("matrix.tail",value);}}
removeFromMatrix(top,left,value){this.data.remove("matrix."+top+"."+left);if(value){this.data.set("matrix.head",value);}}
saveScore(score){this.data.set("score",score);}
saveDirection(dir){this.data.set("dirTop",dir.top);this.data.set("dirLeft",dir.left);}
hasGame(){return this.data.get("playing");}}