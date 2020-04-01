
let blankSpace = '⚪';
let player = '🔴';
let human = '🔵';
let cat = '😺'; //random, blocks wins

let turn = player;
let opponent = human;

function restartHuman() {
  opponent = human;
  restart();
}

function restartCat() {
  opponent = cat;
  restart();
}

function restart() {
  turn = player;

  var cells = document.querySelectorAll("table#grid td");
  let i;
  for (i=0; i<cells.length; i++) {
    cells[i].innerHTML = blankSpace;
  }

  setDropIcons(turn);
  document.getElementById('drops').style.visibility = "visible";

  var buttons = document.querySelectorAll("div .drop");
  let k;
  for (k=0; k<buttons.length; k++) {
    buttons[k].style.visibility = "inherit";
  }

  document.getElementById('status').innerHTML = player + " vs " + opponent;
}

function dropPress(col) {
  let boardRows = document.getElementById('grid').rows;
  let row;
  for (row=boardRows.length-1; row>=0; row--) {
    if (boardRows[row].cells[col].innerHTML === blankSpace) {
      boardRows[row].cells[col].innerHTML = turn;
      console.log("placed (" + col + "," + row + ")");
      break;
    }
  }
  if (boardRows[0].cells[col].innerHTML != blankSpace) {
    document.getElementById("drop"+col).style.visibility = "hidden";
  }

  let over = checkForWin();
  
  if (!over) {
    turn = turn === player ? opponent : player;
    if (turn === player || turn === human) {
      document.getElementById('drops').style.visibility = "visible";
      document.getElementById('playerWaiting').style.visibility = "hidden";
    }
    else {
      document.getElementById('drops').style.visibility = "hidden";
      document.getElementById('playerWaiting').innerHTML = opponent;
      document.getElementById('playerWaiting').style.visibility = "visible";

      if (turn === cat) {
        catMove();
      }

    }
  }
  
  setDropIcons(turn);
}

function setDropIcons(icon) {
  let dropIcons = document.querySelectorAll("div .dropping");
  let j;
  for (j=0; j<dropIcons.length; j++) {
    dropIcons[j].innerHTML = icon;
  }
}

function checkForWin() {
  let win = false;
  let boardRows = document.getElementById('grid').rows;
  let row, col;
  for (row=0; row<boardRows.length; row++) {
    for (col=0; col<boardRows[row].cells.length; col++) {
      if (win) break;
      let currentVal = boardRows[row].cells[col].innerHTML;
      if (currentVal === blankSpace) {
        continue;
      }
      //check across, to the right
      if (!win && col < 4) {
        if (currentVal === boardRows[row].cells[col+1].innerHTML
              && currentVal === boardRows[row].cells[col+2].innerHTML
              && currentVal === boardRows[row].cells[col+3].innerHTML
          ) {
          win = true;
        }
      }
      //check down
      if (!win && row < 3) {
        if (currentVal === boardRows[row+1].cells[col].innerHTML
              && currentVal === boardRows[row+2].cells[col].innerHTML
              && currentVal === boardRows[row+3].cells[col].innerHTML
          ) {
          win = true;
        }
      }
      //check diagonal, down to the right
      if (!win && col < 4 && row < 3) {
        if (currentVal === boardRows[row+1].cells[col+1].innerHTML
              && currentVal === boardRows[row+2].cells[col+2].innerHTML
              && currentVal === boardRows[row+3].cells[col+3].innerHTML
          ) {
          win = true;
        }
      }
      //check diagonal, up to the right
      if (!win && col < 4 && row > 2) {
        if (currentVal === boardRows[row-1].cells[col+1].innerHTML
              && currentVal === boardRows[row-2].cells[col+2].innerHTML
              && currentVal === boardRows[row-3].cells[col+3].innerHTML
          ) {
          win = true;
        }
      }
    }
  }
  if (win) {
    document.getElementById('drops').style.visibility = "hidden";
    document.getElementById('playerWaiting').style.visibility = "hidden";

    document.getElementById('status').innerHTML = turn + " wins!";

    console.log("winner");
  }

  return win;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function catMove() {
  //"thinking"
  await sleep(3000);

  let topRow = document.getElementById('grid').rows[0];
  let col;
  do {
    col = Math.floor(Math.random() * 7);
  }
  while (topRow.cells[col].innerHTML != blankSpace);
  dropPress(col);
}
