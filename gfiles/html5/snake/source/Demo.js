class Demo{constructor(board){this.board=board;this.container=document.querySelector(".demo");this.left=Utils.getPosition(document.querySelector(".messages")).left;this.width=this.container.offsetWidth;this.elements=[];this.pointer=-2;this.rows=5;this.initialParts=3;for(let i=0;i<this.rows;i+=1){this.createElement(i,0,this.rows-i-1);this.createElement(i,2,this.rows+i+1);}
this.createElement(0,1,this.rows);}
createElement(top,left,pos){let element=this.board.createSnakeElement();element.style.top=this.board.getPosition(top+1);element.style.left=this.board.getPosition(left+1);element.style.display="none";this.container.appendChild(element);this.elements[pos]=element;}
start(level){this.pointer=-this.initialParts;this.container.className="demo demo"+level;}
end(){for(let i=this.pointer;i<this.pointer+this.initialParts;i+=1){if(i>=0&&i<this.elements.length){this.elements[i].style.display="none";}}}
move(){if(this.pointer>=0){this.elements[this.pointer].style.display="none";}
if(this.pointer+this.initialParts<this.elements.length){this.elements[this.pointer+this.initialParts].style.display="block";}
this.pointer+=1;if(this.pointer>=this.elements.length){this.pointer=-this.initialParts;}}}