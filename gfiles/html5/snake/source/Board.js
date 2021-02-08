class Board{constructor(){this._matrixRows=18;this._matrixColumns=24;this._totalCells=354;this._cellSize=1.5;this._foodValue=-3;this._borderValue=-1;this._emptyValue=-2;}
get matrixRows(){return this._matrixRows;}
get matrixColumns(){return this._matrixColumns;}
get totalCells(){return this._totalCells;}
get cellSize(){return this._cellSize;}
get foodValue(){return this._foodValue;}
get borderValue(){return this._borderValue;}
get emptyValue(){return this._emptyValue;}
getDefault(top,left){if(top===0||left===0||top===this.matrixRows-1||left===this.matrixColumns-1){return this.borderValue;}
return this.emptyValue;}
getPosition(pos){return((pos-1)*this.cellSize)+"em";}
createSnakeElement(){let div=document.createElement("DIV");div.className="link";div.innerHTML="<div class='snakeShadow'></div><div class='snakeBody'></div>";return div;}}