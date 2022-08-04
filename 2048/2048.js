const $table = document.querySelector("#table");
const $score = document.querySelector("#score");
let data = [];

function startGame(){
  const $fragment = document.createDocumentFragment(); //메모리에만 저장, 화면x  
  [1, 2, 3, 4].forEach(function (){
    const rowData = [];
    const $tr = document.createElement('tr');
    [1, 2, 3, 4].forEach(()=>{
      rowData.push(0);
      const $td = document.createElement('td');
      $tr.appendChild($td);
    });
    data.push(rowData);
    $fragment.appendChild($tr);
  });
  $table.appendChild($fragment);
  put2ToRandomCell();
  draw();
}

function put2ToRandomCell(){
  const emptyCells = [];
  data.forEach(function (rowData, i){ //i:몇번째줄
    rowData.forEach(function (cellData, j){ //j: 몇번째 칸
      if (!cellData){
        emptyCells.push([i, j]); // [[0, 0], [0, 1], [0, 2], [0,3], [1, 0], [1, 1] ]
      }
    });
  });
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];  //randomCell === [i, j]
  data[randomCell[0]][randomCell[1]] = 2;
}

function draw(){
  data.forEach((rowData, i) =>{
    rowData.forEach((cellData, j) => {
      const $target = $table.children[i].children[j]; //$table.children[i] - tr // $table.children[i].children[j] - td
      if(cellData > 0){
        $target.textContent = cellData;
        $target.className = 'color-' + cellData;
      }else{
        $target.textContent = '';
        $target.className = '';
      }
    });
  });
}
startGame();

// data = [
//   [32, 2, 4, 2],
//   [64, 4, 8, 4],
//   [2, 1024, 1024, 32],
//   [32, 16, 64, 4],
// ];
// draw();

function moveCells(direction){
  switch(direction){
    case 'left':{
      const newData = [[], [], [], []];
      data.forEach((rowData, i)=>{
        rowData.forEach((cellData, j)=>{
          if(cellData){
            const currentRow = newData[i];
            const prevData = currentRow[currentRow.length - 1];
            if(prevData === cellData){ //이전값이 지금 값과 같으면
              const score = parseInt($score.textContent);
              $score.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            }else{
              newData[i].push(cellData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][j] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
    case 'right':{
      const newData = [[], [], [], []];
      data.forEach((rowData, i) =>{
        rowData.forEach((cellData, j) =>{
          if(rowData[3 - j]){
            const currentRow = newData[i];
            const prevData = currentRow[currentRow.length - 1];
            if(prevData === rowData[3 - j]){
              const score = parseInt($score.textContent);
              $score.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            }else{
              newData[i].push(rowData[3 - j]);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((rowData, i) => {
        [1, 2, 3, 4].forEach((cellData, j) => {
          data[i][3 - j] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
    case 'up':{
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j)=>{
          if(cellData){
            const currentRow = newData[j];
            const prevData = currentRow[currentRow.length - 1];
            if(prevData === cellData){
              const score = parseInt($score.textContent);
              $score.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            }else{
              newData[j].push(cellData);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((cellData, i) => {
        [1, 2, 3, 4].forEach((rowData, j) => {
          data[j][i] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
    case 'down':{
      const newData = [[], [], [], []];
      data.forEach((rowData, i) => {
        rowData.forEach((cellData, j)=>{
          if(data[3 - i][j]){
            const currentRow = newData[j];
            const prevData = currentRow[currentRow.length - 1];
            if(prevData === data[3 - i][j]){
              const score = parseInt($score.textContent);
              $score.textContent = score + currentRow[currentRow.length - 1] * 2;
              currentRow[currentRow.length - 1] *= -2;
            }else{
              newData[j].push(data[3 - i][j]);
            }
          }
        });
      });
      console.log(newData);
      [1, 2, 3, 4].forEach((cellData, i) => {
        [1, 2, 3, 4].forEach((rowData, j) => {
          data[3 - j][i] = Math.abs(newData[i][j]) || 0;
        });
      });
      break;
    }
  }
  if(data.flat().includes(2048)){
    /// 승리
    draw();
    setTimeout(() => {
      alert('축하합니다. 2048을 만들었습니다.');
    }, 0);
  }else if(!data.flat().includes(0)){
    // 빈칸이 없으면 패배
    alert(`패배하였습니다.  ${$score.textContent}`);
  }else{
    put2ToRandomCell();
    draw();
  }
}
//키보드 움직임
window.addEventListener('keyup',(event) => {
  if(event.key === 'ArrowUp'){
    moveCells('up');
  }else if( event.key === 'ArrowDown'){
    moveCells('down');
  }else if( event.key === 'ArrowLeft'){
    moveCells('left');
  }else if(event.key === 'ArrowRight'){
    moveCells('right');
  }
});

//마우스 움직임
let startCoord;
window.addEventListener('mousedown', (event) => {
  startCoord = [event.clientX, event.clientY]; //마우스 누를 때 좌표
});
window.addEventListener('mouseup', (event) => {
  const endCoord = [event.clientX, event.clientY]; //마우스 뗄때 좌표
  const diffX = endCoord[0] - startCoord[0];
  const diffY = endCoord[1] - startCoord[1];
  if(diffX < 0 && Math.abs(diffX) > Math.abs(diffY)){  //Math.abs : 절댓값
    moveCells('left');
  }else if(diffX > 0 && Math.abs(diffX) > Math.abs(diffY)){
    moveCells('right');
  }else if(diffY > 0 && Math.abs(diffX) <= Math.abs(diffY)){
    moveCells('down');
  }else if( diffY < 0 && Math.abs(diffX) <= Math.abs(diffY)){
    moveCells('up');
  }
});
