class Matrix{constructor(board,instance,matrix,head,tail){this.board=board;this.instance=instance;this.head=head!==undefined?head:0;this.tail=tail!==undefined?tail:0;this.matrix=matrix||[];if(!matrix){for(let i=0;i<this.board.matrixRows;i+=1){this.matrix[i]=[];for(let j=0;j<this.board.matrixColumns;j+=1){this.matrix[i][j]=this.board.getDefault(i,j);}}}}
addSnake(top,left){this.matrix[top][left]=this.tail;this.instance.addToMatrix(top,left,this.tail);this.tail+=1;if(this.tail>this.board.totalCells){this.tail=0;}}
removeSnake(top,left){this.matrix[top][left]=this.board.emptyValue;this.head+=1;if(this.head>this.board.totalCells){this.head=0;}
this.instance.removeFromMatrix(top,left,this.head);}
addFood(){let top,left,found=true;do{top=Utils.rand(1,this.board.matrixRows-2);left=Utils.rand(1,this.board.matrixColumns-2);found=this.matrix[top][left]>=this.board.borderValue;}while(found);this.matrix[top][left]=this.board.foodValue;this.instance.addToMatrix(top,left,this.board.foodValue);return{top:top,left:left};}
crashed(top,left){return this.matrix[top][left]>=this.board.borderValue;}
ate(top,left){return this.matrix[top][left]===this.board.foodValue;}}