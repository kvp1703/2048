// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
document.addEventListener('DOMContentLoaded',() =>{
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDispaly = document.getElementById('result');
  const width = 4;
  let squares = [];

  //Lets generate random empty position
  //TODO: game over case when emptyPos.length==0
  function generate(){
    let emptyPos = [];
    for(let i=0;i<16;i++){
      if(squares[i].innerHTML===""){
        emptyPos.push(i);
      }
    }
    let randomPos = [];
    if(emptyPos.length==0){
      if(isOver()==true)return randomPos;
    }
    if(emptyPos.length==1){
      squares[emptyPos[0]].innerHTML=2;
      return randomPos;
    }
    let size = emptyPos.length;
    randomPos.push(emptyPos[Math.floor(Math.random()* size)]);
    randomPos.push(emptyPos[Math.floor(Math.random()* size)]);
    while(randomPos[1]==randomPos[0]){
      randomPos[1]=(Math.floor(Math.random()* emptyPos.length));
    }
    squares[randomPos[0]].innerHTML=2;
    let ele1 = document.getElementById(randomPos[0]);
    ele1.classList.add('zoom-in-zoom-out');
    squares[randomPos[1]].innerHTML=2;
    let ele2 = document.getElementById(randomPos[1]);
    ele2.classList.add('zoom-in-zoom-out');
    
    setTimeout(function(){
      ele1.classList.remove('zoom-in-zoom-out');
      ele2.classList.remove('zoom-in-zoom-out');
    }, 10)
  }


  function isOver(){
    for(let i=0;i<4;i++){
      for(let j=0;j<3;j++){
        if(squares[i+j*4].innerHTML=="" || squares[i+(j+1)*4].innerHTML=="")return false;
        if(squares[i+j*4].innerHTML==squares[i+(j+1)*4].innerHTML)return false;
      }
    }
    for(let i=0;i<16;i+=4){
      for(let j=0;j<3;j++){
        if(squares[i+j].innerHTML==squares[i+j+1].innerHTML)return false;
      }
    }
    alert("Game Over!");
    return true;
  }

  function isWin(){
    for(let i=0;i<16;i++){
      if(parseInt(squares[i].innerHTML)==2048){
        alert("You have won!!! refresh the page to play again!" );
        return true;
      }
    }
    return false;
  }

  //Create Board
  function createBoard(){
    for(let i=0;i<16;i++){
      let square = document.getElementById(i);
      squares.push(square);
    }
    generate();
  }
  createBoard();

  //This function return elements in ith row
  function getRow(begin){
    let row = [];
    for(let i=0;i<4;i++){
      let data = squares[begin+i].innerHTML;
      if(data==="")data="0";
      row.push(parseInt(data));
    }
    return row;
  }

  function getCol(begin){
    let col = [];
    for(let i=0;i<16;i+=4){
      let data = squares[begin+i].innerHTML;
      if(data==="")data="0";
      col.push(parseInt(squares[begin+i].innerHTML));
    }
    return col;
  }

  //This function returns the row formed after presssing right key/downKey
  function formatArray(arr,isLeftOrUpMove){
    //Lets remove all the zeros from the array.
    arr = arr.filter(num=>num);
    for(let  j=arr.length;j>0;j--){
      if(arr[j]==arr[j-1]){
        arr[j]=2*arr[j];
        arr[j-1]=0;
        let currentScore = parseInt(scoreDisplay.innerHTML);
        scoreDisplay.innerHTML = currentScore+arr[j];
      }
    }
    arr = arr.filter(num=>num);
    if(isLeftOrUpMove==true)arr = arr.reverse();
    let missing = 4-arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    if(isLeftOrUpMove==true)arr = arr.reverse();
    return arr;
  }

  function rightMove(){
    for(let i=0;i<16;i+=4){
      let row = getRow(i);
      row = formatArray(row,false);
      for(let j=0;j<4;j++){
        if(row[j]==0){
          squares[i+j].innerHTML="";
        }else squares[i+j].innerHTML=row[j];
      }
    }
    generate();
  }
  function leftMove(){
    for(let i=0;i<16;i+=4){
      let row = getRow(i);
      row = formatArray(row,true);
      for(let j=0;j<4;j++){
        if(row[j]==0){
          squares[i+j].innerHTML="";
        }else squares[i+j].innerHTML=row[j];
      }
    }
    generate();
  }
  function downMove(){
    for(let i=0;i<4;i++){
      let col = getCol(i);
      col = formatArray(col,false);
      for(let j=0;j<4;j++){
        if(col[j]==0){
          squares[i+j*4].innerHTML="";
        }else squares[i+j*4].innerHTML=col[j];
      }
    }
    generate();
  }
  function upMove(){
    for(let i=0;i<4;i++){
      let col = getCol(i);
      col = formatArray(col,true);
      for(let j=0;j<4;j++){
        if(col[j]==0){
          squares[i+j*4].innerHTML="";
        }else squares[i+j*4].innerHTML=col[j];
      }
    }
    generate();
  }

  //Assign Keycodes
  function control(e){
    if(isWin()==true)return;
    let over = isOver();
    if(over==true)return;
    if(e.keyCode===37)leftMove();
    else if(e.keyCode===38)upMove();
    else if(e.keyCode === 39)rightMove();
    else if(e.keyCode===40)downMove();
  }
  document.addEventListener('keyup', control);



})